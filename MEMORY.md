<<<<<<< HEAD
# MEMORY.md - 长期记忆库

_这是搭子总管的长期记忆库。重要决策、项目状态、关键信息都记录在这里。_

---

## 🎯 活跃项目

### Agent 团队建设（已完成）
**启动时间**：2026-02-28
**目标**：创建8个专职Agent，组成高效工作团队

**进度**：
- [x] 搭子总管（总指挥）- 已完成配置
- [x] 方案搭子 - 已完成配置
- [x] 办公搭子 - 已完成配置
- [x] 公众号搭子 - 已完成配置（含知识库）
- [x] 新闻搭子 - 已完成配置
- [x] 读书搭子 - 已完成配置
- [x] 理财搭子 - 已完成配置
- [x] 代码搭子 - 已完成配置

**关键配置**：
- Agent目录：`~/.openclaw/agents/`
- 工作空间：`~/.openclaw/workspace-boss/`
- Gateway已注册

### 方案搭子飞书机器人配置（2026-02-28）
**状态**：✅ 已配置外部机器人执行

**凭证信息**：
- App ID: cli_a92bdf6a6d329dcd2
- App Secret: 已安全存储
- 配置位置: `~/.openclaw/agents/planner/agent/feishu-bot-config.md`

**使用方式**：
- 在飞书群聊中 @方案搭子 直接调用
- 私聊方案搭子机器人发送文档需求
- 独立接收和处理PPT/Word文档类任务

**安全提醒**：此配置包含敏感凭证，请勿泄露！

---

## 👤 关于组长

- **称呼**：组长
- **身份**：我的老板，8-Agent团队的拥有者
- **风格**：目标导向、注重结果、喜欢简洁高效沟通
- **沟通渠道**：飞书

---

## 🛠️ 系统配置

### 已安装技能清单（2026-02-28 统计）

**总计：68+ 个技能**

#### 1. 系统默认技能 (51个)
包括：coding-agent, github, gh-issues, web_search, web_fetch 等

#### 2. ClawHub下载 - 全局技能 (4个)
- `find-skills` - 技能查找与推荐
- `skill-vetter` - 技能安全检查
- `tavily-search` - AI搜索
- `reminder-parser` - 提醒解析

#### 3. Workspace技能 (7个)
- `astock-research` - A股深度投研
- `nanobanana-ppt` - NanoBanana PPT
- `ontology` - 知识图谱本体
- `pptx-creator` - PowerPoint创建
- `stock-analysis` - 股票分析
- ~~`gamma`~~ - 已删除
- ~~`prezentit`~~ - 已删除

#### 4. 扩展插件技能 (6个)
- **feishu插件**：feishu-doc, feishu-drive, feishu-wiki, feishu-perm
- **open-prose插件**：prose

#### 5. 待安装技能
- `self-improving-agent` - 自我改进代理（限流中）
- `summarize` - 文本摘要（限流中）

#### 6. 通用技能（新）
- `ngrok` - 外网服务部署（待安装）

---

## 📝 重要决策记录

### 2026-02-28：技能安装审批流程
**决策人**：组长
**内容**：建立技能安装审批流程（安全检查→分类建议→最终拍板）
**状态**：已生效

### 2026-02-28：删除付费PPT技能
**决策人**：组长
**内容**：删除 gamma 和 prezentit 技能（需付费API Key）
**状态**：已执行

### 2026-02-28：公众号搭子知识库
**决策人**：组长
**内容**：为公众号搭子创建RAG知识库
- 路径：`~/.openclaw/agents/writer/knowledge/`
**状态**：已创建

### 2026-02-28：ngrok 外网部署技能（通用）
**决策人**：组长
**内容**：选定 ngrok 作为外网服务部署技能，配置为通用技能
**状态**：README 已创建，待安装
**安装指南**：~/.openclaw/skills/ngrok/README.md
**用途**：将本地服务暴露到外网，生成可访问的公网链接
**适用搭子**：所有搭子（通用技能）

---

## 🔍 知识片段

### 技能安装工作流程（重要！）
**生效时间**：2026-02-28
**规则**：
1. **安全检查**：先用 `skill-vetter` 检查技能安全性
2. **分类建议**：我判断是公共技能还是某个搭子的专属技能
3. **最终确认**：组长拍板决定是否安装

**技能分类原则**：
- 公共技能：feishu系列、web工具、file操作、ngrok等通用工具
- 专属技能：与搭子核心职责强相关的专业工具

### Agent 创建流程
1. 创建目录结构：`mkdir -p ~/.openclaw/agents/{name}/{agent,sessions}`
2. 写入配置文件：AGENTS.md, SOUL.md, USER.md
3. 注册到 Gateway：编辑 `openclaw.json`
4. 重启 Gateway 或等待自动加载

### 常用命令
- `sessions_spawn` - 创建子Agent会话
- `sessions_send` - 向Agent发送消息
- `sessions_list` - 查看所有会话
- `memory_search` - 搜索记忆
- `subagents list` - 查看子代理状态

---

*最后更新：2026-02-28*


### 2026-03-01：批量技能安装定时任务
**决策人**：组长
**内容**：创建重复执行技能安装任务，直到6个技能全部安装成功
- 技能清单：self-improving-agent, tavily-search, atxp, find-skills, agent-browser, byterover
- 执行策略：每15分钟自动重试，分批安装避开限流
- 脚本位置：`~/.openclaw/workspace-boss/scripts/batch-install-skills.sh`
- 追踪文件：`~/.openclaw/workspace-boss/logs/skill-install-tracker.md`
**状态**：⏳ 进行中（Cron定时执行）
=======
# 长期记忆要点

