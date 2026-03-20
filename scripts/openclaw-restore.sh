#!/bin/bash
# OpenClaw 快速恢复脚本

set -e

OPENCLAW_DIR="/home/gary/.openclaw"
BACKUP_BASE="${OPENCLAW_DIR}/backups"

usage() {
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -l, --list        列出可用备份"
    echo "  -c, --config      恢复配置（openclaw.json）"
    echo "  -a, --agent NAME  恢复指定 Agent"
    echo "  -w, --workspace   恢复工作空间"
    echo "  -s, --snapshot    恢复快照"
    echo "  -h, --help        显示帮助"
    echo ""
    echo "示例:"
    echo "  $0 --list                    # 查看备份列表"
    echo "  $0 --config 2026-03-16       # 恢复指定日期的配置"
    echo "  $0 --snapshot                # 恢复最新快照"
}

list_backups() {
    echo "📂 可用备份列表"
    echo "================"
    
    echo "\n📝 配置备份:"
    ls -lt "${BACKUP_BASE}/configs/" 2>/dev/null | head -10 || echo "  无"
    
    echo "\n🤖 Agent 备份:"
    ls -lt "${BACKUP_BASE}/agents/" 2>/dev/null | head -10 || echo "  无"
    
    echo "\n💼 工作空间备份:"
    ls -lt "${BACKUP_BASE}/workspaces/" 2>/dev/null | head -10 || echo "  无"
    
    echo "\n📸 快照:"
    ls -lt "${BACKUP_BASE}/snapshots/" 2>/dev/null | head -10 || echo "  无"
}

restore_config() {
    local date_str="${1:-latest}"
    
    if [ "$date_str" = "latest" ]; then
        local latest=$(ls -t "${BACKUP_BASE}/configs"/*/openclaw.json.* 2>/dev/null | head -1)
        if [ -z "$latest" ]; then
            echo "❌ 未找到配置备份"
            exit 1
        fi
        echo "📝 恢复最新配置: $latest"
        cp "$latest" "${OPENCLAW_DIR}/openclaw.json"
    else
        local config_file=$(find "${BACKUP_BASE}/configs" -name "openclaw.json.*${date_str}*" | head -1)
        if [ -z "$config_file" ]; then
            echo "❌ 未找到 $date_str 的配置备份"
            exit 1
        fi
        echo "📝 恢复配置: $config_file"
        cp "$config_file" "${OPENCLAW_DIR}/openclaw.json"
    fi
    
    echo "✅ 配置恢复完成，需要重启 Gateway"
}

restore_snapshot() {
    local snapshot="${BACKUP_BASE}/snapshots/latest.tar.gz"
    
    if [ ! -f "$snapshot" ]; then
        echo "❌ 未找到快照"
        exit 1
    fi
    
    echo "⚠️  警告: 恢复快照将覆盖当前配置"
    read -p "确定继续? (y/N): " confirm
    
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        echo "📸 恢复快照..."
        cd "${OPENCLAW_DIR}"
        tar xzf "$snapshot"
        echo "✅ 快照恢复完成"
    else
        echo "已取消"
    fi
}

# 解析参数
case "${1:-}" in
    -l|--list)
        list_backups
        ;;
    -c|--config)
        restore_config "${2:-latest}"
        ;;
    -s|--snapshot)
        restore_snapshot
        ;;
    -h|--help|*)
        usage
        ;;
esac
