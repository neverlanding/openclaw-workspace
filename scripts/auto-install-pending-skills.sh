#!/bin/bash
# 自动安装待处理技能脚本
# 运行频率: 每30分钟

LOG_FILE="~/.openclaw/workspace-boss/logs/skill-install-pending.log"
PENDING_FILE="~/.openclaw/workspace-boss/logs/skill-install-pending.md"
WORKSPACE="~/.openclaw/workspace-boss"

eval LOG_FILE="$LOG_FILE"
eval PENDING_FILE="$PENDING_FILE"
eval WORKSPACE="$WORKSPACE"

cd "$WORKSPACE"

echo "========================================" >> "$LOG_FILE"
echo "[>$(date '+%Y-%m-%d %H:%M:%S')] 开始检查待安装技能" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# 技能1: byterover
if [ ! -d "$WORKSPACE/skills/byterover" ]; then
  echo "[>$(date '+%H:%M:%S')] 尝试安装: byterover" >> "$LOG_FILE"
  if clawhub install byterover >> "$LOG_FILE" 2>&1; then
    echo "[>$(date '+%H:%M:%S')] ✅ byterover 安装成功" >> "$LOG_FILE"
    # 更新待安装列表
    sed -i 's/byterover.*|.*|.*$/byterover | ✅ 已安装 | 完成/' "$PENDING_FILE"
  else
    echo "[>$(date '+%H:%M:%S')] ❌ byterover 安装失败 (限流或错误)" >> "$LOG_FILE"
  fi
else
  echo "[>$(date '+%H:%M:%S')] ℹ️ byterover 已存在，跳过" >> "$LOG_FILE"
fi

echo "" >> "$LOG_FILE"

# 技能2: Star-Office-UI
if [ ! -d "$WORKSPACE/skills/Star-Office-UI" ]; then
  echo "[>$(date '+%H:%M:%S')] 尝试安装: Star-Office-UI" >> "$LOG_FILE"
  if clawhub install Star-Office-UI >> "$LOG_FILE" 2>&1; then
    echo "[>$(date '+%H:%M:%S')] ✅ Star-Office-UI 安装成功" >> "$LOG_FILE"
    # 更新待安装列表
    sed -i 's/Star-Office-UI.*|.*|.*$/Star-Office-UI | ✅ 已安装 | 完成/' "$PENDING_FILE"
  else
    echo "[>$(date '+%H:%M:%S')] ❌ Star-Office-UI 安装失败 (限流或错误)" >> "$LOG_FILE"
  fi
else
  echo "[>$(date '+%H:%M:%S')] ℹ️ Star-Office-UI 已存在，跳过" >> "$LOG_FILE"
fi

echo "" >> "$LOG_FILE"
echo "[>$(date '+%H:%M:%S')] 本次检查完成" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# 检查是否全部安装完成
if [ -d "$WORKSPACE/skills/byterover" ] && [ -d "$WORKSPACE/skills/Star-Office-UI" ]; then
  echo "🎉 所有技能安装完成！停止定时任务" >> "$LOG_FILE"
  # 可以在这里添加取消cron的命令
fi
