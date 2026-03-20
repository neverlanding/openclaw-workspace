#!/bin/bash
# 发送任务自动记录脚本
# 用法: ./task-send.sh "任务内容" "负责人" "截止时间"

TASK_CONTENT="$1"
ASSIGNEE="$2"
DEADLINE="$3"
SEND_TIME=$(date "+%Y-%m-%d %H:%M")

# 生成任务ID（基于当前任务数+1）
TASK_COUNT=$(grep -c "^| T" ~/.openclaw/shared-memory/task-tracker.md 2>/dev/null || echo "0")
TASK_ID=$(printf "T%03d" $((TASK_COUNT + 1)))

# 追加到任务追踪表
echo "| $TASK_ID | $TASK_CONTENT | $SEND_TIME | $ASSIGNEE | $DEADLINE | 待确认 | - |" >> ~/.openclaw/shared-memory/task-tracker.md

echo "✅ 任务已记录: $TASK_ID"
echo "📋 追踪表: shared-memory/task-tracker.md"
