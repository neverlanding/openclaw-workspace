# TOOLS.md - 读书搭子工具箱

> 版本: v1.0 | 更新: 2026-03-20

## 常用工具/技能速查表

| 工具/技能 | 用途 | 命令/调用方式 |
|:---|:---|:---|
| `read` | 读取文本文件 | `read file_path: xxx` |
| `write` | 写入/创建文件 | `write path: xxx, content: xxx` |
| `edit` | 编辑文件内容 | `edit path: xxx, oldText: xxx, newText: xxx` |
| `memory_search` | 搜索记忆库 | `memory_search query: xxx` |
| `memory_get` | 读取记忆片段 | `memory_get path: xxx` |
| `feishu_doc` | 飞书文档操作 | 读/写/创建文档 |
| `exec` | 执行Shell命令 | 代码编译、文件处理 |

---

## ⚠️ 重要！书籍分析数据读取优先级

**当组长要求分析某本书时，必须优先读取以下目录：**

| 优先级 | 目录 | 用途 |
|:---:|:---|:---|
| 🥇 1 | `library_rag/{年份}/concepts/` | 书籍核心概念（JSON） |
| 🥈 2 | `library_rag/{年份}/chapters/` | 章节结构 |
| 🥉 3 | `library_rag/{年份}/quotes/` | 金句引用 |
| 4 | `library_rag/{年份}/metadata/` | 元数据 |
| 5 | `library/` | 本地笔记（补充） |

**原因**：library_rag 是结构化知识库，包含已提取的概念、章节、金句，直接读取更高效、更准确！

---

## ⚠️ 重要提醒：生成访问网址的标准流程

**当用户要求生成访问网址时，必须遵循以下规则：**

### 1. 每个项目必须提供4个地址
| 序号 | 地址类型 | 格式 |
|:---:|:---|:---|
| ① | 本地 | `http://localhost:8888/...` |
| ② | 内网 | `http://10.232.20.72:8888/...` |
| ③ | Tailscale | `http://100.124.242.72:8888/...` |
| ④ | Cloudflare | `https://xxx.trycloudflare.com/...` |

### 2. 必须验证后再发送
- ✅ 使用 curl 验证每个地址返回 HTTP 200
- ✅ 确认全部可用后再发给用户
- ❌ 不可用的地址不要发给用户

### 3. 如果服务器未运行
- 先启动 HTTP 服务器：`python3 -m http.server 8888`
- 重新生成 Cloudflare Tunnel（如需外网访问）

---

## 常用路径

| 路径 | 用途 |
|:---|:---|
| `/home/gary/.openclaw/workspace-reader/` | 我的工作目录 |
| `/home/gary/.openclaw/workspace-reader/library/` | 书籍和笔记库 |
| `/home/gary/.openclaw/workspace-reader/library_rag/` | RAG知识库（按年份：2023/2024/2025） |
| `/home/gary/.openclaw/workspace-reader/library/books/` | 电子书存放 |
| `/home/gary/.openclaw/workspace-reader/library/mindmaps/` | 思维导图/关系图 |
| `/home/gary/.openclaw/workspace-reader/library/notes/` | 阅读笔记 |
| `/home/gary/.openclaw/workspace-reader/library/quotes/` | 金句摘录 |
| `/home/gary/.openclaw/workspace-reader/library/reviews/` | 书评存档 |
| `/home/gary/.openclaw/workspace-reader/memory/` | 个人记忆库 |
| `/home/gary/.openclaw/shared-memory/` | 团队共享记忆 |

---

## 快捷命令

### 文件操作
```bash
# 列出书籍目录
ls /home/gary/.openclaw/workspace-reader/library/books/

# 列出已有笔记
ls /home/gary/.openclaw/workspace-reader/library/notes/

# 列出思维导图
ls /home/gary/.openclaw/workspace-reader/library/mindmaps/
```

---

## 关键配置

| 配置项 | 值 |
|:---|:---|
| 工作目录 | `/home/gary/.openclaw/workspace-reader/` |
| 记忆库位置 | `memory/` |
| 团队记忆位置 | `shared-memory/` |
| 飞书文档存储 | 使用 `feishu_doc` 工具 |

---

## 共享记忆路径

- **团队共享规范**：`/home/gary/.openclaw/shared-memory/`
- **飞书ID映射**：`/home/gary/.openclaw/shared-memory/feishu-ids.md`
- **失败教训**：`/home/gary/.openclaw/shared-memory/failure-lessons-quickref.md`
- **关键词触发规则**：`/home/gary/.openclaw/shared-memory/keyword-triggers.md`

---

## 知识图谱工具

| 格式 | 工具 | 说明 |
|:---|:---|:---|
| Mermaid (.mmd) | 手写或代码生成 | 文本流程图 |
| Markdown (.md) | 文本编辑器 | 支持Mermaid代码块 |
| HTML | Mermaid Live渲染 | 可交互查看 |
| SVG | Graphviz转换 | 矢量图输出 |

---

## 飞书文档操作

```python
# 读取文档
feishu_doc(action="read", doc_token="xxx")

# 创建并写入
feishu_doc(action="create_and_write", title="xxx", content="xxx")

# 追加内容
feishu_doc(action="append", doc_token="xxx", content="xxx")
```

---

*读书搭子工具箱 v1.0 - 持续完善中*