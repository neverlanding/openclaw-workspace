#!/bin/bash
# OpenClaw 完整恢复脚本
# 用法: ./restore-from-github.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[✓]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }

echo "========================================"
echo "  OpenClaw 完整恢复脚本"
echo "========================================"
echo ""

# 检查是否在备份目录中
if [ ! -f "config/openclaw.json.template" ]; then
    print_error "请在备份目录中运行此脚本"
    print_info "用法: cd openclaw-workspace && ./scripts/restore-from-github.sh"
    exit 1
fi

# 1. 检查 OpenClaw
if ! command -v openclaw &> /dev/null; then
    print_info "安装 OpenClaw..."
    npm install -g openclaw
fi
print_success "OpenClaw 已安装"

# 2. 初始化配置（如果不存在）
if [ ! -d ~/.openclaw ]; then
    print_info "初始化 OpenClaw..."
    openclaw configure --mode local || true
fi

# 3. 恢复主配置
print_info "恢复主配置..."
cp config/openclaw.json.template ~/.openclaw/openclaw.json
print_warning "请编辑 ~/.openclaw/openclaw.json 填入你的 API Keys"

# 4. 恢复 agents 配置
print_info "恢复 agents 配置..."
mkdir -p ~/.openclaw/agents
for agent_dir in agents/*/; do
    agent_name=$(basename "$agent_dir")
    mkdir -p ~/.openclaw/agents/$agent_name
    cp -r "$agent_dir"* ~/.openclaw/agents/$agent_name/
    print_success "agents/$agent_name"
done

# 5. 恢复所有 workspace
print_info "恢复 workspace 配置..."
for ws_dir in workspaces/workspace-*/; do
    ws_name=$(basename "$ws_dir")
    mkdir -p ~/.openclaw/$ws_name
    cp -r "$ws_dir"* ~/.openclaw/$ws_name/
    print_success "$ws_name"
done

# 6. 恢复 shared-memory
print_info "恢复 shared-memory..."
cp -r shared-memory ~/.openclaw/
print_success "shared-memory"

# 7. 恢复 shared-skills
print_info "恢复 shared-skills..."
cp -r shared-skills ~/.openclaw/
print_success "shared-skills"

# 8. 恢复 scripts
print_info "恢复 scripts..."
cp -r scripts ~/.openclaw/
print_success "scripts"

# 9. 安装插件
print_info "安装插件..."
openclaw plugins install @m1heng-clawd/feishu 2>/dev/null || print_warning "Feishu 插件安装失败"
openclaw plugins install @openclaw-china/wecom-app 2>/dev/null || print_warning "WeCom 插件安装失败"

echo ""
echo "========================================"
print_success "配置恢复完成!"
echo "========================================"
echo ""
echo "下一步操作:"
echo ""
echo "1. 编辑配置填入敏感信息:"
echo "   nano ~/.openclaw/openclaw.json"
echo "   - 填入 API Keys (qwen, kimi, moonshot 等)"
echo "   - 填入 Feishu appId 和 appSecret"
echo "   - 填入 Gateway Token"
echo ""
echo "2. 启动 Gateway:"
echo "   openclaw gateway start"
echo ""
echo "3. 验证服务:"
echo "   openclaw status"
echo ""

read -p "是否现在编辑配置文件? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ${EDITOR:-nano} ~/.openclaw/openclaw.json
fi
