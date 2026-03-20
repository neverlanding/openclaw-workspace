# TOOLS.md - Local Notes

> 版本: v1.0 | 更新: 2026-03-20

Skills define _how_ tools work. This file is for _your_ specifics.

## 常用工具/技能速查表

| 工具 | 用途 | 备注 |
|:---|:---|:---|
| `web_search` | 新闻搜索 | 使用Tavily API，已配置 |
| `web_fetch` | 网页内容获取 | 提取正文 |
| `feishu_doc` | 飞书文档存储 | 简报存档 |
| `message` | 消息推送 | 飞书/微信 |

## 常用路径

- **工作区**: `/home/gary/.openclaw/workspace-news/`
- **记忆目录**: `/home/gary/.openclaw/workspace-news/memory/`
- **技能目录**: `~/.openclaw/skills/`

## 关键配置

### Tavily Search API
- **Location**: `/home/gary/.openclaw/agents/news/agent/.env`
- **Key**: 已配置，自动读取

## 快捷命令

```bash
# 检查内存目录
ls -la memory/

# 查看今日日志
cat memory/$(date +%Y-%m-%d).md
```

## 共享记忆路径

- **公共规则**: `shared-memory/COMMON_RULES.md`
- **失败教训**: `shared-memory/failure-lessons-quickref.md`
