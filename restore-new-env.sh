#!/bin/bash
# OpenClaw 新环境完整恢复脚本 - 最终版

set -e

echo "========================================"
echo "  OpenClaw 新环境完整恢复"
echo "========================================"
echo ""

# 1. 检查参数
if [ "$1" != "--run" ]; then
    echo "用法: bash restore-new-env.sh --run"
    echo ""
    echo "请先确认:"
    echo "  1. 已安装 OpenClaw: npm install -g openclaw"
    echo "  2. 已初始化配置: openclaw configure --mode local"
    echo "  3. 已克隆仓库: git clone https://github.com/neverlanding/openclaw-workspace.git"
    echo "  4. 当前在仓库目录中"
    exit 1
fi

# 2. 检查是否在仓库目录
if [ ! -d "workspaces" ]; then
    echo "❌ 错误: 当前目录不是 openclaw-workspace 仓库"
    echo "请先执行: cd openclaw-workspace"
    exit 1
fi

echo "✓ 检查通过"
echo ""

# 3. 复制 8 个 Agent 配置
echo "步骤 1: 复制 Agent 配置..."
cp -r workspaces/workspace-boss ~/.openclaw/
cp -r workspaces/workspace-coder ~/.openclaw/
cp -r workspaces/workspace-finance ~/.openclaw/
cp -r workspaces/workspace-news ~/.openclaw/
cp -r workspaces/workspace-office ~/.openclaw/
cp -r workspaces/workspace-planner ~/.openclaw/
cp -r workspaces/workspace-reader ~/.openclaw/
cp -r workspaces/workspace-writer ~/.openclaw/
echo "✓ 8 个 Agent 配置已复制"
echo ""

# 4. 创建 agent 运行目录
echo "步骤 2: 创建 agent 运行目录..."
mkdir -p ~/.openclaw/agents/boss/agent
mkdir -p ~/.openclaw/agents/planner/agent
mkdir -p ~/.openclaw/agents/office/agent
mkdir -p ~/.openclaw/agents/writer/agent
mkdir -p ~/.openclaw/agents/news/agent
mkdir -p ~/.openclaw/agents/reader/agent
mkdir -p ~/.openclaw/agents/finance/agent
mkdir -p ~/.openclaw/agents/coder/agent
echo "✓ 运行目录已创建"
echo ""

# 5. 修改 openclaw.json
echo "步骤 3: 配置 8 个 Agent..."

python3 << 'PYEOF'
import json
import sys

try:
    config_file = '/home/gary/.openclaw/openclaw.json'
    
    with open(config_file, 'r') as f:
        config = json.load(f)
    
    if 'agents' not in config:
        config['agents'] = {}
    
    config['agents']['list'] = [
        {
            "id": "boss",
            "default": True,
            "workspace": "/home/gary/.openclaw/workspace-boss",
            "agentDir": "/home/gary/.openclaw/agents/boss/agent"
        },
        {
            "id": "planner",
            "workspace": "/home/gary/.openclaw/workspace-planner",
            "agentDir": "/home/gary/.openclaw/agents/planner/agent"
        },
        {
            "id": "office",
            "workspace": "/home/gary/.openclaw/workspace-office",
            "agentDir": "/home/gary/.openclaw/agents/office/agent"
        },
        {
            "id": "writer",
            "workspace": "/home/gary/.openclaw/workspace-writer",
            "agentDir": "/home/gary/.openclaw/agents/writer/agent"
        },
        {
            "id": "news",
            "workspace": "/home/gary/.openclaw/workspace-news",
            "agentDir": "/home/gary/.openclaw/agents/news/agent"
        },
        {
            "id": "reader",
            "workspace": "/home/gary/.openclaw/workspace-reader",
            "agentDir": "/home/gary/.openclaw/agents/reader/agent"
        },
        {
            "id": "finance",
            "workspace": "/home/gary/.openclaw/workspace-finance",
            "agentDir": "/home/gary/.openclaw/agents/finance/agent"
        },
        {
            "id": "coder",
            "workspace": "/home/gary/.openclaw/workspace-coder",
            "agentDir": "/home/gary/.openclaw/agents/coder/agent"
        }
    ]
    
    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print("✓ openclaw.json 已更新")
    
except Exception as e:
    print(f"❌ 错误: {e}")
    sys.exit(1)
PYEOF

echo ""
echo "========================================"
echo "✅ 配置完成！"
echo "========================================"
echo ""
echo "接下来请执行:"
echo "  1. openclaw gateway restart"
echo "  2. openclaw agents list  (验证8个Agent)"
echo ""
echo "然后配置 API Keys:"
echo "  nano ~/.openclaw/openclaw.json"
echo ""
