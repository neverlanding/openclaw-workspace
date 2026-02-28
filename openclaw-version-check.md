# OpenClaw 版本检查报告

**检查时间**: 2026-02-27 12:33 (GMT+8)

---

## 📌 最新版本信息

| 项目 | 内容 |
|------|------|
| **最新版本号** | v2026.2.26 |
| **发布日期** | 2026年2月26日 00:01 (UTC) |
| **版本状态** | 稳定版 (Immutable) |

---

## 🆚 本地版本对比

| 项目 | 内容 |
|------|------|
| **当前本地版本** | v2026.2.24 |
| **最新版本** | v2026.2.26 |
| **版本差距** | 落后 2 个版本 |

---

## ✨ 主要新特性 (v2026.2.26)

### 1. 🔐 外部密钥管理 (External Secrets Management)
- 引入完整的 `openclaw secrets` 工作流
- 支持 audit、configure、apply、reload 命令
- 运行时快照激活
- 严格的密钥应用目标路径验证
- 更安全的迁移清理机制
- 支持仅引用 (ref-only) 的认证配置文件

### 2. 🤖 ACP/线程绑定 Agent
- 将 ACP Agent 提升为线程会话的一流运行时
- 支持 `acp spawn/send` 调度集成
- acpx 后端桥接
- 生命周期控制和启动协调
- 运行时清理和合并线程回复

### 3. 🛣️ Agent 路由 CLI
- 新增 `openclaw agents bindings` 命令
- 新增 `openclaw agents bind` 命令
- 新增 `openclaw agents unbind` 命令
- 支持账户范围的路由管理
- 支持从仅频道绑定升级到账户范围绑定
- 角色感知绑定身份处理

### 4. 🔌 Codex/WebSocket 传输
- 默认启用 WebSocket-first 传输 (transport: "auto")
- 保留 SSE 回退机制
- 支持按模型/运行时的显式传输覆盖
- 新增传输选择回归测试和文档

### 5. 📱 Android 节点功能增强
- 新增 Android 设备能力支持
- 新增 `device.status` 和 `device.info` 节点命令
- 新增 `notifications.list` 支持，可列出设备活动通知

### 6. 🔐 安全改进
- Gemini CLI OAuth 增加显式账户风险警告和确认门
- 网关 WebSocket 认证增强，强制执行来源检查
- 密码认证失败限流扩展到浏览器来源本地环回尝试
- 阻止非 Control-UI 浏览器客户端的静默自动配对

---

## 🔧 重要修复

### Telegram 相关
- **DM 白名单运行时继承**: 强制执行 `dmPolicy: "allowlist"` 的 `allowFrom` 要求，使用有效的账户+父配置
- **sendChatAction 401 处理**: 添加有界指数退避 + 临时本地输入抑制，防止无限制重试循环
- **Webhook 启动**: 澄清 webhook 配置指南，允许 `webhookPort: 0` 进行临时监听器绑定

### 输入指示器修复
- 防止运行完成后卡住的输入指示器
- 添加最大持续时间保护，自动停止输入指示器
- 统一运行范围的输入抑制，防止跨频道泄漏

### 队列/投递可靠性
- 防止重试饥饿，持久化 `lastAttemptAt`
- 网关重启期间拒绝新队列入队
- 添加 `/stop` 队列积压截止元数据

### 其他修复
- **浏览器/Chrome 扩展握手**: 修复连接挑战帧处理，避免卡住状态
- **Feishu 权限错误调度**: 合并发送者名称权限通知到主入站调度
- **代理/Canvas 默认节点解析**: 当存在多个连接的 canvas 能力节点时，默认选择第一个
- **Pi 图像令牌使用**: 停止每轮重新注入历史图像块，防止令牌无限增长

---

## ⚠️ 破坏性变更

- **Heartbeat 直接/DM 投递默认**: 现在默认为 `allow`。如需保持 2026.2.24 的 DM 阻止行为，需设置 `agents.defaults.heartbeat.directPolicy: "block"`

---

## 📋 更新建议

### 建议操作
1. **升级至 v2026.2.26**
   ```bash
   npm update -g openclaw
   ```

2. **检查配置兼容性**
   - 如使用 `heartbeat.dmPolicy`，需迁移到新的 `agents.defaults.heartbeat.directPolicy` 配置
   - 检查 Telegram DM 白名单配置，确保 `allowFrom` 设置正确

3. **验证密钥管理**
   - 新版本引入了外部密钥管理功能，可考虑迁移敏感配置到 secrets 工作流

4. **测试关键功能**
   - 升级后测试 Agent 路由功能
   - 验证频道绑定是否正常工作
   - 检查输入指示器是否正常清理

### 升级风险
- **低风险**: 主要为 bug 修复和功能增强
- **注意**: 心跳策略默认变更可能影响 DM 投递行为

---

## 📚 参考链接

- [GitHub Releases](https://github.com/openclaw/openclaw/releases)
- [v2026.2.26 完整发布说明](https://github.com/openclaw/openclaw/releases/tag/v2026.2.26)

---

*报告生成时间: 2026-02-27 12:33 (GMT+8)*
