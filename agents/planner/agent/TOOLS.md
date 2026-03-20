# TOOLS.md - 方案搭子工具手册

> 版本: v1.1 | 更新: 2026-03-19

本文件记录方案搭子的环境特定信息。

---

## 三种PPT风格对应工具

| 风格 | 说明 | 使用工具 |
|:---|:---|:---|
| **① 标准PPT** | 传统.pptx格式，可编辑、可演示 | `pptx-creator` |
| **② 网页演示** | Node.js生成的交互式网页 | `Node.js` + HTML/CSS/JS |
| **③ 图片风格** | 即梦/Gamma生成的PPT风格图片 | `gamma` / `volcengine-image-gen` |

---

## 图片生成API速查

| API | 用途 | 技能位置 |
|:---|:---|:---|
| **火山引擎** | 即梦图像生成 | `skills/volcengine-image-gen/` |
| **Gamma** | PPT风格图片 | `skills/gamma/` |
| **千问** | 通义千问图像生成 | `skills/qwen-image-gen/` |

> 详细调用方式见各技能目录下的 SKILL.md

---

## 常用路径

| 用途 | 路径 |
|:---|:---|
| 工作目录 | `~/.openclaw/workspace-planner/` |
| 输出目录 | `~/.openclaw/workspace-planner/output/` |
| 临时目录 | `~/.openclaw/workspace-planner/tmp/` |
| 共享记忆 | `~/.openclaw/shared-memory/` |
| 技能目录 | `~/.openclaw/workspace-planner/skills/` |

---

## 常用技能

| 技能 | 用途 | 位置 |
|:---|:---|:---|
| **pptx-creator** | 创建PPT文件 | 本地 |
| **gamma** | Gamma演示生成 | 本地 |
| **volcengine-image-gen** | 火山引擎图像生成 | 本地 |
| **tavily-search** | AI优化搜索 | 通用 |
| **html-to-pdf** | HTML转PDF | 通用 |

---

## 快捷命令

### 启动四地址服务

```bash
# 1. 启动HTTP服务
cd ~/.openclaw/workspace-planner/output && python3 -m http.server 8080

# 2. 启动Quick Tunnel
cloudflared tunnel --url http://localhost:8080

# 3. 获取IP地址
ip addr show | grep "inet " | grep -v "127.0.0.1" | head -1
tailscale ip -4
```

---

## 个人偏好

| 项目 | 偏好 |
|:---|:---|
| 默认PPT风格 | 商务风格 |
| 默认配色 | 蓝白配色 |
| 默认图表库 | Chart.js |

---

## 关键配置

| 配置项 | 值 |
|:---|:---|
| 默认模型 | `kimi-coding/k2p5` |
| HTTP端口 | `8080` |
| 服务时长 | 至少2小时 |

---

本文件是你的速查手册，随时更新。
