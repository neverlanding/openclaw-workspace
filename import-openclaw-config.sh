#!/bin/bash
# OpenClaw 8-Agent 团队配置导入脚本
# 使用: ./import-openclaw-config.sh <配置目录或压缩包>

set -e

CONFIG_SOURCE="$1"

if [ -z "$CONFIG_SOURCE" ]; then
    echo "❌ 错误: 请提供配置源"
    echo "用法: $0 <配置目录或压缩包>"
    echo "示例: $0 ./openclaw-config-20260314_120000"
    echo "       $0 ./openclaw-config-20260314_120000.tar.gz"
    exit 1
fi

echo "🚀 OpenClaw 8-Agent 团队配置导入工具"
echo "======================================"

# 检查 OpenClaw 是否安装
if ! command -v openclaw &> /dev/null; then
    echo "❌ OpenClaw 未安装，请先安装: npm install -g openclaw"
    exit 1
fi

# 处理压缩包
if [[ "$CONFIG_SOURCE" == *.tar.gz ]]; then
    echo "📦 解压配置包..."
    CONFIG_DIR=$(tar -tzf "$CONFIG_SOURCE" | head -1 | cut -f1 -d"/")
    tar -xzf "$CONFIG_SOURCE"
    CONFIG_SOURCE="$CONFIG_DIR"
fi

if [ ! -d "$CONFIG_SOURCE" ]; then
    echo "❌ 错误: 配置目录不存在: $CONFIG_SOURCE"
    exit 1
fi

echo "📁 配置源: $CONFIG_SOURCE"

# 确认提示
echo ""
echo "⚠️  这将覆盖以下配置:"
echo "   - ~/.openclaw/openclaw.json (主配置)"
echo "   - ~/.openclaw/agents/ (8个Agent)"
echo "   - ~/.openclaw/skills/ (自定义技能)"
echo "   - ~/.openclaw/extensions/ (扩展插件)"
echo "   - ~/.openclaw/workspace-*/ (工作空间)"
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

# 1. 复制主配置
echo ""
echo "📄 步骤 1/6: 导入主配置..."
if [ -f "$CONFIG_SOURCE/openclaw.json" ]; then
    mkdir -p "$HOME/.openclaw"
    cp "$CONFIG_SOURCE/openclaw.json" "$HOME/.openclaw/openclaw.json"
    echo "   ✅ 主配置已导入"
    
    # 检查是否需要填写API Key
    if grep -q "YOUR_APP_SECRET_HERE\|YOUR_API_KEY_HERE\|YOUR_GATEWAY_TOKEN_HERE" "$HOME/.openclaw/openclaw.json"; then
        echo "   ⚠️  警告: 配置文件中包含占位符，需要手动填写API Key"
        echo "      请编辑: ~/.openclaw/openclaw.json"
    fi
else
    echo "   ⚠️  未找到主配置文件"
fi

# 2. 复制 Agents
echo ""
echo "🤖 步骤 2/6: 导入 Agent 配置..."
if [ -d "$CONFIG_SOURCE/agents" ]; then
    mkdir -p "$HOME/.openclaw/agents"
    for agent in boss planner office writer news reader finance coder; do
        if [ -d "$CONFIG_SOURCE/agents/$agent" ]; then
            rm -rf "$HOME/.openclaw/agents/$agent" 2>/dev/null || true
            cp -r "$CONFIG_SOURCE/agents/$agent" "$HOME/.openclaw/agents/"
            echo "   ✅ $agent"
        fi
    done
else
    echo "   ⚠️  未找到 Agent 配置"
fi

# 3. 复制技能
echo ""
echo "🛠️ 步骤 3/6: 导入自定义技能..."
if [ -d "$CONFIG_SOURCE/skills/local" ]; then
    mkdir -p "$HOME/.openclaw/skills"
    cp -r "$CONFIG_SOURCE/skills/local/"* "$HOME/.openclaw/skills/" 2>/dev/null || true
    echo "   ✅ 本地技能已导入"
fi
if [ -d "$CONFIG_SOURCE/skills/agents" ]; then
    mkdir -p "$HOME/.agents/skills"
    cp -r "$CONFIG_SOURCE/skills/agents/"* "$HOME/.agents/skills/" 2>/dev/null || true
    echo "   ✅ Agents 技能已导入"
fi

# 4. 复制扩展插件
echo ""
echo "🔌 步骤 4/6: 导入扩展插件..."
if [ -d "$CONFIG_SOURCE/extensions" ]; then
    mkdir -p "$HOME/.openclaw/extensions"
    for ext in "$CONFIG_SOURCE/extensions"/*/; do
        ext_name=$(basename "$ext")
        if [ -d "$ext" ]; then
            rm -rf "$HOME/.openclaw/extensions/$ext_name" 2>/dev/null || true
            cp -r "$ext" "$HOME/.openclaw/extensions/"
            echo "   ✅ $ext_name"
        fi
    done
fi

# 5. 复制工作空间
echo ""
echo "💼 步骤 5/6: 导入工作空间..."
if [ -d "$CONFIG_SOURCE/workspaces" ]; then
    for ws in "$CONFIG_SOURCE/workspaces"/*/; do
        ws_name=$(basename "$ws")
        if [ -d "$ws" ]; then
            rm -rf "$HOME/.openclaw/$ws_name" 2>/dev/null || true
            cp -r "$ws" "$HOME/.openclaw/workspace-${ws_name#workspace-}"
            echo "   ✅ $ws_name"
        fi
    done
fi

# 6. 安装扩展依赖
echo ""
echo "📦 步骤 6/6: 安装扩展依赖..."
for ext_dir in "$HOME/.openclaw/extensions"/*/; do
    if [ -f "$ext_dir/package.json" ]; then
        ext_name=$(basename "$ext_dir")
        echo "   📦 安装 $ext_name 依赖..."
        (cd "$ext_dir" && npm install --silent) &>/dev/null && echo "   ✅ $ext_name" || echo "   ⚠️  $ext_name 安装失败"
    fi
done

# 验证安装
echo ""
echo "🔍 验证配置..."
echo "   Agents 数量: $(ls -1 "$HOME/.openclaw/agents" 2>/dev/null | wc -l)"
echo "   本地技能数量: $(ls -1 "$HOME/.openclaw/skills" 2>/dev/null | wc -l)"
echo "   扩展数量: $(ls -1 "$HOME/.openclaw/extensions" 2>/dev/null | grep -v "^\.$\|^\.\.$" | wc -l)"

echo ""
echo "======================================"
echo "✅ 配置导入完成!"
echo ""
echo "📝 下一步操作:"
echo ""
echo "1. 【重要】检查并填写API Key:"
echo "   nano ~/.openclaw/openclaw.json"
echo ""
echo "   需要填写的字段:"
echo "   - channels.feishu.accounts[*].appSecret (8个机器人)"
echo "   - gateway.auth.token"
echo "   - skills.entries.nano-banana-pro.apiKey (如需图片生成)"
echo ""
echo "2. 启动 Gateway:"
echo "   openclaw gateway start"
echo ""
echo "3. 测试 Agents:"
echo "   在飞书分别给8个机器人发送测试消息"
echo ""
echo "💾 原配置备份在: $BACKUP_DIR"
