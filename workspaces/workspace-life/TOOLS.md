# TOOLS.md - Local Notes

> 版本: v1.1 | 更新: 2026-03-20

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

---

## 常用工具/技能速查表

| 工具/技能 | 用途 | 关键命令 |
|:---|:---|:---|
| `astock-research` | A股深度研究分析 |  skill调用 |
| `stock-analysis` | 股票技术分析 | skill调用 |
| `web_search` | 新闻和公告搜索 | web_search query="关键词" |
| `web_fetch` | 财报数据获取 | web_fetch url="链接" |
| `feishu_doc` | 飞书文档操作 | feishu_doc action="read/write" |
| `memory_search` | 记忆检索 | memory_search query="关键词" |

---

## 常用路径

| 路径 | 用途 |
|:---|:---|
| `~/.openclaw/workspace-life/` | 生活搭子工作目录 |
| `~/.openclaw/workspace-life/memory/` | 个人记忆存储 |
| `~/.openclaw/workspace-life/reports/` | 分析报告输出 |
| `~/.openclaw/shared-memory/` | 团队共享规范 |
| `~/.openclaw/agents/life/agent/` | Agent配置目录 |

---

## 快捷命令

```bash
# 查看定时任务
crontab -l

# 查看日志
tail -f /tmp/cron-life.log

# 手动测试任务
openclaw agent --agent life --message "测试消息" --channel feishu --deliver

# 重启gateway
openclaw gateway restart
```

---

## 关键配置

| 配置项 | 值 | 说明 |
|:---|:---|:---|
| Agent ID | `life` | 系统标识 |
| 飞书账号 | `6` | 飞书渠道绑定 |
| Workspace | `~/.openclaw/workspace-life` | 工作目录 |
| 定时任务日志 | `/tmp/cron-life.log` | 执行日志 |

---

## 共享记忆路径

> 所有助手必须遵守 `shared-memory/COMMON_RULES.md` 中的公共规则

| 类型 | 路径 | 用途 |
|:---|:---|:---|
| 公共规则 | `shared-memory/COMMON_RULES.md` | 团队通用规范 |
| 关键词规则 | `shared-memory/keyword-triggers.md` | 触发规则 |
| 失败教训 | `shared-memory/failure-lessons-quickref.md` | 经验总结 |

---

## 环境特定信息

### API密钥配置状态
- [ ] Brave Search API（web_search需要）
- [ ] QVeris API（股票数据）
- [ ] Finnhub API（全球金融数据）

### 持仓配置状态
- [ ] portfolios.json（持仓数据文件）

---

*This is your cheat sheet. Add whatever helps you do your job.*