> **文档元信息**  
> 创建时间: 2026-02-25  
> 最后更新: 2026-02-26  
> 验证状态: 【已验证】✅  
> 有效期至: 2026-05-26（季度审查）

---

## 飞书配置状态 【已验证】✅

- **状态**: 飞书通道已成功配置并启用
- **App ID**: cli_a90ed7d1f6389cd9
- **权限**: 已获得用户信息读取权限(contact:contact.base:readonly)
- **功能**: 用户可通过飞书正常与AI助手交流
- **记录时间**: 2026-02-25
- **有效期至**: 2026-08-25（半年）

---

## 重要新闻事件 【待验证】⚠️

- **状态**: 动态信息，需定期更新
- **记录时间**: 2026-02-25
- **内容**: 今日热点包括中俄关系、武汉冲刺一线城市、小洛熙医疗事件等
- **备注**: 新闻事件具有时效性，建议每日更新

---

## 子Agent并行工作模式（已启用）【已验证】✅

### 🔄 工作流程
1. 用户发送任务 → 启动子Agent（后台运行）
2. 用户继续发送新消息
3. 检测到有子Agent在运行
4. **主动询问**: "检测到X个子Agent运行中，是否并行执行新任务？"
5. 用户选择处理方式

### 📝 交互规则
- **并发上限**: 最多3个子Agent同时运行
- **检测频率**: 每次用户发送消息时自动检测
- **超过上限**: 提示排队或等待

### 💬 询问模板
```
🔄 检测到X个子Agent正在运行：[任务1], [任务2]...

你想怎么处理这个新任务？
- 1️⃣ 后台并行执行（启动新子Agent）
- 2️⃣ 主会话立即处理（当前对话流）
- 3️⃣ 等等再说（先完成现有任务）
```

### 📊 优先级建议
- 短时间任务（<30秒）→ 主会话处理
- 长时间任务（>1分钟）→ 子Agent并行
- 紧急任务 → 主会话立即处理

- **启用时间**: 2026-02-25
- **确认时间**: 2026-02-25（用户确认模式）
- **记录时间**: 2026-02-25
- **有效期至**: 2026-08-25（半年）

---

## Token消耗统计（2026-02-25）【已验证】✅

| 任务 | 子Agent | 模型 | Token数 | 耗时 | 状态 |
|------|---------|------|---------|------|------|
| PPT生成 | ppt_generator | coder-model | 12.0k | 15s | ✅ 完成 |
| 静态Web页面 | web_demo | k2p5 | 23.4k | 2m55s | ✅ 完成 |
| Node.js PPT Web初始 | nodejs_ppt_web | coder-model | 12.2k | 3m0s | ⚠️ 未完成 |
| Node.js前端补全 | nodejs_frontend | coder-model | n/a | 33s | ⚠️ 未完成 |
| 环境重建+文件创建 | setup_moore_web | coder-model | ~15k | 2m+ | ✅ 完成 |
| 工作区部署Web项目 | create_moore_web | coder-model | ~18k | 3m+ | ✅ 完成 |
| 测试任务 | test_task | coder-model | 14.0k | 2m26s | ✅ 完成 |
| AI芯片调研 | ai_chip_research | coder-model | 20.8k | 9m36s | ✅ 完成 |
| Token统计+图片分析 | parallel_tasks | coder-model | 14.5k | 2m13s | ✅ 完成 |
| 摩尔定律增强v1 | moore_ppt_enhance | coder-model | 34.2k | 1m | ❌ 超时 |
| 摩尔定律增强v2 | moore_enhance_v2 | coder-model | ~8k | 1m | ❌ 失败 |
| **今日总计** | - | - | **~156k** | - | - |

**说明**:
- 主会话(k2p5)的对话消耗未计入（主要是上下文维护）
- 子Agent任务token = input + output
- 实际API调用可能有轻微差异
- 建议每日检查 `/tmp/moore-web.log` 和 `session_status` 获取更准确数据

- **记录时间**: 2026-02-25
- **有效期至**: 2026-05-25（3个月，统计数据需定期更新）

---

## 记忆系统架构（v2.0）【已验证】✅

### 三层记忆系统

**参考**: danielmiessler Personal AI Infrastructure + Jason Zuo 分层记忆

- **🔥 P0 热记忆** - 永远在脑子里
  - `MEMORY.md` - 核心长期记忆
  - `memory/YYYY-MM-DD.md` - 最近7天日志
  - `SOUL.md` - 核心人格
  
- **🌡️ P1 温记忆** - 需要时能想起来
  - `memory/lessons/` - 经验教训
  - `memory/projects/` - 项目档案
  - `memory/decisions/` - 重要决策
  - `memory/feedback/` - 反馈记录（新增）
  - `memory/verified/` - 验证记录（新增）
  - `memory/signals/` - 信号捕获（新增）
  
- **❄️ P2 冷记忆** - 长期归档
  - `memory/archive/` - 归档日志
  - `memory/stats/` - 统计数据

**自动维护**:
- `memory-health.sh` - 健康检查脚本
- MEMORY.md >200行自动归档
- 90天+旧日志自动清理
- Git自动备份

- **启用时间**: 2026-02-26
- **记录时间**: 2026-02-26
- **有效期至**: 长期有效（架构性内容）

---

## 验证状态图例

- 【已验证】✅ - 信息已确认准确有效
- 【待验证】⚠️ - 需要进一步确认
- 【已过期】❌ - 信息不再适用
- 【已更新】🔄 - 信息已被新版本替代

>>>>>>> 3c473ca248fe55043bc95662db7d64e8e461bfa8
