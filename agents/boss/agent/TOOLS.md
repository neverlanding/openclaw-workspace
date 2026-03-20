# TOOLS.md - 技能与踩坑速查

*最常用工具、关键路径、易错点*

*版本: v1.1 | 更新: 2026-03-19*

---

## 🚨 急救速查

| 问题 | 解决 |
|:---|:---|
| 飞书发送失败 | 复制到 `workspace-boss/tmp/` 再试 |
| 收到助手求助 | 立即答复 + **主动汇报组长** |
| 视频转录超时 | 超时 = 音频时长 × 1.5 |
| 定时任务重复 | 任务末尾加 `cron remove` |

---

## 📋 高频技能 TOP 5

| 技能 | 用途 | 关键要点 |
|:---|:---|:---|
| **message** | 发送消息 | `media`参数；失败→`tmp/`目录 |
| **feishu_doc** | 飞书文档 | `append`比`create`可靠 |
| **cron** | 定时任务 | 完成必须`self-remove` |
| **tavily-search** | AI搜索 | 已配API Key |
| **video-transcript** | 视频字幕 | 优先提取字幕，次选faster-whisper |

**其他**：web_search, sessions_send, subagents, skill-vetter, cloudflared

---

## ⚠️ 高频踩坑 TOP 6

### 1. 飞书发送
- `media`参数，失败→`workspace-boss/tmp/`

### 2. 助手沟通
- 收到求助→立即答复+**主动汇报组长**

### 3. 视频转录
- 超时=音频时长×1.5，必须验证完整性

### 4. 定时任务
- 完成必须`self-remove`，禁止编造进度

### 5. 配置修改
- 备份→组长确认→重启，失败立即回滚

### 6. 地址发送（新增！）
- **发送前必须验证**：`curl -s -o /dev/null -w "%{http_code}" [地址]`
- **HTTP 200才汇报**，禁止凭记忆/假设发送
- 四地址规范：本地/内网/Tailscale/Cloudflare全部验证

**详细教训**: `shared-memory/failure-lessons-quickref.md`

---

## 📁 关键路径

| 用途 | 路径 |
|:---|:---|
| **临时/备用发送** | `~/.openclaw/workspace-boss/tmp/` |
| **公用记忆** | `~/.openclaw/shared-memory/` |
| **失败教训** | `~/.openclaw/workspace-boss/memory/signals/failure-lessons-quickref.md` |
| **我的技能** | `~/.openclaw/workspace-boss/skills/` |
| **全局技能** | `~/.openclaw/skills/` |

---

## 🌐 外网访问

```bash
cloudflared tunnel --url http://localhost:PORT
```

**4地址**: 本地 + 内网 + Tailscale + 公网(Quick Tunnel)

---

## 🔧 常用命令

```bash
ssh openclaw              # Tailscale连接
ssh -L 18789:localhost:18789 openclaw  # 端口转发
```

---

*详细: 各技能SKILL.md | 公用记忆: `shared-memory/`*
