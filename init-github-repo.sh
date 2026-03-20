#!/bin/bash
# OpenClaw 8-Agent GitHub 配置仓库初始化脚本
# 用法: ./init-github-repo.sh <github-repo-url>

set -e

REPO_URL="${1:-}"
if [ -z "$REPO_URL" ]; then
    echo "❌ 请提供GitHub仓库URL"
    echo "用法: $0 https://github.com/username/openclaw-config.git"
    exit 1
fi

echo "🚀 初始化 OpenClaw 8-Agent GitHub 配置仓库"
echo "============================================"
echo "目标仓库: $REPO_URL"
echo ""

# 创建临时目录
WORK_DIR=$(mktemp -d)
echo "📁 工作目录: $WORK_DIR"

cd "$WORK_DIR"

# 1. 克隆仓库
echo ""
echo "📦 步骤 1/8: 克隆仓库..."
git clone "$REPO_URL" repo 2>/dev/null || {
    echo "⚠️  仓库为空或不存在，创建新目录"
    mkdir -p repo
}
cd repo

# 2. 创建目录结构
echo ""
echo "📂 步骤 2/8: 创建目录结构..."
mkdir -p .github/workflows
mkdir -p .github/scripts
mkdir -p configs/agents
mkdir -p skills/{local,agents}
mkdir -p extensions/{feishu,wecom-app}
mkdir -p workspaces
mkdir -p docker
mkdir -p scripts

# 3. 复制Agent配置
echo ""
echo "🤖 步骤 3/8: 复制 Agent 配置..."
for agent in boss planner office writer news reader finance coder; do
    if [ -d "$HOME/.openclaw/agents/$agent" ]; then
        cp -r "$HOME/.openclaw/agents/$agent" configs/agents/
        echo "  ✅ $agent"
    else
        echo "  ⚠️  $agent (未找到)"
    fi
done

# 4. 复制技能
echo ""
echo "🛠️ 步骤 4/8: 复制技能..."
if [ -d "$HOME/.openclaw/skills" ]; then
    cp -r "$HOME/.openclaw/skills/"* skills/local/ 2>/dev/null || true
    echo "  ✅ 本地技能"
fi
if [ -d "$HOME/.agents/skills" ]; then
    cp -r "$HOME/.agents/skills/"* skills/agents/ 2>/dev/null || true
    echo "  ✅ Agents技能"
fi

# 5. 复制扩展配置
echo ""
echo "🔌 步骤 5/8: 复制扩展配置..."
for ext in feishu wecom-app; do
    if [ -d "$HOME/.openclaw/extensions/$ext" ]; then
        # 只复制非node_modules文件
        find "$HOME/.openclaw/extensions/$ext" -maxdepth 2 -type f ! -path "*/node_modules/*" -exec cp {} extensions/$ext/ \; 2>/dev/null || true
        echo "  ✅ $ext"
    fi
done

# 6. 复制主配置并脱敏
echo ""
echo "📄 步骤 6/8: 处理主配置..."
if [ -f "$HOME/.openclaw/openclaw.json" ]; then
    python3 << PYTHON_SCRIPT
import json
import re

with open('$HOME/.openclaw/openclaw.json', 'r') as f:
    config = json.load(f)

# 脱敏处理
def sanitize_config(obj):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, str):
                # 脱敏敏感字段
                if any(s in key.lower() for s in ['secret', 'apikey', 'token', 'key']):
                    if key != 'appId' and len(value) > 10:
                        obj[key] = f'{{{{{key.upper()}}}}}'
            elif isinstance(value, (dict, list)):
                sanitize_config(value)
    elif isinstance(obj, list):
        for item in obj:
            sanitize_config(item)

sanitize_config(config)

