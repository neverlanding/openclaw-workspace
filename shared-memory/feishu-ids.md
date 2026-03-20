# 8-Agent团队飞书ID映射表

*用于群聊@和消息发送*

*版本: v2.1 | 更新: 2026-03-20*

---

## 👤 群聊信息

| 名称 | 群ID |
|:---|:---|
| **搭子合作群** | `oc_a9fde469b9dc7558da7371393670951e` |

---

## 👥 8个助手完整信息

### 正确的ID映射（2026-03-19 更新）

用于群聊@时，`id` 属性使用以下Open ID：

| 编号 | 助手 | Agent ID | Open ID (用于@) | App ID |
|:---:|:---|:---:|:---|:---|
| 00 | **搭子总管** | boss | `ou_f77ea00deafa4f758b787c776e3a6760` | `cli_a90ed7d1f6389cd9` |
| 01 | **方案搭子** | planner | `ou_62478fccac5bc80ba4b3e0a132a50a51` | `cli_a92bd5e6d339dcd2` |
| 02 | **办公搭子** | office | `ou_7bb9301d4e536096202dd1b66221cb9d` | `cli_a92ce59b76fb9cc2` |
| 03 | **写作搭子** | writer | `ou_a3f9737a88001505e4f9eb8d9797b1ab` | `cli_a92cc78ef8b89ccd` |
| 04 | **信息搭子** | info | `ou_940a58f5e640ce2664614ac3da84c7eb` | `cli_a92ce03f79b85cee` |
| 05 | **读书搭子** | reader | `ou_2a83be1183c7b62a22fb8a8a4f07c243` | `cli_a92ce21baa3a9cb5` |
| 06 | **生活搭子** | life | `ou_21992d3e2f8be4c081b8c8aac8ea6a71` | `cli_a92ce269bd789cc6` |
| 07 | **技术搭子** | tech | `ou_c0a3eb81d3306fa0d973376799e8bfda` | `cli_a92ce2c190769cb3` |

---

## 📝 使用说明

### 群聊@格式（正确方式）
```
<at id="ou_62478fccac5bc80ba4b3e0a132a50a51">01方案搭子</at>
```

**关键**：属性是 `id`，不是 `user_id`

### 私聊发送
```javascript
// 使用message工具，target格式：
target: "user:ou_62478fccac5bc80ba4b3e0a132a50a51"
```

### 群聊发送
```javascript
target: "chat:oc_a9fde469b9dc7558da7371393670951e"
```

---

## ⚠️ 重要说明

**2026-03-19 更正**：之前记录的ID有误，以上ID是今天验证的正确ID。

**OpenClaw限制**：通过 `message` 工具发送的 `<at id="...">` 消息：
- ✅ 在飞书中显示为**蓝色mention**
- ❌ **无法触发机器人响应**（机器人收不到通知）

**有效方式**：用户直接在飞书客户端点击@按钮，才能真正触发机器人。

---

*位置: shared-memory/feishu-ids.md*
