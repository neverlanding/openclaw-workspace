#!/bin/bash
# Token消耗统计脚本
# 每天20:00自动执行，记录当日所有子Agent任务的token消耗

PROJECT_DIR="/home/gary/.openclaw/workspace/token-stats-project"
DATE=$(date +%Y-%m-%d)
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAILY_FILE="$PROJECT_DIR/$YEAR/$MONTH/${DATE}.md"

# 创建月份目录（如果不存在）
mkdir -p "$PROJECT_DIR/$YEAR/$MONTH"

# 读取MEMORY.md中的token统计
echo "# Token消耗日报 - $DATE" > "$DAILY_FILE"
echo "" >> "$DAILY_FILE"
echo "生成时间：$(date '+%Y-%m-%d %H:%M:%S')" >> "$DAILY_FILE"
echo "" >> "$DAILY_FILE"

# 提取MEMORY.md中的token统计部分
if [ -f "/home/gary/.openclaw/workspace/MEMORY.md" ]; then
    echo "## 今日任务统计" >> "$DAILY_FILE"
    echo "" >> "$DAILY_FILE"
    
    # 提取Token消耗统计表格
    sed -n '/## Token消耗统计/,/## /p' /home/gary/.openclaw/workspace/MEMORY.md | \
    grep -E "^\|" >> "$DAILY_FILE"
    
    echo "" >> "$DAILY_FILE"
    echo "---" >> "$DAILY_FILE"
    echo "" >> "$DAILY_FILE"
    echo "*数据来源：MEMORY.md*" >> "$DAILY_FILE"
else
    echo "## 今日任务统计" >> "$DAILY_FILE"
    echo "" >> "$DAILY_FILE"
    echo "未找到MEMORY.md文件" >> "$DAILY_FILE"
fi

echo "Token日报已生成：$DAILY_FILE"