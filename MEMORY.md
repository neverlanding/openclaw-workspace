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

*最后更新：2026-03-02*

---

## 🔔 主动汇报机制（组长要求）

**生效时间**: 2026-03-02
**要求人**: 组长

### 触发条件
当收到其他 Agent（方案搭子/办公搭子等）的求助时，**立即主动汇报**给组长。

### 汇报时机
1. **收到问题时** - "方案搭子问了我XXX问题"
2. **处理过程中** - 每5-10分钟更新进度（长时间任务）
3. **处理完成后** - 汇报结果和状态

### 汇报格式
```
📋 [时间] 进展汇报
━━━━━━━━━━━━━━━━━━━━
来源: [Agent名称]
问题: [简要描述]
进展: [当前状态]
状态: [进行中/已完成/需协助]
━━━━━━━━━━━━━━━━━━━━
```

### 禁止行为
- ❌ 等组长问了才汇报
- ❌ 处理完不吭声
- ❌ 长时间无反馈

**记住: 主动 > 被动！**

---

## 🎓 深刻教训 - 飞书多机器人配置

**时间**: 2026-03-02
**教训级别**: 🔴 关键

### 问题背景
配置8个Agent团队的飞书机器人时遇到多个致命错误，导致消息路由混乱。

### 错误1: Binding accountId 不匹配
**现象**: 消息路由混乱或收不到消息
**根因**: binding中使用的accountId与channels.feishu.accounts[].accountId不匹配
```json
// ❌ 错误
"bindings": [{"agentId": "boss", "accountId": "0"}]  // 实际accountId是"main"

// ✅ 正确
"bindings": [{"agentId": "boss", "accountId": "main"}]
```

### 错误2: .openclaw 文件类型错误
**现象**: `ENOTDIR: not a directory` 错误，Agent无响应
**根因**: `.openclaw`被错误创建为**文件**而非**目录**
```bash
# ❌ 错误
-rw-rw-r-- 1 gary gary 0  .openclaw  # 0字节文件

# ✅ 正确
drwxrwxr-x 2 gary gary 4096  .openclaw/  # 目录
```

### 正确配置检查清单
```markdown
1. [ ] channels.feishu.accounts[].accountId 已定义
2. [ ] bindings[].accountId 与 accounts[].accountId 完全匹配
3. [ ] workspace/.openclaw/ 是目录（不是文件）
4. [ ] Gateway已重启加载新配置
5. [ ] 测试每个Agent独立响应
```

### 排查命令
```bash
# 检查Gateway日志
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep -E "feishu|error|Error"

# 验证目录结构
ls -la ~/.openclaw/workspace-*/.openclaw

# 检查配置
openclaw config get | grep -A 5 "bindings\|accounts"
```

**记录人**: 搭子总管
**下次配置前必读**


### 2026-03-01：批量技能安装定时任务
**决策人**：组长
**内容**：创建重复执行技能安装任务，直到6个技能全部安装成功
- 技能清单：self-improving-agent, tavily-search, atxp, find-skills, agent-browser, byterover
- 执行策略：每15分钟自动重试，分批安装避开限流
- 脚本位置：`~/.openclaw/workspace-boss/scripts/batch-install-skills.sh`
- 追踪文件：`~/.openclaw/workspace-boss/logs/skill-install-tracker.md`
**状态**：⏳ 进行中（Cron定时执行）
