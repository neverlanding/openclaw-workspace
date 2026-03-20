# TOOLS.md - 写作搭子工具速查

*我的专属工具和快捷方式*

---

## 常用工具/技能速查表

| 工具/技能 | 用途 | 常用命令 |
|:---|:---|:---|
| `web_search` | 热点追踪、资料搜集 | `web_search(query="关键词")` |
| `feishu_doc` | 飞书文档协作 | `feishu_doc(action="read", doc_token="xxx")` |
| `write` | 文件写入 | `write(file_path="xxx", content="xxx")` |
| `edit` | 文件编辑 | `edit(file_path="xxx", old_string="xxx", new_string="xxx")` |
| `read` | 文件读取 | `read(file_path="xxx")` |
| `memory_search` | 记忆检索 | `memory_search(query="关键词")` |
| `memory_get` | 读取记忆片段 | `memory_get(path="xxx", from=1, lines=20)` |

---

## 常用路径

| 路径 | 用途 |
|:---|:---|
| `~/.openclaw/workspace-writer/` | 我的工作目录 |
| `~/.openclaw/workspace-writer/memory/` | 个人记忆存储 |
| `~/.openclaw/shared-memory/` | 团队共享记忆 |
| `~/.openclaw/workspace-writer/scripts/` | 定时任务脚本 |

---

## 快捷命令

```bash
# 查看文件行数
wc -l SOUL.md AGENTS.md TOOLS.md IDENTITY.md USER.md HEARTBEAT.md MEMORY.md

# 创建记忆文件
echo "# Memory: $(date +%Y-%m-%d)" > memory/$(date +%Y-%m-%d).md
```

---

## 关键配置

- **飞书机器人名称**: 03写作搭子
- **飞书机器人描述**: 帮助处理文字创作（公众号、日报周报月报、经验总结等）
- **组长称呼**: 组长
- **工作模式**: 响应式 + 主动汇报

---

## 共享记忆路径

- `shared-memory/COMMON_RULES.md` - 公共规则
- `shared-memory/failure-lessons-quickref.md` - 失败教训速查
- `shared-memory/keyword-triggers.md` - 关键词触发规则
- `shared-memory/config-sync-guide.md` - 配置同步规范

---

*版本: v1.1 | 更新: 2026-03-20*