# 保存为模板
with open('configs/openclaw.template.json', 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("  ✅ 主配置已脱敏")
PYTHON_SCRIPT
else
    echo "  ⚠️  未找到主配置"
fi

# 7. 创建GitHub Actions工作流
echo ""
echo "⚙️ 步骤 7/8: 创建工作流文件..."

cat > .github/workflows/deploy.yml <> 'EOF'
name: Deploy OpenClaw 8-Agent

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Inject secrets
        run: |
          python3 .github/scripts/inject-secrets.py \
            configs/openclaw.template.json \
            openclaw.json
      
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.DEPLOY_KEY }}
      
      - name: Deploy to server
        run: |
          ssh -o StrictHostKeyChecking=no -p ${{ secrets.DEPLOY_PORT || 22 }} ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} "mkdir -p /tmp/openclaw-deploy"
          scp -P ${{ secrets.DEPLOY_PORT || 22 }} openclaw.json ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/tmp/openclaw-deploy/
          scp -P ${{ secrets.DEPLOY_PORT || 22 }} -r configs/agents skills extensions ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/tmp/openclaw-deploy/
      
      - name: Install and restart
        run: |
          ssh -p ${{ secrets.DEPLOY_PORT || 22 }} ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} << 'SCRIPT'
            mkdir -p ~/.openclaw/{agents,skills,extensions}
            mkdir -p ~/.agents/skills
            
            # 备份
            if [ -f ~/.openclaw/openclaw.json ]; then
              cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak.$(date +%s)
            fi
            
            # 部署新配置
            cp /tmp/openclaw-deploy/openclaw.json ~/.openclaw/
            cp -r /tmp/openclaw-deploy/configs/agents/* ~/.openclaw/agents/
            cp -r /tmp/openclaw-deploy/skills/local/* ~/.openclaw/skills/ 2>/dev/null || true
            cp -r /tmp/openclaw-deploy/skills/agents/* ~/.agents/skills/ 2>/dev/null || true
            cp -r /tmp/openclaw-deploy/extensions/* ~/.openclaw/extensions/ 2>/dev/null || true
            
            # 安装扩展依赖
            for ext in ~/.openclaw/extensions/*/; do
              [ -f "$ext/package.json" ] && (cd "$ext" && npm install) || true
            done
            
            # 重启
            command -v openclaw &>/dev/null && openclaw gateway restart || echo "请手动安装openclaw并启动"
            
            rm -rf /tmp/openclaw-deploy
          SCRIPT
      
      - name: Verify deployment
        run: |
          sleep 5
          curl -f http://${{ secrets.DEPLOY_HOST }}:18789/status && echo "✅ Deployment successful!"
EOF

cat > .github/scripts/inject-secrets.py <> 'EOF'
#!/usr/bin/env python3
import json
import os
import sys

def main():
    template_path = sys.argv[1]
    output_path = sys.argv[2]
    
    with open(template_path, 'r') as f:
        config_str = f.read()
    
    # 替换变量
    secrets_map = {
        'FEISHU_MAIN_APPSECRET': os.environ.get('FEISHU_MAIN_APPSECRET', ''),
        'FEISHU_PLANNER_APPSECRET': os.environ.get('FEISHU_PLANNER_APPSECRET', ''),
        'FEISHU_OFFICE_APPSECRET': os.environ.get('FEISHU_OFFICE_APPSECRET', ''),
        'FEISHU_WRITER_APPSECRET': os.environ.get('FEISHU_WRITER_APPSECRET', ''),
        'FEISHU_NEWS_APPSECRET': os.environ.get('FEISHU_NEWS_APPSECRET', ''),
        'FEISHU_READER_APPSECRET': os.environ.get('FEISHU_READER_APPSECRET', ''),
        'FEISHU_FINANCE_APPSECRET': os.environ.get('FEISHU_FINANCE_APPSECRET', ''),
        'FEISHU_CODER_APPSECRET': os.environ.get('FEISHU_CODER_APPSECRET', ''),
        'OPENCLAW_GATEWAY_TOKEN': os.environ.get('OPENCLAW_GATEWAY_TOKEN', ''),
        'KIMI_CODING_API_KEY': os.environ.get('KIMI_CODING_API_KEY', ''),
        'MOONSHOT_API_KEY': os.environ.get('MOONSHOT_API_KEY', ''),
        'NANO_BANANA_API_KEY': os.environ.get('NANO_BANANA_API_KEY', ''),
        'ALLOWED_USER': os.environ.get('ALLOWED_USER', '*'),
    }
    
    for key, value in secrets_map.items():
        placeholder = f'{{{{{key}}}}}'
        config_str = config_str.replace(placeholder, value)
    
    config = json.loads(config_str)
    
    with open(output_path, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f'✅ Config generated: {output_path}')

if __name__ == '__main__':
    main()
EOF

chmod +x .github/scripts/inject-secrets.py

# 8. 创建其他必要文件
echo ""
echo "📝 步骤 8/8: 创建其他文件..."

cat > .gitignore <> 'EOF'
# 敏感信息
.env
*.secret
openclaw.json

# 临时文件
*.tmp
/tmp/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
EOF

