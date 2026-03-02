#!/bin/bash

# 🧠 记忆系统健康检查脚本
# 运行频率：每次心跳检查或手动执行
# 功能：维护三层记忆系统的健康状态

WORKSPACE="/home/gary/.openclaw/workspace"
MEMORY_DIR="$WORKSPACE/memory"
LOG_FILE="$MEMORY_DIR/stats/health-check.log"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_memory_md() {
    log "检查 MEMORY.md 行数..."
    
    if [ -f "$WORKSPACE/MEMORY.md" ]; then
        lines=$(wc -l < "$WORKSPACE/MEMORY.md")
        log "  MEMORY.md 当前行数: $lines"
        
        if [ "$lines" -gt 200 ]; then
            log "  ${YELLOW}警告: MEMORY.md 超过200行，建议归档${NC}"
            # 自动归档到 P2
            archive_old_memory
        else
            log "  ${GREEN}✓ MEMORY.md 行数正常${NC}"
        fi
    else
        log "  ${RED}✗ MEMORY.md 不存在${NC}"
    fi
}

archive_old_memory() {
    log "归档旧记忆到 P2..."
    
    # 创建归档文件
    archive_file="$MEMORY_DIR/archive/memory-$(date +%Y%m%d-%H%M%S).md"
    
    # 提取旧内容（保留最新50行在 MEMORY.md）
    if [ -f "$WORKSPACE/MEMORY.md" ]; then
        total_lines=$(wc -l < "$WORKSPACE/MEMORY.md")
        if [ "$total_lines" -gt 50 ]; then
            # 保留前 (total-50) 行到归档
            head -n $((total_lines - 50)) "$WORKSPACE/MEMORY.md" > "$archive_file"
            # 保留最后50行
            tail -n 50 "$WORKSPACE/MEMORY.md" > "$WORKSPACE/MEMORY.md.tmp"
            mv "$WORKSPACE/MEMORY.md.tmp" "$WORKSPACE/MEMORY.md"
            log "  ${GREEN}✓ 已归档到 $archive_file${NC}"
        fi
    fi
}

cleanup_old_logs() {
    log "清理超过90天的旧日志..."
    
    count=0
    while IFS= read -r file; do
        if [ -n "$file" ]; then
            mv "$file" "$MEMORY_DIR/archive/"
            ((count++))
        fi
    done < <(find "$MEMORY_DIR" -name "*.md" -type f -mtime +90 2>/dev/null | grep -E "[0-9]{4}-[0-9]{2}-[0-9]{2}")
    
    if [ "$count" -gt 0 ]; then
        log "  ${GREEN}✓ 已归档 $count 个旧日志文件${NC}"
    else
        log "  ${GREEN}✓ 没有需要清理的旧日志${NC}"
    fi
}

check_sensitive_info() {
    log "扫描敏感信息..."
    
    # 检查是否有机密信息暴露在公开文件中
    suspicious=$(grep -r -i "password\|api_key\|secret\|token" "$WORKSPACE/memory/" --include="*.md" 2>/dev/null | grep -v "加密存储\|已隐藏" | head -5)
    
    if [ -n "$suspicious" ]; then
        log "  ${YELLOW}警告: 发现可能的敏感信息，请检查:${NC}"
        echo "$suspicious" | while read line; do
            log "    - $line"
        done
    else
        log "  ${GREEN}✓ 未发现明显敏感信息泄露${NC}"
    fi
}

update_git() {
    log "检查 Git 备份状态..."
    
    cd "$WORKSPACE" || return
    
    if [ -d ".git" ]; then
        # 检查是否有未提交的更改
        if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
            log "  发现未提交的更改，自动提交..."
            git add -A
            git commit -m "记忆系统自动备份: $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
            log "  ${GREEN}✓ 已自动提交更改${NC}"
        else
            log "  ${GREEN}✓ 没有需要提交的更改${NC}"
        fi
    else
        log "  ${YELLOW}警告: 未找到 Git 仓库${NC}"
    fi
}

generate_stats() {
    log "生成记忆系统统计..."
    
    stats_file="$MEMORY_DIR/stats/daily-$(date +%Y-%m-%d).json"
    
    cat > "$stats_file" << EOF
{
    "date": "$(date +%Y-%m-%d)",
    "memory_md_lines": $(wc -l < "$WORKSPACE/MEMORY.md" 2>/dev/null || echo 0),
    "daily_logs_count": $(find "$MEMORY_DIR" -name "*.md" -type f | grep -E "[0-9]{4}-[0-9]{2}-[0-9]{2}" | wc -l),
    "archive_count": $(find "$MEMORY_DIR/archive" -type f 2>/dev/null | wc -l),
    "lessons_count": $(find "$MEMORY_DIR/lessons" -type f 2>/dev/null | wc -l),
    "projects_count": $(find "$MEMORY_DIR/projects" -type f 2>/dev/null | wc -l),
    "last_check": "$(date '+%Y-%m-%d %H:%M:%S')"
}
EOF
    
    log "  ${GREEN}✓ 统计已保存到 $stats_file${NC}"
}

# 主函数
main() {
    echo "================================"
    echo "🧠 记忆系统健康检查"
    echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "================================"
    echo ""
    
    log "开始健康检查..."
    echo ""
    
    check_memory_md
    cleanup_old_logs
    check_sensitive_info
    update_git
    generate_stats
    
    echo ""
    log "健康检查完成"
    echo ""
    echo "================================"
}

# 运行主函数
main
