# Agent 名称变更映射表

**创建时间**: 2026-03-20
**维护者**: 搭子总管
**用途**: 助手名称变更后的查找对照（重要！）

---

## 📋 完整的变更对照表

| Account ID | 旧 Agent ID | 旧名称 | 新 Agent ID | 新名称 |
|:---:|:---:|:---|:---:|:---|
| 4 | news | 新闻搭子 | info | 信息搭子 |
| 6 | finance | 理财搭子 | life | 生活搭子 |
| 7 | coder | 代码搭子 | tech | 技术搭子 |

---

## 📋 Session Key 对照表

| 新 Agent ID | 新名称 | 当前可用的 session key | 旧 session key |
|:---:|:---|:---|:---|
| info | 信息搭子 | `agent:info:main` | `agent:news:main` |
| life | 生活搭子 | `agent:life:main` | `agent:finance:main` |
| tech | 技术搭子 | `agent:tech:main` | `agent:coder:main` |

---

## ✅ 发送消息时使用正确的 key

```bash
sessions_send --sessionKey agent:info:main --message "消息"   # 信息搭子
sessions_send --sessionKey agent:life:main --message "消息"   # 生活搭子
sessions_send --sessionKey agent:tech:main --message "消息"   # 技术搭子
```

---

*最后更新: 2026-03-20*
