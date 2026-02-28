#!/bin/bash
#
# daily-log-ensurer.sh - 确保每日日志存在
# 应在每次会话结束时调用
#

set -e

WORKSPACE_DIR="${WORKSPACE_DIR:-$HOME/.openclaw/workspace}"
MEMORY_DIR="$WORKSPACE_DIR/memory"
DATE=$(date +%Y-%m-%d)
TIME=$(date '+%H:%M:%S')
LOG_FILE="$MEMORY_DIR/$DATE.md"

# 确保memory目录存在
mkdir -p "$MEMORY_DIR"

# 检查日志文件是否存在
if [ ! -f "$LOG_FILE" ]; then
    # 创建新的日志文件
    cat > "$LOG_FILE" << EOF
# $DATE 工作日志

> 创建时间: $TIME
> 自动创建脚本: daily-log-ensurer.sh

---

## 📝 今日概要

*待填写*

## ✅ 完成任务

### 系统任务
- [x] 日志自动创建

## 🔄 进行中

*待填写*

## 📌 备注

*自动创建的日志框架，请补充具体内容*

---

## 🕐 时间线

### $TIME - 会话开始
- 日志自动创建

EOF

    echo "✅ 已创建日志: $LOG_FILE"
else
    echo "📄 日志已存在: $LOG_FILE"
fi

# 确保目录结构完整
mkdir -p "$MEMORY_DIR/lessons"
mkdir -p "$MEMORY_DIR/projects"
mkdir -p "$MEMORY_DIR/decisions"
mkdir -p "$MEMORY_DIR/archive"
mkdir -p "$MEMORY_DIR/stats"
mkdir -p "$MEMORY_DIR/signals"
mkdir -p "$MEMORY_DIR/feedback"

exit 0
