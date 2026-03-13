# OpenClaw多Agent自动协作3关键配置 - 视频要点总结

> 来源：B站视频《读OpenClaw源码，弄懂多Agent自动协作3关键配置(1)》
> 转录时间：2026-03-07
> 视频时长：6分钟

---

## 🎯 视频概述

作者分享如何通过3个关键配置，让OpenClaw中的多个Agent实现**自动协作、自主完成工作流**，无需人工介入。

---

## 📋 作者的3个Agent工作流

| Agent | 职责 |
|-------|------|
| **Agent 1** | 制作脚本和视频 |
| **Agent 2** | 根据脚本和视频写图文结合的Post |
| **Agent 3** | 总结/反思整个项目流程，提取主要收获和改进建议 |

---

## ❌ 原来的3个痛点

### 痛点1：手动串联工作流
- Agent 1完成后，需要人工复制粘贴路径、文件名给其他Agent
- 每一步都需要人在现场手动触发

### 痛点2：手动搬运知识
- Agent 1产出内容后，需要人工告诉其他Agent文件放在哪个文件夹
- 信息传递依赖人工，Agent之间不互通

### 痛点3：长任务需要主动跟进
- 有些任务执行需要20分钟
- 上下文太长导致Agent在第7-8步时"丢失"或session超限
- 需要在Discord里手动跟进进展

---

## ✅ 3个关键配置解决方案

### 配置1：系统基础配置（openclaw.json）

在 `openclaw.json` 中启用：

```json
{
  "tools": {
    "agentToAgent": {
      "enabled": true,
      "allowedAgents": ["agent1", "agent2", "agent3"]
    },
    "memorySearch": {
      "enabled": true,
      "model": "local-model-name"
    }
  }
}
```

**作用：**
- ✅ Agent之间可以直接发送消息，无需人工干涉
- ✅ Agent可以直接读取其他Agent的memory/学习记录

---

### 配置2：审批后自动通知下游

在**上游Agent**的配置文件中添加 `postApprovalDistribution` 模块：

```markdown
## Post Approval Distribution

当你接收到approval之后：
1. 直接通知上下游Agent
2. 告诉他们所有内容和文件地址
3. Post到Discord channel让我知道进展
```

**作用：**
- ✅ 审批通过后自动通知下游开工
- ✅ 作者不再是"传话筒"
- ✅ 通过Discord可以看到Agent之间的协作信息

---

### 配置3：Agent级别启用子任务和SubAgent

在**Agent配置文件**中启用：

```json
{
  "capabilities": {
    "delegateTasks": true,
    "supportMultipleSubAgents": true
  }
}
```

同时在Agent的prompt中指导如何分解任务。

**作用：**
- ✅ 主Agent将大任务分解为多个小任务
- ✅ 委派给不同的SubAgent并行处理
- ✅ **每个SubAgent有自己的上下文和session**，避免上下文过长问题
- ✅ 从原来22分钟缩短到3分钟，质量更高

---

## 📊 效果对比

| 维度 | Before | After |
|------|--------|-------|
| 人工介入 | 工作流中的一环 | 管理整个系统 |
| Agent协作 | 需要人工传递 | 自动衔接和合作 |
| 长任务处理 | 20分钟，易丢失上下文 | 3分钟，质量高 |
| 运行模式 | 需要人在现场 | 7×24小时无人值守 |

---

## 💡 核心要点

1. **Agent-to-Agent通信**：让Agent直接对话，不经过人
2. **Memory共享**：Agent可以读取彼此的记忆和学习
3. **子任务分解**：长任务拆分为短任务，并行处理，避免上下文超限

---

## 📁 原始转录文件

完整转录文本保存于：`/tmp/transcription_openclaw.txt`

---

*总结完成时间：2026-03-07*
