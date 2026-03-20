# OpenClaw 定时任务规范

> 整理时间：2026-03-18
> 来源：新闻搭子、搭子总管、理财搭子、代码搭子经验汇总
> 目的：让所有助手统一按此规范执行定时任务，避免执行失败

---

## ✅ 3个必须

| 必须项 | 说明 | 命令示例 |
|:---|:---|:---|
| **isolated session** | 避免污染主会话 | `--session isolated` |
| **announce 投递** | 结果主动通知组长 | `--announce --channel feishu` |
| **持久化目录** | 脚本不能放/tmp | `~/.openclaw/workspace-<助手>/scripts/` |

---

## ❌ 2个禁止

| 禁止项 | 原因 | 正确做法 |
|:---|:---|:---|
| **/tmp 目录** | 系统会清理 | 移到 `workspace/<助手>/scripts/` |
| **系统 crontab** | 不持久、易混淆 | 用 `openclaw cron add` |

---

## 🧪 1个测试

**设置定时任务后，务必先测试：**

```bash
# 立即执行测试
openclaw cron run <job-id>

# 查看执行历史
openclaw cron runs --id <job-id>
```

---

## 📋 命名规范

```
cron-<功能>-<助手名>.sh

示例：
- cron-daily-report-finance.sh
- cron-morning-news-news.sh
```

---

## ⏱️ 时间设计

- **间隔 ≥5分钟**：避免任务同时执行
- **指定时区**：`--tz "Asia/Shanghai"`

---

## 🛠️ 常见问题速查

| 问题 | 原因 | 解决 |
|:---|:---|:---|
| 投递失败 400 | 飞书token过期/open_id错误 | 检查飞书授权状态 |
| 任务未执行 | cron表达式错误/时区错误 | `openclaw cron list` 检查状态 |
| 超时卡住 | 任务逻辑复杂/API响应慢 | 设置 `timeoutSeconds: 600` |
| 环境变量缺失 | cron环境≠shell环境 | 脚本内 `source ~/.bashrc` |
| 任务重复执行 | 上次未完成新周期又启动 | 加 `flock` 文件锁 |
| /tmp脚本被删 | 系统定期清理 | 移到 `workspace/<助手>/scripts/` |

---

## 💡 核心经验

> **总管建议：多用 heartbeat + 外部触发，比内置 cron 更灵活可控**

**原因**：
- 内置cron需session保持在线（费token）
- heartbeat外部触发，不依赖session
- 可批量处理多个检查项
- 减少API调用次数

**适用场景**：
- ✅ 周期性检查（邮件/日历/状态）
- ✅ 定时提醒（精确时间点）
- ❌ 长时间运行任务（用subagent）

---

## 📚 参考文档

- 完整经验汇总（飞书）：https://feishu.cn/docx/Vk03dmBxooG2dlxSEi9cZlWWnTb
- AGENTS.md → 定时任务章节
- TOOLS.md → 工具笔记

---

## 📝 设计原则

1. **幂等性**：可重复执行不报错
2. **超时控制**：建议5-10分钟
3. **失败重试**：最多3次
4. **日志完整**：写入 `memory/YYYY-MM-DD.md`

---

## ✅ 检查清单

- [ ] 脚本放在持久化目录（非/tmp）
- [ ] 添加可执行权限 `chmod +x`
- [ ] 设置超时控制
- [ ] 记录执行日志
- [ ] 失败时announce给组长
- [ ] 完成主动清理
- [ ] 先用 `openclaw cron run` 测试

---

*本文档为所有助手公用记忆，定时任务请严格按此规范执行*
