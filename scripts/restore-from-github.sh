#!/bin/bash
# OpenClaw GitHub 恢复脚本 - 在新环境运行
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
echo "  OpenClaw GitHub 恢复脚本"
echo "========================================"
echo ""

# 1. 检查 OpenClaw
if ! command -v openclaw &> /dev/null; then
    print_info "安装 OpenClaw..."
    npm install -g openclaw
fi
print_success "OpenClaw 已安装"

# 2. 初始化配置
print_info "初始化 OpenClaw..."
openclaw configure --mode local || true

# 3. 恢复主配置
print_info "恢复主配置..."
if [ -f "config/openclaw.json.template" ]; then
    cp config/openclaw.json.template ~/.openclaw/openclaw.json
    print_warning "请编辑 ~/.openclaw/openclaw.json 填入你的 API Keys"
fi

# 4. 恢复 Workspaces
print_info "恢复 Workspaces..."
for ws in workspaces/workspace-*; do
    if [ -d "$ws" ]; then
        ws_name=$(basename "$ws")
        rm -rf ~/.openclaw/$ws_name
        cp -r "$ws" ~/.openclaw/
        print_success "$ws_name"
    fi
done

# 5. 安装插件
print_info "安装插件..."
openclaw plugins install @m1heng-clawd/feishu 2>/dev/null || print_warning "Feishu 插件安装失败"
openclaw plugins install @openclaw-china/wecom-app 2>/dev/null || print_warning "WeCom 插件安装失败"

echo ""
echo "========================================"
print_success "配置恢复完成!"
echo "========================================"
echo ""
echo "下一步操作:"
echo "1. 编辑配置: nano ~/.openclaw/openclaw.json"
echo "   - 填入你的 API Keys"
echo "   - 填入你的 Feishu appId 和 appSecret"
echo ""
echo "2. 启动 Gateway: openclaw gateway start"
echo ""
echo "3. 连接 Feishu: openclaw connect feishu"
echo ""

read -p "是否现在编辑配置文件? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    nano ~/.openclaw/openclaw.json
fi
