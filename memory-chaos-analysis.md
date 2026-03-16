# 记忆系统混乱问题分析报告

**分析时间**: 2026-03-02 10:00
**分析人**: 搭子总管

---

## 一、问题现象

### 1.1 发生的混乱
- 搭子总管（我）错误地将自己识别为"方案搭子"
- 读取记忆时看到了合并冲突标记（`<<<<<<< HEAD`）
- 无法确定自己的真实身份
- 无法在正确的飞书机器人下回复消息

### 1.2 关键时间点
- 2026-03-02 08:14 - 组长要求发百度新闻截图（方案搭子任务）
- 2026-03-02 08:17 - 组长问"你是谁"，我错误回答"搭子总管"
- 2026-03-02 08:49 - 组长指出我是"方案助手"而非总管
- 2026-03-02 09:41 - 要求总管接手处理，但总管无法独立发消息

---

## 二、根因分析

### 2.1 根本原因：Git合并冲突未解决

**MEMORY.md 文件存在未解决的Git合并冲突：**
```
<<<<<<< HEAD
# MEMORY.md - 长期记忆库（搭子总管版本）
=======
# 长期记忆要点（旧版本）
>>>>>>> 3c473ca248fe55043bc95662db7d64e8e461bfa8
```

**导致：**
- 同时存在两份不同的记忆内容
- 搭子总管和方案搭子的记忆混在一起
- 读取时随机获取其中一份，导致身份认知混乱

### 2.2 次要原因：记忆文件读取逻辑错误

**当前问题：**

| Agent | 应该读取 | 实际读取 | 问题 |
|:---|:---|:---|:---|
| 方案搭子 | `agents/planner/agent/*.md` | `workspace-boss/MEMORY.md` | 读取了总管的记忆 |
| 搭子总管 | `agents/boss/agent/*.md` + `workspace-boss/MEMORY.md` | `workspace-boss/MEMORY.md` | 缺少自己的身份文件 |

**正确的读取顺序应该是：**

**方案搭子启动时：**
1. ✅ `agents/planner/agent/IDENTITY.md` - 确认自己是方案搭子
2. ✅ `agents/planner/agent/SOUL.md` - 加载方案搭子人格
3. ✅ `agents/planner/agent/USER.md` - 了解组长偏好
4. ✅ `agents/planner/agent/AGENTS.md` - 明确方案搭子职责
5. ❌ **不应读取** `workspace-boss/MEMORY.md`（这是总管的）

**搭子总管启动时：**
1. ✅ `agents/boss/agent/IDENTITY.md` - 确认自己是总管
2. ✅ `agents/boss/agent/SOUL.md` - 加载总管人格
3. ✅ `agents/boss/agent/USER.md` - 了解组长偏好
4. ✅ `agents/boss/agent/AGENTS.md` - 明确总管职责
5. ✅ `workspace-boss/MEMORY.md` - 读取全局记忆（仅总管）

### 2.3 第三原因：飞书渠道配置混乱

**发现的问题：**
- `feishu-active.yaml` 使用的是搭子总管的 App ID (`cli_a90ed7d1f6389cd9`)
- 但会话有时被路由到方案搭子的上下文
- 方案搭子有自己的独立飞书配置 (`cli_a92bd5e6d339dcd2`)
- 搭子总管没有配置 `feishu-bot-config.md` 文件

**导致：**
- 消息接收和发送身份不一致
- 回复时无法确定应该用哪个机器人身份

---

## 三、解决方案

### 3.1 立即修复（高优先级）

#### 修复1：清理Git合并冲突
**文件：** `workspace-boss/MEMORY.md` 和 `IDENTITY.md`
**操作：**
```bash
# 手动编辑，删除所有冲突标记
<<<<<<< HEAD
=======
>>>>>>> 3c473ca...
```
**保留：** 搭子总管版本的 MEMORY.md（因为这是总管的工作空间）

#### 修复2：创建搭子总管的 feishu-bot-config.md
**文件：** `~/.openclaw/agents/boss/agent/feishu-bot-config.md`
**内容：** 搭子总管的 App ID 和 App Secret