cat > .env.example <> 'EOF'
# 飞书机器人 AppSecret (8个)
FEISHU_MAIN_APPSECRET=cli_xxx_secret_xxx
FEISHU_PLANNER_APPSECRET=cli_xxx_secret_xxx
FEISHU_OFFICE_APPSECRET=cli_xxx_secret_xxx
FEISHU_WRITER_APPSECRET=cli_xxx_secret_xxx
FEISHU_NEWS_APPSECRET=cli_xxx_secret_xxx
FEISHU_READER_APPSECRET=cli_xxx_secret_xxx
FEISHU_FINANCE_APPSECRET=cli_xxx_secret_xxx
FEISHU_CODER_APPSECRET=cli_xxx_secret_xxx

# Gateway Token
OPENCLAW_GATEWAY_TOKEN=your_random_token_here

# 模型API Key (可选)
KIMI_CODING_API_KEY=sk-xxx
MOONSHOT_API_KEY=sk-xxx

# 技能API Key (可选)
NANO_BANANA_API_KEY=AIzaSyxxx

# 允许访问的用户
ALLOWED_USER=ou_xxx

# 部署配置
DEPLOY_HOST=your-server.com
DEPLOY_USER=root
DEPLOY_PORT=22
EOF

cat > README.md <> 'EOF'
# OpenClaw 8-Agent 配置仓库

这是 8-Agent 团队的配置管理仓库，包含：

- **8个Agent配置**: boss, planner, office, writer, news, reader, finance, coder
- **自定义技能**: 本地技能和Agents技能
- **扩展插件**: 飞书、企微

## 🚀 快速开始

### 1. 配置 GitHub Secrets

在仓库 Settings → Secrets → Actions 中添加：

**飞书机器人 (8个)**:
- `FEISHU_MAIN_APPSECRET` - 搭子总管
- `FEISHU_PLANNER_APPSECRET` - 方案搭子
- `FEISHU_OFFICE_APPSECRET` - 办公搭子
- `FEISHU_WRITER_APPSECRET` - 公众号搭子
- `FEISHU_NEWS_APPSECRET` - 新闻搭子
- `FEISHU_READER_APPSECRET` - 读书搭子
- `FEISHU_FINANCE_APPSECRET` - 理财搭子
- `FEISHU_CODER_APPSECRET` - 代码搭子

**其他配置**:
- `OPENCLAW_GATEWAY_TOKEN` - Gateway令牌
- `KIMI_CODING_API_KEY` - Kimi API
- `MOONSHOT_API_KEY` - Moonshot API
- `NANO_BANANA_API_KEY` - Gemini API

**部署配置**:
- `DEPLOY_HOST` - 服务器地址
- `DEPLOY_USER` - SSH用户名
- `DEPLOY_KEY` - SSH私钥

### 2. 推送配置

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

GitHub Actions 会自动部署到服务器。

### 3. 验证部署

访问: `http://your-server:18789/status`

## 📁 目录结构

```
.
├── configs/
│   ├── openclaw.template.json   # 配置模板
│   └── agents/                  # 8个Agent配置
├── skills/                      # 自定义技能
├── extensions/                  # 扩展插件
└── .github/workflows/           # 部署工作流
```

## 🔐 安全说明

- 所有敏感信息通过 GitHub Secrets 管理
- 配置文件模板已脱敏
- 部署时自动注入密钥
EOF

# 9. 提交到GitHub
echo ""
echo "📤 提交到 GitHub..."
git init 2>/dev/null || true
git add .
git commit -m "Initial OpenClaw 8-Agent config" 2>/dev/null || echo "已提交"

# 检查远程
git remote get-url origin 2>/dev/null || git remote add origin "$REPO_URL"

# 推送
git branch -M main
git push -u origin main

echo ""
echo "============================================"
echo "✅ 初始化完成!"
echo ""
echo "📋 下一步操作:"
echo ""
echo "1. 在GitHub仓库设置 Secrets:"
echo "   https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:\/]//' | sed 's/\.git$//')/settings/secrets/actions"
echo ""
echo "2. 添加以下 Secrets:"
echo "   - FEISHU_MAIN_APPSECRET ~ FEISHU_CODER_APPSECRET (8个)"
echo "   - OPENCLAW_GATEWAY_TOKEN"
echo "   - DEPLOY_HOST, DEPLOY_USER, DEPLOY_KEY"
echo ""
echo "3. 修改配置后推送到 main 分支即可自动部署"
echo ""
echo "📁 本地仓库位置: $(pwd)"
echo "============================================"

# 清理
cd "$HOME"
rm -rf "$WORK_DIR"
