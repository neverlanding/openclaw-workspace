#!/bin/bash
# OpenClaw配置恢复脚本

echo "=== OpenClaw配置恢复 ==="
echo ""

# 检查OpenClaw是否安装
if ! command -v openclaw &> /dev/null; then
    echo "❌ OpenClaw未安装"
    echo "请先安装: npm install -g openclaw"
    exit 1
fi

echo "✓ OpenClaw已安装"

# 恢复配置文件
echo ""
echo "=== 恢复配置文件 ==="

if [ -f "./openclaw.json.backup" ]; then
    mkdir -p ~/.openclaw
    cp ./openclaw.json.backup ~/.openclaw/openclaw.json
    echo "✓ 已恢复 openclaw.json"
fi

# 恢复workspace文件
echo ""
echo "=== 恢复Workspace ==="
WORKSPACE_DIR="$HOME/.openclaw/workspace"
mkdir -p "$WORKSPACE_DIR"

# 复制所有md文件和记忆系统
cp -r ./*.md "$WORKSPACE_DIR/" 2>/dev/null
cp -r ./memory "$WORKSPACE_DIR/" 2>/dev/null
cp -r ./*.sh "$WORKSPACE_DIR/" 2>/dev/null

echo "✓ 已恢复workspace文件"

echo ""
echo "=== 恢复完成 ==="
echo "请运行: openclaw configure"
echo ""