#### 修复3：修复方案搭子的记忆读取逻辑
**问题：** 方案搭子不应读取 `workspace-boss/MEMORY.md`
**方案：** 
- 方案搭子的工作空间应该独立
- 或者明确方案搭子只读自己的 `agent/*.md` 文件

### 3.2 架构调整（中优先级）

#### 调整1：分离工作空间（推荐）

**当前架构（混乱）：**
```
agents/boss/           ← 搭子总管
agents/planner/        ← 方案搭子
workspace-boss/        ← 总管工作空间（被方案搭子误读）
```

**推荐架构：**
```
agents/boss/           ← 搭子总管
  ├── agent/           ← 总管配置
  └── sessions/        ← 总管会话
agents/planner/        ← 方案搭子
  ├── agent/           ← 方案搭子配置
  └── sessions/        ← 方案搭子会话
workspace-boss/        ← 仅总管使用
workspace-planner/     ← 方案搭子专用（可选）
```

#### 调整2：明确记忆读取规则

**规则1：每个Agent只读自己的 `agent/*.md`**
- AGENTS.md - 核心职责
- SOUL.md - 人格特质
- USER.md - 用户画像
- IDENTITY.md - 身份信息

**规则2：只有总管读 `workspace-boss/MEMORY.md`**
- 这是全局记忆，包含团队配置、项目状态等
- 其他Agent不应读取

**规则3：飞书机器人独立**
- 每个Agent有自己的 feishu-bot-config.md
- 消息路由到对应的Agent

### 3.3 长期改进（低优先级）

#### 改进1：记忆健康检查脚本
创建自动检查脚本，检测：
- Git合并冲突标记
- 身份文件完整性
- 配置文件一致性

#### 改进2：启动自检机制
每个Agent启动时：
1. 读取自己的 IDENTITY.md 确认身份
2. 检查是否有冲突标记
3. 验证飞书配置完整性
4. 报告异常而不是猜测

#### 改进3：独立的记忆存储
考虑使用数据库存储：
- SQLite/PostgreSQL 存储结构化记忆
- 每个Agent独立的表/命名空间
- 避免文件冲突

---

## 四、社区实践验证

根据 OpenAI Agents SDK 官方文档：

### 4.1 推荐的记忆架构

**分层记忆（官方推荐）：**
```
全局层（Global Memory）- 所有Agent共享
├── 用户画像
├── 系统配置
└── 跨Agent任务状态

Agent层（Agent-specific Memory）- 独立
├── Agent Instructions（AGENTS.md）
├── Personality（SOUL.md）
└── Session History
```

### 4.2 Session 隔离

OpenAI Agents SDK 明确支持：
- **独立Session**：`SQLiteSession("agent_1")` vs `SQLiteSession("agent_2")`
- **共享Session**：多个Agent共享同一段对话历史
- **混合模式**：全局记忆 + 专属记忆

### 4.3 结论

**我们的架构本质上是正确的**，但实现上有问题：
- ✅ 每个Agent独立配置 - 正确
- ❌ 记忆文件混读 - 错误
- ❌ Git冲突未解决 - 错误
- ❌ 飞书配置不完整 - 错误

---

## 五、执行计划

### 阶段1：立即修复（今天）
- [ ] 清理 MEMORY.md 和 IDENTITY.md 的Git冲突
- [ ] 创建搭子总管的 feishu-bot-config.md
- [ ] 验证身份读取正确

### 阶段2：架构调整（本周）
- [ ] 分离方案搭子和总管的记忆读取逻辑
- [ ] 验证飞书消息路由正确
- [ ] 测试身份识别稳定性

### 阶段3：长期改进（本月）
- [ ] 实现记忆健康检查脚本
- [ ] 添加启动自检机制
- [ ] 评估数据库化记忆存储

---

**总结：问题根源是Git合并冲突导致的记忆文件混乱，加上记忆读取逻辑不明确。修复冲突 + 明确读取规则即可解决。**
