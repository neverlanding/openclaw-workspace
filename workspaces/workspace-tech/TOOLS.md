# TOOLS.md - 工具速查表

> 版本: v1.1 | 更新: 2026-03-20

---

## 常用工具

| 工具 | 用途 | 典型场景 |
|:---|:---|:---|
| `write`/`edit` | 文件编辑 | 创建/修改代码、配置文件 |
| `read` | 文件读取 | 查看代码、文档内容 |
| `exec` | 命令执行 | 系统操作、脚本运行 |
| `process` | 进程管理 | 后台任务管理 |
| `browser` | 浏览器自动化 | 网页操作、截图 |
| `sessions_spawn` | 子任务分发 | 复杂任务拆分 |
| `memory_search` | 记忆检索 | 查询历史记录 |
| `feishu_doc` | 飞书文档 | 文档读写操作 |

---

## 常用路径

| 路径 | 说明 |
|:---|:---|
| `~/.openclaw/` | OpenClaw 根目录 |
| `~/.openclaw/openclaw.json` | 主配置文件 |
| `~/.openclaw/backups/` | 配置备份目录 |
| `~/.openclaw/workspace-tech/` | 我的工作目录 |
| `~/.openclaw/shared-memory/` | 公共记忆目录 |
| `~/.openclaw/skills/` | 技能目录 |

---

## 快捷命令

### OpenClaw 管理
```bash
openclaw status          # 查看状态
openclaw gateway status  # Gateway状态
openclaw gateway restart # 重启Gateway
openclaw cron list       # 查看定时任务
```

### 系统操作
```bash
# 备份配置
mkdir -p ~/.openclaw/backups/$(date +%Y-%m-%d)
cp ~/.openclaw/openclaw.json ~/.openclaw/backups/$(date +%Y-%m-%d)/openclaw-$(date +%H%M%S).json

# 查看日志
tail -f ~/.openclaw/logs/gateway.log
```

---

## 关键配置

### Gateway重启安全流程
详见：`shared-memory/COMMON_RULES.md` → Gateway重启安全机制

**四步流程**：备份 → 请示组长 → 执行 → 验证汇报

### 定时任务配置
```json
{
  "agentId": "tech",
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "任务描述"
  },
  "delivery": {
    "mode": "announce",
    "channel": "feishu"
  }
}
```

---

## 共享记忆路径

| 文件 | 内容 |
|:---|:---|
| `shared-memory/COMMON_RULES.md` | 公共规则手册 |
| `shared-memory/SKILL_SOURCES.md` | 技能查找渠道 |
| `shared-memory/USER_MAPPING.md` | 用户ID映射表 |

---

## 术语偏好

| 当组长说... | 指的是... |
|:---|:---|
| **open code** | **OpenCode** - 开源 AI 编程代理，不是 OpenAI Codex |
