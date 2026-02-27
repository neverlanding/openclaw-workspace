#!/bin/bash
# Token统计脚本 - 每日自动统计

STATS_DIR="$HOME/.openclaw/workspace/memory/stats"
DATE=$(date +%Y-%m-%d)
STATS_FILE="$STATS_DIR/daily-$DATE.json"

# 创建目录
mkdir -p "$STATS_DIR"

# 获取当前会话统计
echo "=== Token统计 - $DATE ==="
echo "{"
echo "  \"date\": \"$DATE\","
echo "  \"timestamp\": \"$(date -Iseconds)\","

# 统计子代理消耗
echo "  \"subagents\": {"
# 从sessions目录统计
SESSION_COUNT=$(find ~/.openclaw/sessions -name "*.json" -mtime -1 2>/dev/null | wc -l)
echo "    \"count\": $SESSION_COUNT,"
echo "    \"note\": \"查看sessions目录获取详细信息\""
echo "  },"

# 统计文件变更
echo "  \"files\": {"
cd "$HOME/.openclaw/workspace"
MEMORY_LINES=$(wc -l < MEMORY.md 2>/dev/null || echo 0)
DAILY_LOGS=$(find memory -name "*.md" -mtime -1 2>/dev/null | wc -l)
echo "    \"memory_md_lines\": $MEMORY_LINES,"
echo "    \"daily_logs_count\": $DAILY_LOGS"
echo "  },"

# 统计Git提交
echo "  \"git\": {"
COMMITS=$(git log --oneline --since="$DATE 00:00:00" --until="$DATE 23:59:59" 2>/dev/null | wc -l)
echo "    \"commits_today\": $COMMITS"
echo "  }"

echo "}"

# 保存到文件
cat > "$STATS_FILE" << EOF
{
  "date": "$DATE",
  "timestamp": "$(date -Iseconds)",
  "subagents": {
    "count": $SESSION_COUNT,
    "note": "查看sessions目录获取详细信息"
  },
  "files": {
    "memory_md_lines": $MEMORY_LINES,
    "daily_logs_count": $DAILY_LOGS
  },
  "git": {
    "commits_today": $COMMITS
  }
}
EOF

echo ""
echo "✓ 统计已保存到: $STATS_FILE"
