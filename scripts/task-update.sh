#!/bin/bash
# 更新任务状态脚本
# 用法: ./task-update.sh "任务ID" "新状态" "反馈内容"

TASK_ID="$1"
NEW_STATUS="$2"
FEEDBACK="$3"
UPDATE_TIME=$(date "+%Y-%m-%d %H:%M")

# 更新任务状态（简单文本替换）
sed -i "s/^| $TASK_ID |.*| 待确认 |.*$/| $TASK_ID | ... | $UPDATE_TIME | ... | ... | $NEW_STATUS | $FEEDBACK |/" ~/.openclaw/shared-memory/task-tracker.md

echo "✅ 任务 $TASK_ID 已更新为: $NEW_STATUS"
echo "📝 反馈: $FEEDBACK"
