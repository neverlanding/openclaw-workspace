#!/bin/bash
# OpenClaw 配置迁移脚本 - 新环境一键恢复

set -e

echo "=== OpenClaw 配置恢复脚本 ==="

# 1. 检查是否已安装 OpenClaw
if ! command -v openclaw &> /dev/null; then
    echo "❌ OpenClaw 未安装，请先安装: npm install -g openclaw"
    exit 1
fi

# 2. 配置 GitHub 仓库地址（修改为你的仓库）
GITHUB_REPO="https://github.com/YOUR_USERNAME/openclaw-config.git"
BACKUP_DIR="/tmp/openclaw-backup"

echo "📥 从 GitHub 拉取配置..."
rm -rf "$BACKUP_DIR"
git clone "$GITHUB_REPO" "$BACKUP_DIR"

# 3. 恢复主配置
echo "🔧 恢复主配置..."
cp "$BACKUP_DIR/openclaw.json" ~/.openclaw/openclaw.json

# 4. 恢复所有 Workspace 配置
echo "📂 恢复 Workspace 配置..."
for workspace in workspace-boss workspace-coder workspace-finance workspace-news workspace-office workspace-planner workspace-reader workspace-writer; do
    if [ -d "$BACKUP_DIR/$workspace" ]; then
        cp -r "$BACKUP_DIR/$workspace" ~/.openclaw/
        echo "  ✅ 已恢复: $workspace"
    fi
done

# 5. 恢复 Skills 配置（如果有自定义）
if [ -d "$BACKUP_DIR/skills" ]; then
    echo "🛠️  恢复 Skills..."
    cp -r "$BACKUP_DIR/skills" ~/.openclaw/
fi

# 6. 重启 Gateway
echo "🔄 重启 Gateway..."
openclaw gateway restart

echo ""
echo "✅ 配置恢复完成！"
echo "请检查:"
echo "  1. openclaw status - 查看状态"
echo "  2. openclaw gateway status - 查看 Gateway"
echo "  3. 访问 Web UI 验证"

# 清理
rm -rf "$BACKUP_DIR"
