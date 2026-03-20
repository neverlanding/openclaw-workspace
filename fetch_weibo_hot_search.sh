#!/bin/bash
# 微博热搜自动获取脚本

# 设置工作目录
WORK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 日志文件
LOG_FILE="$WORK_DIR/weibo_scraping.log"

# 结果存储目录
RESULTS_DIR="$WORK_DIR/weibo_results"
mkdir -p "$RESULTS_DIR"

echo "$(date '+%Y-%m-%d %H:%M:%S') - 开始执行微博热搜获取任务" >> "$LOG_FILE"

# 运行Python脚本获取微博热搜
cd $WORK_DIR
python3 simple_weibo_scraper.py

# 检查执行结果
if [ $? -eq 0 ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - 微博热搜获取任务成功完成" >> "$LOG_FILE"
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - 微博热搜获取任务执行失败" >> "$LOG_FILE"
fi

echo "----------------------------------------" >> "$LOG_FILE"