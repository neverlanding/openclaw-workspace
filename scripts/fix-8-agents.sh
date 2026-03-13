#!/bin/bash
# OpenClaw 8 Agent 配置修复脚本

set -e

echo "=== OpenClaw 8 Agent 配置修复 ==="
echo ""

# 1. 检查 openclaw.json 是否存在
if [ ! -f ~/.openclaw/openclaw.json ]; then
    echo "❌ ~/.openclaw/openclaw.json 不存在"
    echo "请先运行: openclaw configure"
    exit 1
fi

echo "✓ 找到 openclaw.json"

# 2. 备份原配置
echo ""
echo "备份原配置..."
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup.$(date +%Y%m%d_%H%M%S)
echo "✓ 已备份"

# 3. 创建 agent 目录
echo ""
echo "创建 agent 目录..."
for agent in boss planner office writer news reader finance coder; do
    mkdir -p ~/.openclaw/agents/$agent/agent
    echo "  ✓ $agent"
done

# 4. 使用 Python 修改 openclaw.json
echo ""
echo "修改 openclaw.json 添加 8 个 Agent..."

python3 <> 'EOF'
import json
import sys

config_file = '/home/gary/.openclaw/openclaw.json'

with open(config_file, 'r') as f:
    config = json.load(f)

# 添加 agents.list 配置
if 'agents' not in config:
    config['agents'] = {}

agents_list = [
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

config['agents']['list'] = agents_list

# 修改默认 workspace 指向 boss
if 'defaults' in config['agents']:
    config['agents']['defaults']['workspace'] = "/home/gary/.openclaw/workspace-boss"

with open(config_file, 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("✓ openclaw.json 已更新")
EOF

echo ""
echo "========================================"
echo "✅ 配置完成！"
echo "========================================"
echo ""
echo "请运行以下命令重启 Gateway:"
echo "  openclaw gateway restart"
echo ""
echo "然后验证 Agent:"
echo "  openclaw agents list"
echo ""
