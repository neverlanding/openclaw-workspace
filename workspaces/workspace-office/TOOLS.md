# TOOLS.md - 工具速查

> 版本: v1.1 | 更新: 2026-03-20

---

公共规则参考：`shared-memory/COMMON_RULES.md`

---

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## 办公工具速查表

| 工具 | 用途 | 备注 |
|:---|:---|:---|
| `feishu_doc` | 飞书文档读写 | 创建、编辑、导出文档 |
| `feishu_bitable` | 飞书多维表格 | 报销记录管理 |
| `write`/`edit` | 文件编辑 | Markdown/文本文件 |
| `pdf` | PDF分析生成 | 从HTML生成PDF文档 |
| `web_search` | 资料搜索 | 格式规范、排版参考 |
| `send_email.py` | 邮件发送 | 163邮箱SMTP |

---

## 常用路径

| 用途 | 路径 |
|:---|:---|
| 工作空间根目录 | `~/.openclaw/workspace-office/` |
| 共享记忆 | `~/.openclaw/shared-memory/` |
| 会议纪要归档 | `~/.openclaw/workspace-office/meetings/` |
| 报销发票归档 | `~/.openclaw/workspace-office/reimbursement/` |
| 日报月报归档 | `~/.openclaw/workspace-office/reports/` |
| 脚本目录 | `~/.openclaw/workspace-office/scripts/` |

---

## 邮件配置

| 配置项 | 值 |
|:---|:---|
| 发件人 | wgyx2000@163.com |
| SMTP服务器 | smtp.163.com:465 |
| 使用方式 | `python3 send_email.py <收件人> <主题> <内容文件>` |

---

## 📚 公共学习目录

**位置**：`/home/gary/.openclaw/学习材料/`

**结构**：按助手分类 → 按学习主题划分

```
学习材料/
├── 办公搭子/
│   ├── 视频学习规范/
│   └── OpenClaw实战/
├── ...（其他助手）
```

**存储规范**（每个学习主题下）：
```
主题目录/
├── 视频信息.md          ← 基本信息（标题、链接、时长、日期）
├── 原始资料/            ← 提取的音频文件
├── 中间整理/            ← 转录文本等中间产物
└── 学习总结/            ← 学习笔记
```

---

> 详细调用方式见各技能目录下的 SKILL.md
