# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 📚 公共学习目录

**位置**：`/home/gary/.openclaw/学习材料/`

**结构**：按助手分类 → 按学习主题划分

```
学习材料/
├── 办公搭子/
│   ├── 视频学习规范/
│   └── OpenClaw实战/
├── 理财搭子/
│   ├── 股票投资/
│   └── 量化交易/
├── 代码搭子/
│   ├── K8s_Kubeflow/
│   └── AI编程/
├── 新闻搭子/
├── 策划搭子/
├── 写作搭子/
└── 阅读搭子/
```

**存储规范**（每个学习主题下）：
```
主题目录/
├── 视频信息.md          ← 基本信息（标题、链接、时长、日期）
├── 原始资料/            ← 提取的音频文件（audio.m4a/audio.wav）
├── 中间整理/            ← 转录文本等中间产物
└── 学习总结/            ← 学习笔记（.md/.html/.pdf）
```

**更新说明**：
- 新学习材料按"谁学习→什么主题"归档
- 视频不存，但音频需提取保存到"原始资料"
- 学习总结必须包含：核心观点、关键金句、个人思考
