#!/bin/bash
# 提醒脚本模板
# 由 reminder-parser 技能自动生成

MESSAGE="${1:-提醒事项}"
LOG_FILE="${2:-/tmp/reminder.log}"

# 记录日志
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 提醒: $MESSAGE" >> "$LOG_FILE"

# 发送桌面通知（如果支持）
if command -v notify-send &> /dev/null; then
    notify-send "⏰ 提醒" "$MESSAGE" -u normal -t 10000
fi

# 尝试通过消息工具发送（如果配置了）
# 这里可以扩展为发送到特定的消息渠道

# 播放提示音（如果支持）
if command -v paplay &> /dev/null; then
    # 尝试播放系统提示音
    paplay /usr/share/sounds/freedesktop/stereo/message.oga 2>/dev/null || true
fi

echo "提醒任务完成: $MESSAGE"
