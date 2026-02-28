---
name: reminder-parser
version: 1.0.0
description: 自然语言提醒解析器 - 将"明天9点半提醒我开会"转换为定时任务
---

# Reminder Parser ⏰

将自然语言时间描述转换为可执行的定时提醒任务。

## 功能

- 解析自然语言时间（如"明天9点半"、"3小时后"、"下周一早上8点"）
- 自动生成cron表达式
- 创建临时提醒脚本并写入crontab
- 支持多渠道提醒（消息、日志等）

## 使用方法

### 基本用法

```
明天9点半提醒我开会
3小时后提醒我给电池充电
下周一早上8点提醒我周报
```

### 支持的格式

| 类型 | 示例 | 说明 |
|------|------|------|
| 相对时间 | "3小时后" | 从现在起X小时 |
| 绝对日期 | "明天9点半" | 明天的具体时间 |
| 星期 | "下周一早上8点" | 指定星期的时间 |
| 具体日期 | "3月15日下午2点" | 指定日期时间 |

## 工作流程

```
1. 解析用户输入的自然语言时间
2. 转换为cron表达式
3. 创建提醒脚本（存储在 /tmp/ 下）
4. 添加到crontab
5. 确认创建成功
```

## 文件位置

- 技能文档：`~/.openclaw/workspace/skills/reminder-parser/SKILL.md`
- 解析脚本：`~/.openclaw/workspace/skills/reminder-parser/parse-reminder.js`
- 提醒脚本模板：`~/.openclaw/workspace/skills/reminder-parser/reminder-template.sh`
- 辅助脚本：`~/.openclaw/workspace/skills/reminder-parser/create-reminder.sh`

## 依赖

- Node.js（用于自然语言解析）
- cron（系统定时任务）

## 安全说明

- 所有脚本存储在 /tmp/ 下，系统重启后自动清理
- 不读取任何敏感文件
- 仅操作当前用户的crontab
- 最小权限原则

## 更新日志

### v1.0.0 (2026-02-28)
- 初始版本
- 支持中英文时间解析
- 基础cron表达式生成
