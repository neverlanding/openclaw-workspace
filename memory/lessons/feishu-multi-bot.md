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

---

