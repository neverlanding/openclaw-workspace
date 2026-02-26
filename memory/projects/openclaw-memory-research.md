# OpenClaw 记忆系统优化建议研究报告

> 研究日期: 2026-02-26  
> 数据来源: OpenClaw GitHub Issues/PRs、社区讨论、AI 助手框架最佳实践

---

## 概述

本报告整理了针对 OpenClaw 记忆系统的优化建议，基于官方 GitHub 仓库的 Issues/PRs、社区反馈以及其他 AI 助手框架（如 Claude、GPT）的记忆系统设计方案。

---

## 优化建议 1: 解决 Skills Snapshot 过期问题

### 问题描述
长期运行的会话（如 Telegram 聊天）在进程重启后无法访问新安装的 skills。这是因为 `ensureSkillSnapshot()` 在启动 skills watcher 之前就读取了 snapshot 版本，导致持久化的 session 携带过期的 `skillsSnapshot.version=0`，而第一个消息不会触发刷新。

**实际案例**: 用户通过 Web UI 可以正常使用 skill，但在 Telegram 中同一 skill 却不可用。

**来源**: [GitHub Issue #27125](https://github.com/openclaw/openclaw/issues/27125)  
**修复 PR**: [GitHub PR #27170](https://github.com/openclaw/openclaw/pull/27170)

### 解决方案
1. 在 `ensureSkillSnapshot()` 中，先启动 skills watcher，再读取 `getSkillsSnapshotVersion(...)`
2. 当创建/替换 watcher 时，增加 workspace skills snapshot 版本号，立即使过期的持久化 snapshot 失效

### 验证来源
- 修复者 dakshaymehta 提供了完整的测试覆盖：
  - watcher 初始化时增加 workspace snapshot 版本
  - 过期持久化 snapshot 在 watcher 初始化后刷新
  - 使用真实 `SKILL.md` 验证刷新后的 snapshot 包含该 skill

---

## 优化建议 2: 本地 LLM 的激进上下文管理

### 问题描述
使用本地 LLM（如通过 MLX 运行的 Qwen 模型）时，默认的 `contextTokens: 200000` 会导致机器人在几次对话后变得无响应。

**根本原因**:
- 系统提示词本身就约 40k tokens（workspace 文件 AGENTS.md/SOUL.md/MEMORY.md + skills + tool schemas）
- 每轮对话增加 tool calls 和结果，很快达到 80-90k tokens
- 在 4.5 tokens/sec 的 prefill 速度下，80k tokens = 约 300 秒仅用于 prompt 处理
- 机器人看起来"死机"，而 MLX 在静默处理大量 prefill

**来源**: [GitHub Issue #24180](https://github.com/openclaw/openclaw/issues/24180)

### 解决方案
为本地 LLM 配置激进的上下文管理参数：

```json
{
  "models": {
    "providers": {
      "local-qwen": {
        "models": [{
          "id": "mlx-community/Qwen3.5-397B-A17B-4bit",
          "contextWindow": 50000
        }]
      }
    }
  },
  "agents": {
    "defaults": {
      "compaction": {
        "mode": "default",
        "reserveTokensFloor": 10000,
        "memoryFlush": { "enabled": true }
      },
      "contextPruning": {
        "mode": "cache-ttl",
        "ttl": "10m",
        "keepLastAssistants": 2,
        "minPrunableToolChars": 20000
      }
    }
  }
}
```

### 验证来源
- 用户 evan966890 验证：设置 `contextWindow: 50000` 后，prefill 时间限制在约 11 秒，且在约 40k tokens 时触发 compaction
- 建议的改进：
  1. 自动检测慢速 provider（localhost 或 `api: "openai-completions"`），警告未设置 `contextWindow` 或默认使用保守值（如 65536）
  2. 在模型配置中暴露 prefill 速度，让 gateway 估计响应延迟并调整行为
  3. 添加每轮输入 tokens 的日志（如 `[agent] turn input: 84805 tokens, estimated prefill: 312s`）

---

## 优化建议 3: 子代理内存访问权限优化

### 问题描述
子代理有一个硬编码的默认拒绝列表，包含 `memory_search` 和 `memory_get`。无法重新启用默认拒绝的工具——自定义拒绝条目会添加到默认值中，而允许列表会被默认拒绝列表过滤（拒绝总是获胜）。

这阻止了一个有用的模式：一个专门的内存检索子代理，可以语义化搜索 workspace 内存并返回紧凑摘要，保持主代理的上下文较小。

**矛盾点**: 子代理可以使用 read 和 exec，这给了它们对工作区中每个文件的完全访问权限。拒绝 memory_search/memory_get 并不能阻止数据访问——它只是阻止了对相同数据的高效、语义化访问。

**来源**: [GitHub Issue #16214](https://github.com/openclaw/openclaw/issues/16214)

### 解决方案
将 `memory_search` 和 `memory_get` 从默认拒绝列表中移除。与其他被拒绝的工具（`gateway`、`cron`、`sessions_spawn`）不同，内存工具没有安全或编排风险——它们提供对子代理已经可以通过 read 访问的数据的只读访问。

想要拒绝子代理内存工具的用户仍然可以显式地将它们添加到 `tools.subagents.tools.deny`。

### 验证来源
- 社区用户 vipitecde 提出，获得 1 个 👍 支持
- 参考文档: [Sub-Agents — Tool Policy](https://docs.openclaw.ai/tools/subagents#tool-policy)
- 当前变通方案：子代理使用 read + exec (grep)——功能正常但仅支持关键词，没有语义排序，没有嵌入索引

---

## 优化建议 4: 四层记忆架构设计

### 问题描述
AI 助手在会话之间没有持久记忆。每次启动都从零开始。用户需要反复提供代码库背景、偏好或正在进行的工作信息。

**来源**: [AgentManager Issue #128](https://github.com/simonstaton/AgentManager/issues/128)  
**参考**: danielmiessler Personal AI Infrastructure + Jason Zuo 分层记忆

### 解决方案
实施四层记忆系统：

1. **工作记忆 (Working Memory)** — 当前会话上下文（已通过 CLAUDE.md 注入实现）
2. **长期知识 (Long-term Knowledge)** — 持久化事实、偏好、代码库摘要（SQLite 支持）
3. **情景日志 (Episodic Logs)** — 可搜索的过去代理运行和结果记录
4. **工件记忆 (Artifact Memory)** — 代理产生的文件/输出的引用

### OpenClaw 当前实现对比
OpenClaw 已经实现了类似的三层记忆系统：

- **🔥 P0 热记忆** - 永远在脑子里
  - `MEMORY.md` - 核心长期记忆
  - `memory/YYYY-MM-DD.md` - 最近7天日志
  - `SOUL.md` - 核心人格
  
- **🌡️ P1 温记忆** - 需要时能想起来
  - `memory/lessons/` - 经验教训
  - `memory/projects/` - 项目档案
  - `memory/decisions/` - 重要决策
  
- **❄️ P2 冷记忆** - 长期归档
  - `memory/archive/` - 归档日志
  - `memory/stats/` - 统计数据

### 验证来源
- danielmiessler 的 Personal AI Infrastructure 方法论
- Jason Zuo 的分层记忆设计
- OpenClaw 官方 AGENTS.md 文档

---

## 优化建议 5: 观察式记忆系统 (Observational Memory)

### 问题描述
传统的基于摘要的上下文管理会阻塞执行步骤，且无法持续观察代理对话。

**来源**: [HackerAI PR #256](https://github.com/hackerai-tech/hackerai/pull/256)

### 解决方案
用异步观察式记忆系统替代基于摘要的上下文管理：

- 持续观察代理对话
- 保持紧凑上下文而不阻塞执行步骤
- 集成 Mastra ObservationalMemory 与 LibSQL 存储用于持久化观察状态

### 关键特性
1. **异步观察**: 在后台持续观察对话，不阻塞主流程
2. **LibSQL 存储**: 使用 LibSQL 进行持久化观察状态存储
3. **上下文注入**: 在 `/api/chat` 和 `/api/agent-long` 路径中正确工作

### 验证来源
- HackerAI 项目正在实施的 WIP PR
- 测试计划包括：
  - 验证观察式记忆在代理聊天步骤期间触发
  - 确认上下文注入在两个 API 路径中正常工作
  - 端到端测试与实时代理对话

---

## 优化建议 6: Memory-MCP 持久化上下文系统

### 问题描述
AI 助手缺乏跨会话和功能的持久上下文，导致重复工作和上下文丢失。

**来源**: [not-code-claude-runs-you-pilot PR #2](https://github.com/edumesones/not-code-claude-runs-you-pilot/pull/2)  
**参考**: [yuvalsuede/memory-mcp](https://github.com/yuvalsuede/memory-mcp)

### 解决方案
集成 Memory-MCP 实现完整的持久化上下文系统：

**核心组件**:
- 内存提取脚本 (`extract-memory.js`)
- CLAUDE.md 整合 (`consolidate-claude-md.js`)
- 状态管理与 schema 版本控制
- 自动安装脚本

**安全与可靠性**:
- Secret 检测（API keys、密码、tokens）
- 自动清理（`[REDACTED]`）
- 分支感知内存存储
- 原子写入与自动备份
- 损坏预防与恢复

**功能特性**:
- 去重（Jaccard 相似度 0.8）
- 可配置置信度衰减
- 最大内存限制（2000 条，自动清理）
- 备份保留（30 天）
- Git 集成

### 验证来源
- 声称的收益：
  - 每个功能节省 33% 时间
  - 98% 模式一致性（vs 无记忆时的 60%）
  - 重复错误减少 90%
  - 新会话零 onboarding 时间
  - 自动跨功能学习

---

## 优化建议 7: Claude 记忆系统设置最佳实践

### 问题描述
Claude 用户在桌面版和 Web 版之间缺乏统一的记忆管理方案。

**来源**: [MillionEyes PR #2](https://github.com/Alineasmarrow/MillionEyes/pull/2)

### 解决方案
为 Claude Desktop 和 Web 版提供完整的记忆系统设置指南：

**Claude Desktop 方案**:
- 使用 Filesystem connector 自动文件访问
- 配置文件路径和权限
- Mac 和 Windows 的详细设置步骤

**Web 版备选方案**:
- 使用 claude.ai Projects
- 手动记忆更新 artifacts
- 复制粘贴更新流程

**记忆模板文件**:
- `memories.md` - 核心记忆存储
- `journal.md` - 内部反思空间
- `notes.md` - 临时笔记

### 关键原则
1. **真实性**: Claude 应该自然地记忆和反思，而不是机械地背诵事实
2. **透明性**: 用户可以直接阅读和编辑 Claude 的记忆和日志
3. **非机器人化**: 避免过度结构化的记忆格式

### 验证来源
- 完整的 SETUP_GUIDE.md、PROJECT_INSTRUCTIONS.md、WEB_FALLBACK_INSTRUCTIONS.md 文档
- 详细的故障排除部分

---

## 总结

以上优化建议涵盖了 OpenClaw 记忆系统的多个方面：

1. **技术修复**: Skills snapshot 过期问题（已修复）
2. **性能优化**: 本地 LLM 的上下文管理
3. **权限设计**: 子代理内存访问权限
4. **架构设计**: 四层/三层记忆架构
5. **创新方案**: 观察式记忆系统
6. **工具集成**: Memory-MCP 持久化
7. **最佳实践**: Claude 记忆系统设置

建议优先实施：
- **高优先级**: 建议 1（已修复）、建议 2（本地 LLM 用户急需）
- **中优先级**: 建议 3（子代理权限）、建议 4（架构完善）
- **长期探索**: 建议 5、6、7（创新方案参考）

---

*报告生成时间: 2026-02-26*  
*数据来源: GitHub API、OpenClaw 官方仓库、社区项目*
