#!/bin/bash
# 自动安装剩余技能脚本 - 修复版

export PATH="$HOME/.npm-global/bin:$PATH"

LOG_FILE="$HOME/.openclaw/workspace-boss/logs/remaining-skills-install.log"

echo "========================================" | tee -a "$LOG_FILE"
echo "⏰ 自动安装任务 - $(date)" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

SKILLS=("agent-browser" "byterover")

for skill in "${SKILLS[@]}"; do
    echo "" | tee -a "$LOG_FILE"
    echo "🔧 尝试安装: $skill" | tee -a "$LOG_FILE"
    
    # 检查是否已安装
    if [ -d "$HOME/.openclaw/workspace-boss/skills/$skill" ]; then
        echo "✅ $skill 已安装，跳过" | tee -a "$LOG_FILE"
        continue
    fi
    
    # agent-browser 需要 --force（被标记为可疑）
    if [ "$skill" = "agent-browser" ]; then
        echo "⚠️  $skill 需要 --force 参数（VirusTotal标记）" | tee -a "$LOG_FILE"
        clawhub install "$skill" --force 2>&1 | tee -a "$LOG_FILE"
    else
        clawhub install "$skill" 2>&1 | tee -a "$LOG_FILE"
    fi
    
    # 检查结果
    if [ -d "$HOME/.openclaw/workspace-boss/skills/$skill" ]; then
        echo "✅ $skill 安装成功" | tee -a "$LOG_FILE"
    else
        echo "❌ $skill 安装失败" | tee -a "$LOG_FILE"
    fi
    
    # 间隔3分钟避免限流
    echo "⏳ 等待 3 分钟..." | tee -a "$LOG_FILE"
    sleep 180
done

echo "" | tee -a "$LOG_FILE"
echo "✅ 任务完成 - $(date)" | tee -a "$LOG_FILE"
