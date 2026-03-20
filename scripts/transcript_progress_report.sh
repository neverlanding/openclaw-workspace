#!/bin/bash
# 视频转录进度监控脚本 v3.0 - 简化版

TRANSCRIPT_DIR="${TRANSCRIPT_DIR:-/tmp/transcript}"
LOG_FILE="/tmp/transcript_progress.log"
STATUS_FILE="/tmp/transcript_status.json"

# 记录日志（不输出到stdout）
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# 主函数
main() {
    log "=========================================="
    log "🎬 视频转录进度检查开始"
    log "=========================================="
    
    # 查找所有mp3文件
    local audio_files=($(ls -1 "$TRANSCRIPT_DIR"/*.mp3 2>/dev/null))
    local total_files=${#audio_files[@]}
    local completed=0
    local total_lines=0
    
    log "找到 $total_files 个音频文件"
    
    local report_details=""
    
    for audio_path in "${audio_files[@]}"; do
        local audio_name=$(basename "$audio_path")
        local transcript_path="${audio_path%.mp3}.txt"
        
        if [ -f "$transcript_path" ]; then
            local lines=$(wc -l < "$transcript_path")
            total_lines=$((total_lines + lines))
            
            if [ "$lines" -gt 5 ]; then
                ((completed++))
                report_details="${report_details}✅ ${audio_name}: ${lines}行\n"
                log "✅ ${audio_name}: 完成 (${lines}行)"
            else
                report_details="${report_details}🟡 ${audio_name}: 进行中 (${lines}行)\n"
                log "🟡 ${audio_name}: 进行中 (${lines}行)"
            fi
        else
            report_details="${report_details}⏳ ${audio_name}: 等待开始\n"
            log "⏳ ${audio_name}: 等待开始"
        fi
    done
    
    # 计算进度
    local progress=0
    if [ "$total_files" -gt 0 ]; then
        progress=$((completed * 100 / total_files))
    fi
    
    # 保存状态
    cat > "$STATUS_FILE" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "total_files": $total_files,
  "completed": $completed,
  "progress_percent": $progress,
  "total_lines": $total_lines
}
EOF
    
    # 输出汇报信息
    echo "📊 **视频转录进度汇报**"
    echo "━━━━━━━━━━━━━━━━━━━━"
    echo "⏰ 检查时间: $(date '+%H:%M:%S')"
    echo ""
    echo "**总体进度: ${progress}%**"
    echo "📁 已完成: ${completed}/${total_files} 个文件"
    echo "📝 总行数: ${total_lines} 行"
    echo ""
    echo "**详细状态:**"
    echo -e "$report_details"
    echo "━━━━━━━━━━━━━━━━━━━━"
    
    # 判断是否完成
    if [ "$completed" -eq "$total_files" ] && [ "$total_files" -gt 0 ]; then
        log "🎉 所有转录任务已完成！"
        echo "✅ 停止定时汇报任务"
        # 删除定时任务
        crontab -l 2>/dev/null | grep -v "transcript_progress" | crontab -
        log "定时任务已停止"
    else
        log "⏳ 任务进行中，30分钟后再次检查..."
    fi
    
    log "=========================================="
}

main "$@"
