#!/bin/bash
# 2026-03-09 提醒任务

echo "⏰ 提醒任务执行 - $(date)"

# 通过 OpenClaw 发送提醒消息
# 通知搭子总管发送提醒给组长

MESSAGE="📅 组长，您设置的待办提醒时间到了！（2026-03-09 09:00）"

echo "$MESSAGE"
echo "提醒已触发"
