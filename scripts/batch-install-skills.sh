#!/bin/bash
# 批量技能安装脚本 - 分批重试直到成功
# 由组长于 2026-03-01 授权创建
# 修复版：改进已安装技能检测逻辑

export PATH="$HOME/.npm-global/bin:$PATH:$HOME/.local/bin"

SKILL_LIST=(
    "self-improving-agent"
    "tavily-search"
    "atxp"
    "find-skills"
    "agent-browser"
    "byterover"
)

LOG_DIR="$HOME/.openclaw/workspace-boss/logs"
LOG_FILE="$LOG_DIR/skill-install-batch.log"
mkdir -p "$LOG_DIR"

echo "========================================" | tee -a "$LOG_FILE"
echo "📦 批量技能安装任务 - $(date)" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

# 函数：检查技能是否已安装（多位置检查）
check_skill_installed() {
    local skill=$1
    
    # 检查1: clawhub列表
    if clawhub list 2>/dev/null | grep -q "$skill"; then
        return 0
    fi
    
    # 检查2: 工作空间技能目录
    if [ -d "$HOME/.openclaw/workspace-boss/skills/$skill" ]; then
        return 0
    fi
    
    # 检查3: 全局技能目录
    if [ -d "$HOME/.openclaw/skills/$skill" ]; then
        return 0
    fi
    
    # 检查4: 系统技能目录
    if [ -d "$HOME/.npm-global/lib/node_modules/openclaw/skills/$skill" ]; then
        return 0
    fi
    
    return 1
}

for skill in "${SKILL_LIST[@]}"; do
    echo "" | tee -a "$LOG_FILE"
    echo "🔧 尝试安装: $skill" | tee -a "$LOG_FILE"
    
    # 检查是否已安装（改进版检测）
    if check_skill_installed "$skill"; then
        echo "✅ $skill 已安装，跳过" | tee -a "$LOG_FILE"
        continue
    fi
    
    # 尝试安装
    if clawhub install "$skill" 2>&1 | tee -a "$LOG_FILE"; then
        echo "✅ $skill 安装成功" | tee -a "$LOG_FILE"
    else
        echo "❌ $skill 安装失败（可能限流），下次重试" | tee -a "$LOG_FILE"
    fi
    
    # 每次安装间隔 2 分钟（避免触发限流）
    echo "⏳ 等待 2 分钟..." | tee -a "$LOG_FILE"
    sleep 120
done

echo "" | tee -a "$LOG_FILE"
echo "📝 安装报告:" | tee -a "$LOG_FILE"
echo "已安装技能:" | tee -a "$LOG_FILE"
for skill in "${SKILL_LIST[@]}"; do
    if check_skill_installed "$skill"; then
        echo "  ✅ $skill" | tee -a "$LOG_FILE"
    else
        echo "  ❌ $skill" | tee -a "$LOG_FILE"
    fi
done

echo "" | tee -a "$LOG_FILE"
echo "✅ 本次批次完成 - $(date)" | tee -a "$LOG_FILE"
echo "📋 未安装技能将在下次定时任务重试" | tee -a "$LOG_FILE"
