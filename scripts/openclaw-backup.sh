#!/bin/bash
# OpenClaw 自动备份脚本
# 功能：备份配置、工作空间、记忆文件
# 建议：添加到 crontab 每天运行

set -e

# 配置
OPENCLAW_DIR="/home/gary/.openclaw"
BACKUP_BASE="${OPENCLAW_DIR}/backups"
DATE=$(date +%Y%m%d_%H%M%S)
TODAY=$(date +%Y-%m-%d)
KEEP_DAYS=30  # 保留30天

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARNING:${NC} $1"
}

error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ERROR:${NC} $1"
}

# 创建备份目录
mkdir -p "${BACKUP_BASE}"

# 1. 备份 OpenClaw 核心配置
backup_config() {
    log "📄 备份核心配置..."
    local config_backup="${BACKUP_BASE}/configs/${TODAY}"
    mkdir -p "${config_backup}"
    
    # 备份主配置
    if [ -f "${OPENCLAW_DIR}/openclaw.json" ]; then
        cp "${OPENCLAW_DIR}/openclaw.json" "${config_backup}/openclaw.json.${DATE}"
        log "  ✅ openclaw.json"
    fi
    
    # 备份 Gateway 配置
    if [ -d "${OPENCLAW_DIR}/gateway" ]; then
        tar czf "${config_backup}/gateway.${DATE}.tar.gz" -C "${OPENCLAW_DIR}" gateway/ 2>/dev/null || warn "gateway 备份失败"
        log "  ✅ gateway/"
    fi
    
    # 备份插件配置
    if [ -d "${OPENCLAW_DIR}/extensions" ]; then
        tar czf "${config_backup}/extensions.${DATE}.tar.gz" -C "${OPENCLAW_DIR}" extensions/ 2>/dev/null || warn "extensions 备份失败"
        log "  ✅ extensions/"
    fi
}

# 2. 备份 Agent 配置
backup_agents() {
    log "🤖 备份 Agent 配置..."
    local agent_backup="${BACKUP_BASE}/agents/${TODAY}"
    mkdir -p "${agent_backup}"
    
    for agent_dir in "${OPENCLAW_DIR}"/agents/*/; do
        if [ -d "${agent_dir}/agent" ]; then
            local agent_name=$(basename "${agent_dir}")
            tar czf "${agent_backup}/${agent_name}.${DATE}.tar.gz" -C "${agent_dir}" agent/ 2>/dev/null
            log "  ✅ ${agent_name}"
        fi
    done
}

# 3. 备份工作空间（关键文件）
backup_workspaces() {
    log "💼 备份工作空间..."
    local ws_backup="${BACKUP_BASE}/workspaces/${TODAY}"
    mkdir -p "${ws_backup}"
    
    # 只备份关键文件，不备份 node_modules 等
    for ws_dir in "${OPENCLAW_DIR}"/workspace-*/; do
        if [ -d "${ws_dir}" ]; then
            local ws_name=$(basename "${ws_dir}")
            log "  📁 ${ws_name}..."
            
            # 使用 rsync 排除不需要的文件
            local temp_dir=$(mktemp -d)
            rsync -av --exclude='node_modules' \
                      --exclude='.git' \
                      --exclude='__pycache__' \
                      --exclude='*.log' \
                      --exclude='tmp/' \
                      --exclude='.venv' \
                      "${ws_dir}" "${temp_dir}/" 2>/dev/null || warn "${ws_name} 备份失败"
            
            tar czf "${ws_backup}/${ws_name}.${DATE}.tar.gz" -C "${temp_dir}" . 2>/dev/null
            rm -rf "${temp_dir}"
            log "    ✅ 完成"
        fi
    done
}

