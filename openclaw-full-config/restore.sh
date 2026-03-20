#!/bin/bash
# OpenClaw 完整配置恢复脚本
# 使用: ./restore.sh

set -e

echo "🚀 OpenClaw 完整配置恢复工具"
echo "=============================="
echo ""

# 检查 OpenClaw 是否安装
if ! command -v openclaw &> /dev/null; then
    echo "❌ OpenClaw 未安装，请先安装: npm install -g openclaw"
    exit 1
fi

# 确认提示
echo "⚠️  这将覆盖现有配置:"
echo "   - ~/.openclaw/openclaw.json"
echo "   - ~/.openclaw/agents/ (8个Agent)"
echo "   - ~/.openclaw/skills/"
echo "   - ~/.openclaw/extensions/"
echo "   - ~/.openclaw/memory/"
echo ""
read -p "确认继续? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消"
    exit 1
fi

# 备份现有配置
BACKUP_DIR="$HOME/.openclaw/backups/$(date +%Y%m%d_%H%M%S)"
echo "💾 备份现有配置到: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
[ -f "$HOME/.openclaw/openclaw.json" ] && cp "$HOME/.openclaw/openclaw.json" "$BACKUP_DIR/"
[ -d "$HOME/.openclaw/agents" ] && cp -r "$HOME/.openclaw/agents" "$BACKUP_DIR/"
[ -d "$HOME/.openclaw/skills" ] && cp -r "$HOME/.openclaw/skills" "$BACKUP_DIR/"
[ -d "$HOME/.openclaw/extensions" ] && cp -r "$HOME/.openclaw/extensions" "$BACKUP_DIR/"
[ -d "$HOME/.openclaw/memory" ] && cp -r "$HOME/.openclaw/memory" "$BACKUP_DIR/"

# 1. 恢复主配置
echo ""
echo "📄 步骤 1/5: 恢复主配置..."
if [ -f "01-core-config/openclaw.json" ]; then
    cp "01-core-config/openclaw.json" "$HOME/.openclaw/openclaw.json"
    echo "   ✅ 主配置已恢复"
    echo "   ⚠️  注意: 配置文件中API Key为[REDACTED]，需手动填写"
else
    echo "   ⚠️  未找到主配置文件"
fi

# 2. 恢复Agents
echo ""
echo "🤖 步骤 2/5: 恢复 Agent 配置..."
if [ -d "02-agents" ]; then
    for agent in boss planner office writer news reader finance coder; do
        if [ -d "02-agents/$agent" ]; then
            rm -rf "$HOME/.openclaw/agents/$agent" 2>/dev/null || true
            cp -r "02-agents/$agent" "$HOME/.openclaw/agents/"
            echo "   ✅ $agent"
        fi
    done
else
    echo "   ⚠️  未找到 Agent 配置"
fi

# 3. 恢复Skills
echo ""
echo "🛠️ 步骤 3/5: 恢复 Skills..."
[ -d "03-skills/local" ] && cp -r 03-skills/local/* "$HOME/.openclaw/skills/" 2>/dev/null || true
[ -d "03-skills/agents" ] && cp -r 03-skills/agents/* "$HOME/.agents/skills/" 2>/dev/null || true
echo "   ✅ Skills已恢复"

# 4. 恢复Extensions
echo ""
echo "🔌 步骤 4/5: 恢复 Extensions..."
if [ -d "04-extensions" ]; then
    for ext in feishu wecom-app; do
        if [ -d "04-extensions/$ext" ]; then
            rm -rf "$HOME/.openclaw/extensions/$ext" 2>/dev/null || true
            cp -r "04-extensions/$ext" "$HOME/.openclaw/extensions/"
            echo "   ✅ $ext"
        fi
    done
fi

# 5. 恢复其他数据
echo ""
echo "💾 步骤 5/5: 恢复其他数据..."
[ -d "05-shared-knowledge" ] && cp -r 05-shared-knowledge/* "$HOME/.openclaw/shared-knowledge/" 2>/dev/null || true
[ -d "09-system-memory" ] && cp -r 09-system-memory/* "$HOME/.openclaw/memory/" 2>/dev/null || true
echo "   ✅ 共享知识和系统记忆已恢复"

# 安装扩展依赖
echo ""
echo "📦 安装扩展依赖..."
for ext_dir in "$HOME/.openclaw/extensions"/*/; do
    if [ -f "$ext_dir/package.json" ]; then
        ext_name=$(basename "$ext_dir")
        echo "   📦 安装 $ext_name 依赖..."
        (cd "$ext_dir" && npm install --silent) >/dev/null 2>&1 && echo "   ✅ $ext_name" || echo "   ⚠️  $ext_name 安装失败"
    fi
done

echo ""
echo "=============================="
echo "✅ 配置恢复完成!"
echo ""
echo "📝 下一步操作:"
echo ""
echo "1. 【重要】填写API Key:"
echo "   nano ~/.openclaw/openclaw.json"
echo ""
echo "   需要填写的字段:"
echo "   - channels.feishu.accounts[*].appSecret"
echo "   - gateway.auth.token"
echo "   - auth.profiles[*].apiKey"
echo ""
echo "2. 启动 Gateway:"
echo "   openclaw gateway start"
echo ""
echo "3. 测试 Agents:"
echo "   在飞书分别给8个机器人发送测试消息"
echo ""
echo "💾 原配置备份在: $BACKUP_DIR"
