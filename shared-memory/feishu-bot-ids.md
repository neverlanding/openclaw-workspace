# 8-Agent团队飞书机器人完整信息映射表

*用于群聊@和消息发送*

---

## 👤 群聊信息

| 项目 | 值 |
|:---|:---|
| **群聊名称** | 搭子合作群 |
| **群聊ID** | `oc_a9fde469b9dc7558da7371393670951e` |

---

## 🤖 机器人完整信息映射

| 编号 | 助手名称 | Agent ID | 飞书User ID | App ID | 备注 |
|:---:|:---|:---:|:---|:---|:---|
| 00 | **搭子总管** | boss | `ou_a64750afd367e7356e2a8e9020332b07` | `cli_a90ed7d1f6389cd9` | ✅ 已验证 |
| 01 | **方案搭子** | planner | `ou_9efbd0231296f6bdd0e00109d1779537` | `cli_a92bd5e6d339dcd2` | ✅ 已记录 |
| 02 | **办公搭子** | office | `ou_94a64d4fb7aec63c6268002cd8fb1ff2` | `cli_a92ce59b76fb9cc2` | ✅ 已记录 |
| 03 | **写作搭子** | writer | `ou_1e944905cd6d9f3ac799d694420b546d` | `cli_a92cc78ef8b89ccd` | ✅ 已记录 |
| 04 | **新闻搭子** | news | `ou_862d6a8a34f4f00ef9afb4aa20107b73` | `cli_a92ce03f79b85cee` | ✅ 已记录 |
| 05 | **读书搭子** | reader | `ou_f9229839a63825a9894ae742837352ca` | `cli_a92ce21baa3a9cb5` | ✅ 已记录 |
| 06 | **理财搭子** | finance | `ou_a12cacdc455427a98e1784d8ea906aae` | `cli_a92ce269bd789cc6` | ✅ 已记录 |
| 07 | **代码搭子** | coder | `ou_4c215bdedadd1fa20d392251d3912298` | `cli_a92ce2c190769cb3` | ✅ 已记录 |

---

## 📝 使用说明

### 正确的@格式（群聊）
```xml
<!-- ✅ 正确：使用 id 属性 -->
<at id="ou_9efbd0231296f6bdd0e00109d1779537">01方案搭子</at>

<!-- ❌ 错误：不要用 user_id 属性 -->
<at user_id="ou_9efbd0231296f6bdd0e00109d1779537">方案搭子</at>
```

### 关键区别
| 属性 | 效果 |
|:---|:---|
| `id` | ✅ 蓝色mention，触发通知 |
| `user_id` | ❌ 灰色文本，不触发通知 |

### 私聊发送方式
```javascript
target: "user:ou_9efbd0231296f6bdd0e00109d1779537"
// 或
sessionKey: "agent:planner:main"
```

### 重要提示
- **群聊@**: 使用 `user_id` 属性
- **私聊**: 使用 Open ID 或 sessionKey
- **App ID**: 用于飞书应用配置和绑定

---

*更新时间: 2026-03-19 15:48*  
*状态: ✅ 全部8个机器人完整信息已记录*
