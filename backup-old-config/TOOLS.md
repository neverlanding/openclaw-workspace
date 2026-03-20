# TOOLS.md - 技能清单与踩坑记录

*快速参考：有什么技能、什么时候用、要注意什么。*

---

## 📋 可用技能清单

### 🔍 信息检索与处理

| 技能 | 用途 | 关键要点/踩坑点 |
|:---|:---|:---|
| **tavily-search** | AI搜索 | 已配置API Key（tvly-dev-...），新闻搭子高频使用 |
| **web_search** / **web_fetch** | 网页搜索/提取 | 内置，无需配置；fetch适合提取正文 |
| **video-transcript-downloader** | 视频字幕提取 | ⚠️ 优先提取字幕，字幕不可用才转录；超时=音频时长×1.5 |
| **summarize** | 文本/视频摘要 | 需配置API Key；YouTube视频可直接提取摘要 |
| **defuddle** | 网页内容提取 | 已安装npm包，输出Markdown格式 |

### 📝 文档与内容输出

| 技能 | 用途 | 关键要点/踩坑点 |
|:---|:---|:---|
| **feishu_doc** | 飞书文档操作 | ⚠️ 创建文档可能内容写不进去，用 **append** 追加更可靠；发送用 **media** 参数不是 filePath |
| **feishu_drive** | 云盘文件管理 | - |
| **html-to-pdf** | Markdown转PDF | ⚠️ 文件必须放 `~/.openclaw/media/browser/` 才能发送 |
| **pdf** | PDF分析 | 内置，支持多PDF同时分析 |
| **image** | 图像分析 | 内置，支持多图同时分析 |

### 💬 通讯与协作

| 技能 | 用途 | 关键要点/踩坑点 |
|:---|:---|:---|
| **message** | 发送消息 | ⚠️ 飞书发送文件必须用 **media** 参数；media文件必须放 `~/.openclaw/media/browser/` |
| **email-sender** | 邮件发送 | 已配置Resend API，可以发送邮件 |
| **sessions_send** | 跨助手通信 | 向其他Agent发送消息 |
| **subagents** | 子Agent管理 | 查看、终止子Agent |

### ⏰ 定时与任务

| 技能 | 用途 | 关键要点/踩坑点 |
|:---|:---|:---|
| **cron** | 定时任务管理 | ⚠️ 任务完成后要自我清理（remove），避免重复执行 |
| **reminder-parser** | 自然语言提醒 | 解析"明天9点提醒我开会"这类指令 |

### 🔧 系统与工具

| 技能 | 用途 | 关键要点/踩坑点 |
|:---|:---|:---|
| **skill-vetter** | 技能安全检查 | ⚠️ 安装任何技能前必须先检查安全性 |
| **find-skills** | 技能查找 | 从ClawHub搜索社区技能 |
| **ngrok** | 外网隧道 | ⚠️ **已卸载**，改用 **Cloudflare Quick Tunnel**（见下方） |
| **cloudflared** | 外网访问（推荐） | 可同时多个隧道，免费，无需注册 |

---

## ⚠️ 高频踩坑记录

### 飞书相关
- **发送图片/文件**：必须放在 `~/.openclaw/media/browser/`，用 **media** 参数，不能用 filePath
- **文档创建**：feishu_doc 的 create 可能写不进去，用 **append** 追加内容更可靠
- **多机器人ID**：8个助手对应8个不同的Open ID，不能混用

### 视频转录
- **超时设置**：转录超时 = 音频时长 × 1.5（如15分钟音频设22分钟超时）
- **字幕优先**：先用 `--write-subs` 提取字幕，字幕不可用才用 faster-whisper 转录
- **模型选择**：统一用 faster-whisper small（466MB，中文最佳）

### 定时任务
- **进度汇报**：必须实际检查文件状态，**绝不能编造**进度
- **自我清理**：任务完成后要自动删除 cron job，避免重复执行
- **超时设置**：长任务（如视频转录）要设足够超时，避免中断

### 安全红线
- **安装技能**：必须用 **skill-vetter** 检查，确认来源可靠
- **隐私保护**：绝不对外发送手机号、地址等个人信息
- **配置修改**：改配置前必须备份，重启前必须汇报组长

---

## 📁 关键路径速查

| 用途 | 路径 |
|:---|:---|
| 飞书发送文件 | `~/.openclaw/media/browser/`（必须）|
| 公用记忆 | `~/.openclaw/workspace-boss/memory/` | 跨助手共享的规范、教训 |
| 学习材料归档 | `~/.openclaw/学习材料/[助手]/[主题]/` | 视频学习等资料 |
| 临时文件 | `~/.openclaw/workspace-boss/tmp/` | ⚠️ 不要用 `/tmp/`，重启会清理 |
| 技能目录 | `~/.openclaw/skills/` | 全局技能 |
| 工作区技能 | `~/.openclaw/workspace-boss/skills/` | boss专用技能 |

---

## 🌐 外网访问方案（Cloudflare Quick Tunnel）

**已卸载 ngrok**，统一使用 Cloudflare Quick Tunnel。

```bash
# 启动隧道
cloudflared tunnel --url http://localhost:PORT

# 示例
cloudflared tunnel --url http://localhost:9175  # 虾壳面板
cloudflared tunnel --url http://localhost:18793 # 办公室视图
```

**特点**：免费、多隧道、无需注册、URL较稳定。

---

## 🌐 网页服务四地址规范

**任何助手部署网页服务时，必须提供以下4个地址：**

| 地址类型 | 获取方式 | 示例 |
|:---|:---|:---|
| **① 本地地址** | `http://localhost:PORT` | http://localhost:9175 |
| **② 内网地址** | `ip addr` 查看本机IP | http://192.168.253.128:9175 |
| **③ Tailscale地址** | `tailscale ip -4` | http://100.124.242.72:9175 |
| **④ 公网地址** | Cloudflare Quick Tunnel | https://xxx.trycloudflare.com |

**当前服务列表：**

| 服务 | 本地端口 | 说明 |
|:---|:---:|:---|
| **虾壳面板** (Clawalytics) | 9175 | AI成本分析仪表盘 |
| **办公室视图** (Office UI) | 18793 | 8-Agent可视化办公室 |

---

## 🔧 常用命令速查

### SSH 连接

#### 内网连接
```bash
# 直接连接
ssh gary@10.232.20.72

# 带端口转发（示例：转发本地18789到远程18789）
ssh -L 18789:localhost:18789 gary@10.232.20.72
```

#### Tailscale 连接
```bash
# 主机名连接
ssh openclaw

# IP 连接
ssh gary@100.124.242.72

# 带端口转发
ssh -L 18789:localhost:18789 openclaw
ssh -L 18789:localhost:18789 gary@100.124.242.72
```

### 其他常用命令
*后续补充...*

---

*详细用法见各技能自带的 SKILL.md。此文件只记录清单和踩坑点。*