# 4. 备份记忆文件
backup_memory() {
    log "🧠 备份记忆文件..."
    local memory_backup="${BACKUP_BASE}/memory/${TODAY}"
    mkdir -p "${memory_backup}"
    
    # 备份主记忆文件
    if [ -f "${OPENCLAW_DIR}/workspace-boss/MEMORY.md" ]; then
        cp "${OPENCLAW_DIR}/workspace-boss/MEMORY.md" "${memory_backup}/MEMORY.md.${DATE}"
        log "  ✅ MEMORY.md"
    fi
    
    # 备份每日记忆
    if [ -d "${OPENCLAW_DIR}/workspace-boss/memory" ]; then
        tar czf "${memory_backup}/daily_memory.${DATE}.tar.gz" \
            -C "${OPENCLAW_DIR}/workspace-boss" memory/ 2>/dev/null
        log "  ✅ memory/"
    fi
}

# 5. 创建快照（完整状态）
create_snapshot() {
    log "📸 创建系统快照..."
    local snapshot_dir="${BACKUP_BASE}/snapshots"
    mkdir -p "${snapshot_dir}"
    
    local snapshot_name="openclaw-snapshot-${DATE}"
    local snapshot_path="${snapshot_dir}/${snapshot_name}.tar.gz"
    
    # 创建快照（排除大文件和缓存）
    tar czf "${snapshot_path}" \
        --exclude='node_modules' \
        --exclude='.git' \
        --exclude='__pycache__' \
        --exclude='*.log' \
        --exclude='tmp/*' \
        --exclude='.venv' \
        --exclude='Cache/*' \
        --exclude='browser/*' \
        --exclude='chrome-data/*' \
        -C "${OPENCLAW_DIR}" \
        openclaw.json \
        agents/ \
        workspace-boss/ \
        2>/dev/null || warn "快照创建失败"
    
    log "  ✅ 快照: ${snapshot_name}"
    
    # 创建最新快照链接
    ln -sf "${snapshot_path}" "${snapshot_dir}/latest.tar.gz"
}

# 6. 清理旧备份
cleanup_old() {
    log "🧹 清理旧备份（保留${KEEP_DAYS}天）..."
    
    find "${BACKUP_BASE}" -type f -mtime +${KEEP_DAYS} -delete 2>/dev/null
    find "${BACKUP_BASE}" -type d -empty -delete 2>/dev/null
    
    log "  ✅ 清理完成"
}

# 7. 生成备份报告
generate_report() {
    local report_file="${BACKUP_BASE}/backup-report-${DATE}.txt"
    
    cat > "${report_file}" << EOF
OpenClaw 备份报告
==================
时间: $(date)
主机: $(hostname)
用户: $(whoami)

备份内容:
---------
EOF
    
    # 统计备份大小
    du -sh "${BACKUP_BASE}/"*/${TODAY} 2>/dev/null >> "${report_file}" || true
    
    cat >> "${report_file}" << EOF

快照位置:
${BACKUP_BASE}/snapshots/latest.tar.gz

恢复命令:
# 恢复配置
cp ${BACKUP_BASE}/configs/${TODAY}/openclaw.json.* ~/.openclaw/openclaw.json

# 恢复工作空间
cd ~/.openclaw && tar xzf ${BACKUP_BASE}/workspaces/${TODAY}/workspace-boss.*.tar.gz

# 恢复快照
cd ~/.openclaw && tar xzf ${BACKUP_BASE}/snapshots/openclaw-snapshot-${DATE}.tar.gz
EOF
    
    log "📊 报告已生成: ${report_file}"
}

# 主函数
main() {
    log "🚀 OpenClaw 备份开始"
    log "====================="
    
    backup_config
    backup_agents
    backup_workspaces
    backup_memory
    create_snapshot
    cleanup_old
    generate_report
    
    log "====================="
    log "✅ 备份完成！"
    log "📂 备份位置: ${BACKUP_BASE}"
    log "💾 总大小: $(du -sh ${BACKUP_BASE} 2>/dev/null | cut -f1)"
    
    # 显示今日备份
    log "\n今日备份列表:"
    find "${BACKUP_BASE}" -name "*${TODAY}*" -type f -exec ls -lh {} \; 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}' || true
}

# 执行
main "$@"
