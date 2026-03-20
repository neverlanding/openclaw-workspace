#!/bin/bash
#
# create-reminder.sh - 创建定时提醒任务
# 用法: ./create-reminder.sh "明天9点半提醒我开会"
#

set -e

# 获取脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT="$1"

if [ -z "$INPUT" ]; then
    echo "❌ 错误: 请提供提醒内容"
    echo "用法: $0 '明天9点半提醒我开会'"
    exit 1
fi

# 解析提醒
PARSER_OUTPUT=$(node "$SCRIPT_DIR/parse-reminder.js" "$INPUT")

# 检查解析是否成功
if echo "$PARSER_OUTPUT" | grep -q '"error"'; then
    ERROR_MSG=$(echo "$PARSER_OUTPUT" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    echo "❌ 解析失败: $ERROR_MSG"
    exit 1
fi

# 提取信息
CRON_EXPR=$(echo "$PARSER_OUTPUT" | grep -o '"cron":"[^"]*"' | cut -d'"' -f4)
MESSAGE=$(echo "$PARSER_OUTPUT" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
DISPLAY_TIME=$(echo "$PARSER_OUTPUT" | grep -o '"displayTime":"[^"]*"' | cut -d'"' -f4)

# 生成唯一脚本名
SCRIPT_NAME="reminder_$(date +%s)_$$"
SCRIPT_PATH="/tmp/${SCRIPT_NAME}.sh"

echo "⏰ 正在创建提醒任务..."
echo "   时间: $DISPLAY_TIME"
echo "   内容: $MESSAGE"

# 创建提醒脚本
cat > "$SCRIPT_PATH" << EOF
#!/bin/bash
# 自动生成的提醒脚本
# 创建时间: $(date)
# 原输入: $INPUT

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⏰ 提醒: $MESSAGE" >> ~/.openclaw/workspace/memory/2026-02-28.md

# 发送桌面通知
if command -v notify-send &> /dev/null; then
    notify-send "⏰ 提醒" "$MESSAGE" -u normal -t 10000
fi

# 清理：删除自己
rm -f "$SCRIPT_PATH"

# 从crontab移除自己
(crontab -l 2>/dev/null | grep -v "$SCRIPT_NAME" | crontab -) || true

echo "✅ 提醒: $MESSAGE"
EOF

chmod +x "$SCRIPT_PATH"

# 添加到crontab（一次性任务，执行后自删除）
NEW_CRON="$CRON_EXPR $SCRIPT_PATH"

# 获取当前crontab并添加新任务
(crontab -l 2>/dev/null || echo "") | grep -v "$SCRIPT_NAME" | (cat; echo "$NEW_CRON") | crontab -

# 验证添加成功
if crontab -l | grep -q "$SCRIPT_NAME"; then
    echo "✅ 提醒任务创建成功！"
    echo ""
    echo "📋 任务详情:"
    echo "   时间: $DISPLAY_TIME"
    echo "   内容: $MESSAGE"
    echo "   Cron: $CRON_EXPR"
    echo ""
    echo "💡 提示: 使用 'crontab -l' 查看所有定时任务"
else
    echo "❌ 添加到crontab失败"
    rm -f "$SCRIPT_PATH"
    exit 1
fi
