#!/bin/bash
# OpenClaw GitHub 迁移工具 - 原环境推送脚本
# 用法: ./push-to-github.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[✓]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }

# 配置
REPO_URL="https://github.com/neverlanding/openclaw-workspace.git"
BACKUP_BRANCH="config-backup-$(date +%Y%m%d-%H%M%S)"

echo "========================================"
echo "  OpenClaw → GitHub 迁移工具"
echo "========================================"
echo ""

# 检查 git
if ! command -v git &> /dev/null; then
    print_error "请先安装 git"
    exit 1
fi

# 创建工作目录
WORK_DIR="/tmp/openclaw-github-push-$$"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

print_info "准备迁移文件..."

# 创建目录结构
mkdir -p config
mkdir -p workspaces
mkdir -p scripts

# 1. 复制主配置（清理敏感信息）
print_info "复制主配置..."
cp ~/.openclaw/openclaw.json config/openclaw.json.template

# 清理敏感信息（保留结构，替换为占位符）
if command -v python3 &> /dev/null; then
    python3 << 'PYTHON_EOF'
import json
import re

with open('config/openclaw.json.template', 'r') as f:
    content = f.read()

# 替换敏感信息
content = re.sub(r'"apiKey":\s*"[^"]*"', '"apiKey": "YOUR_API_KEY_HERE"', content)
content = re.sub(r'"appSecret":\s*"[^"]*"', '"appSecret": "YOUR_APP_SECRET_HERE"', content)
content = re.sub(r'"token":\s*"[^"]*"', '"token": "YOUR_TOKEN_HERE"', content)

with open('config/openclaw.json.template', 'w') as f:
    f.write(content)

print("已清理敏感信息")
PYTHON_EOF
else
    print_warning "未安装 python3，敏感信息未自动清理，请手动检查"
fi

# 2. 复制所有 Workspace（只复制配置，不复制缓存）
print_info "复制 Workspaces..."
for ws in workspace-boss workspace-coder workspace-finance workspace-news workspace-office workspace-planner workspace-reader workspace-writer; do
    if [ -d ~/.openclaw/$ws ]; then
        mkdir -p "workspaces/$ws"
        # 只复制配置文件
        cp ~/.openclaw/$ws/IDENTITY.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/SOUL.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/AGENTS.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/USER.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/TOOLS.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/HEARTBEAT.md "workspaces/$ws/" 2>/dev/null || true
        cp ~/.openclaw/$ws/MEMORY.md "workspaces/$ws/" 2>/dev/null || true
        
        # 复制 memory 目录
        if [ -d ~/.openclaw/$ws/memory ]; then
            cp -r ~/.openclaw/$ws/memory "workspaces/$ws/" 2>/dev/null || true
        fi
        
        # 复制 skills（不包含缓存）
        if [ -d ~/.openclaw/$ws/skills ]; then
            mkdir -p "workspaces/$ws/skills"
            for skill in ~/.openclaw/$ws/skills/*; do
                if [ -d "$skill" ]; then
                    skill_name=$(basename "$skill")
                    mkdir -p "workspaces/$ws/skills/$skill_name"
                    cp "$skill"/SKILL.md "workspaces/$ws/skills/$skill_name/" 2>/dev/null || true
                    cp "$skill"/_meta.json "workspaces/$ws/skills/$skill_name/" 2>/dev/null || true
                    # 复制 scripts 但不复制缓存文件
                    if [ -d "$skill/scripts" ]; then
                        cp -r "$skill/scripts" "workspaces/$ws/skills/$skill_name/" 2>/dev/null || true
                    fi
                fi
            done
        fi
        
        print_success "$ws"
    fi
done

# 3. 创建恢复脚本
cat > scripts/restore-from-github.sh << 'RESTORE_SCRIPT'
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
RESTORE_SCRIPT

chmod +x scripts/restore-from-github.sh

# 4. 创建 README
cat > README.md << 'README_EOF'
# OpenClaw 配置备份

此仓库包含完整的 OpenClaw 配置备份。

## 文件结构

```
.
├── config/
│   └── openclaw.json.template    # 主配置文件（敏感信息已清理）
├── workspaces/                    # 8个 Agent 配置
│   ├── workspace-boss/           # 管家
│   ├── workspace-coder/          # 代码搭子
│   ├── workspace-finance/        # 理财搭子
│   ├── workspace-news/           # 新闻搭子
│   ├── workspace-office/         # 办公搭子
│   ├── workspace-planner/        # 方案搭子
│   ├── workspace-reader/         # 读书搭子
│   └── workspace-writer/         # 公众号搭子
└── scripts/
    └── restore-from-github.sh    # 一键恢复脚本
```

## 快速开始

### 全新环境部署

```bash
# 1. 克隆仓库
git clone https://github.com/neverlanding/openclaw-workspace.git
cd openclaw-workspace

# 2. 运行恢复脚本
chmod +x scripts/restore-from-github.sh
./scripts/restore-from-github.sh

# 3. 配置 API Keys
nano ~/.openclaw/openclaw.json

# 4. 启动
openclaw gateway start
```

## 需要配置的敏感信息

部署后必须填入你自己的：

- **API Keys**: Qwen、Kimi、Moonshot 等
- **Feishu**: appId、appSecret
- **Gateway Token**: 建议重新生成

## 更新备份

在原环境运行：

```bash
cd ~/.openclaw/workspace
./push-to-github.sh
```
README_EOF

# 5. 创建一键推送脚本
cat > push-to-github.sh << 'PUSH_SCRIPT'
#!/bin/bash
# 一键推送到 GitHub

echo "推送到 GitHub..."

# 检查仓库是否存在
if [ -d ".git" ]; then
    git add -A
    git commit -m "Update config: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
else
    git init
    git add -A
    git commit -m "Initial config backup: $(date '+%Y-%m-%d %H:%M:%S')"
    git branch -M main
    git remote add origin https://github.com/neverlanding/openclaw-workspace.git
    git push -u origin main
fi

echo "✓ 推送完成"
PUSH_SCRIPT

chmod +x push-to-github.sh

# 显示摘要
echo ""
echo "========================================"
print_success "迁移文件准备完成!"
echo "========================================"
echo ""
echo "文件位置: $WORK_DIR"
echo ""
echo "目录结构:"
tree -L 2 . 2>/dev/null || find . -maxdepth 2 -type d | sort

echo ""
print_info "下一步操作:"
echo ""
echo "1. 进入工作目录:"
echo "   cd $WORK_DIR"
echo ""
echo "2. 推送到 GitHub:"
echo "   ./push-to-github.sh"
echo ""
echo "或者手动推送:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Update config'"
echo "   git remote add origin $REPO_URL"
echo "   git push -u origin main"
echo ""

# 询问是否立即推送
read -p "是否立即推送到 GitHub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "推送到 GitHub..."
    
    cd "$WORK_DIR"
    
    if [ -d ".git" ]; then
        git add -A
        git commit -m "Update config: $(date '+%Y-%m-%d %H:%M:%S')" || true
        git push origin main || {
            print_error "推送失败，请检查:"
            echo "1. 是否有写入权限"
            echo "2. 是否需要登录: gh auth login"
            echo "3. 或者手动推送上面的命令"
        }
    else
        git init
        git add -A
        git commit -m "Initial config backup: $(date '+%Y-%m-%d %H:%M:%S')"
        git branch -M main
        git remote add origin "$REPO_URL"
        git push -u origin main || {
            print_error "推送失败"
            echo "请检查 GitHub 仓库权限"
        }
    fi
else
    print_info "文件保留在: $WORK_DIR"
    echo "你可以稍后手动推送"
fi
