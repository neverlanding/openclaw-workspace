# OpenClaw 8-Agent 团队 - GitHub 配置管理方案

## 🏗️ 仓库结构设计

```
openclaw-config/
├── .github/
│   ├── workflows/
│   │   ├── deploy-dev.yml      # 开发环境部署
│   │   ├── deploy-prod.yml     # 生产环境部署
│   │   └── validate.yml        # PR验证
│   └── scripts/
│       ├── sanitize-config.py   # 配置脱敏脚本
│       └── inject-secrets.py    # 密钥注入脚本
├── configs/
│   ├── openclaw.template.json   # 脱敏配置模板
│   └── agents/                  # Agent配置
│       ├── boss/
│       ├── planner/
│       ├── office/
│       ├── writer/
│       ├── news/
│       ├── reader/
│       ├── finance/
│       └── coder/
├── skills/
│   ├── local/                   # 本地技能
│   └── agents/                  # Agents技能
├── extensions/
│   ├── feishu/
│   └── wecom-app/
├── workspaces/                  # 工作空间模板
├── scripts/
│   ├── install.sh               # 安装脚本
│   └── backup.sh                # 备份脚本
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── entrypoint.sh
├── .env.example                 # 环境变量示例
├── .gitignore                   # 忽略敏感文件
└── README.md                    # 使用文档
```

---

## 🔐 GitHub Secrets 配置

在仓库 Settings → Secrets and variables → Actions 中添加：

### 飞书机器人配置 (8个)

| Secret Name | 说明 |
|:---|:---|
| `FEISHU_MAIN_APPSECRET` | 搭子总管机器人 AppSecret |
| `FEISHU_PLANNER_APPSECRET` | 方案搭子机器人 AppSecret |
| `FEISHU_OFFICE_APPSECRET` | 办公搭子机器人 AppSecret |
| `FEISHU_WRITER_APPSECRET` | 公众号搭子机器人 AppSecret |
| `FEISHU_NEWS_APPSECRET` | 新闻搭子机器人 AppSecret |
| `FEISHU_READER_APPSECRET` | 读书搭子机器人 AppSecret |
| `FEISHU_FINANCE_APPSECRET` | 理财搭子机器人 AppSecret |
| `FEISHU_CODER_APPSECRET` | 代码搭子机器人 AppSecret |

### 其他配置

| Secret Name | 说明 |
|:---|:---|
| `OPENCLAW_GATEWAY_TOKEN` | Gateway 访问令牌 |
| `KIMI_CODING_API_KEY` | Kimi Coding API Key |
| `MOONSHOT_API_KEY` | Moonshot API Key |
| `NANO_BANANA_API_KEY` | Gemini API Key (图片生成) |

### 部署服务器配置

| Secret Name | 说明 |
|:---|:---|
| `DEPLOY_HOST` | 部署服务器 IP/域名 |
| `DEPLOY_USER` | SSH 用户名 |
| `DEPLOY_KEY` | SSH 私钥 |
| `DEPLOY_PORT` | SSH 端口 (默认22) |

---

## 📋 核心配置文件

### 1. 脱敏配置模板 (configs/openclaw.template.json)

```json
{
  "meta": {
    "lastTouchedVersion": "2026.3.2",
    "lastTouchedAt": "{{TIMESTAMP}}"
  },
  "browser": {
    "enabled": true
  },
  "auth": {
    "profiles": {
      "qwen-portal:default": {
        "provider": "qwen-portal",
        "mode": "oauth"
      },
      "kimi-coding:default": {
        "provider": "kimi-coding",
        "mode": "api_key"
      },
      "moonshot:default": {
        "provider": "moonshot",
        "mode": "api_key"
      }
    }
  },
  "models": {
    "mode": "merge",
    "providers": {
      "kimi-coding": {
        "baseUrl": "https://api.kimi.com/coding/",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "k2p5",
            "name": "Kimi for Coding",
            "reasoning": true,
            "input": ["text", "image"],
            "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
            "contextWindow": 262144,
            "maxTokens": 32768
          }
        ]
      },
      "moonshot": {
        "baseUrl": "https://api.moonshot.cn/v1",
        "api": "openai-completions",
        "models": [
          {
            "id": "kimi-k2.5",
            "name": "Kimi K2.5",
            "reasoning": false,
            "input": ["text", "image"],
            "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
            "contextWindow": 256000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "kimi-coding/k2p5",
        "fallbacks": ["moonshot/kimi-k2.5"]
      },
      "workspace": "/root/.openclaw/workspace",
      "maxConcurrent": 4
    },
    "list": [
      {"id": "boss", "default": true, "workspace": "/root/.openclaw/workspace-boss", "agentDir": "/root/.openclaw/agents/boss/agent"},
      {"id": "planner", "workspace": "/root/.openclaw/workspace-planner", "agentDir": "/root/.openclaw/agents/planner/agent"},
      {"id": "office", "workspace": "/root/.openclaw/workspace-office", "agentDir": "/root/.openclaw/agents/office/agent"},
      {"id": "writer", "workspace": "/root/.openclaw/workspace-writer", "agentDir": "/root/.openclaw/agents/writer/agent"},
      {"id": "news", "workspace": "/root/.openclaw/workspace-news", "agentDir": "/root/.openclaw/agents/news/agent"},
      {"id": "reader", "workspace": "/root/.openclaw/workspace-reader", "agentDir": "/root/.openclaw/agents/reader/agent"},
      {"id": "finance", "workspace": "/root/.openclaw/workspace-finance", "agentDir": "/root/.openclaw/agents/finance/agent"},
      {"id": "coder", "workspace": "/root/.openclaw/workspace-coder", "agentDir": "/root/.openclaw/agents/coder/agent"}
    ]
  },
  "tools": {
    "web": {"search": {"enabled": true, "provider": "brave"}, "fetch": {"enabled": true}},
    "sessions": {"visibility": "all"},
    "agentToAgent": {"enabled": true}
  },
  "bindings": [
    {"agentId": "boss", "match": {"channel": "feishu", "accountId": "main"}},
    {"agentId": "planner", "match": {"channel": "feishu", "accountId": "1"}},
    {"agentId": "office", "match": {"channel": "feishu", "accountId": "2"}},
    {"agentId": "writer", "match": {"channel": "feishu", "accountId": "3"}},
    {"agentId": "news", "match": {"channel": "feishu", "accountId": "4"}},
    {"agentId": "reader", "match": {"channel": "feishu", "accountId": "5"}},
    {"agentId": "finance", "match": {"channel": "feishu", "accountId": "6"}},
    {"agentId": "coder", "match": {"channel": "feishu", "accountId": "7"}}
  ],
  "channels": {
    "feishu": {
      "connectionMode": "websocket",
      "enabled": true,
      "accounts": [
        {"accountId": "main", "appId": "cli_a90ed7d1f6389cd9", "appSecret": "{{FEISHU_MAIN_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "1", "appId": "cli_a92bd5e6d339dcd2", "appSecret": "{{FEISHU_PLANNER_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "2", "appId": "cli_a92ce59b76fb9cc2", "appSecret": "{{FEISHU_OFFICE_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "3", "appId": "cli_a92cc78ef8b89ccd", "appSecret": "{{FEISHU_WRITER_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "4", "appId": "cli_a92ce03f79b85cee", "appSecret": "{{FEISHU_NEWS_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "5", "appId": "cli_a92ce21baa3a9cb5", "appSecret": "{{FEISHU_READER_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "6", "appId": "cli_a92ce269bd789cc6", "appSecret": "{{FEISHU_FINANCE_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]},
        {"accountId": "7", "appId": "cli_a92ce2c190769cb3", "appSecret": "{{FEISHU_CODER_APPSECRET}}", "allowFrom": ["{{ALLOWED_USER}}"]}
      ]
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan",
    "auth": {"mode": "token", "token": "{{OPENCLAW_GATEWAY_TOKEN}}"},
    "controlUi": {"allowedOrigins": ["http://localhost:18789"]}
  },
  "skills": {
    "entries": {
      "nano-banana-pro": {
        "enabled": true,
        "apiKey": "{{NANO_BANANA_API_KEY}}",
        "env": {"GEMINI_API_KEY": "{{NANO_BANANA_API_KEY}}"}
      }
    }
  },
  "plugins": {
    "allow": ["feishu", "wecom-app"],
    "entries": {
      "feishu": {"enabled": true},
      "wecom-app": {"enabled": true}
    }
  }
}
```

### 2. GitHub Actions 工作流

#### PR验证 (.github/workflows/validate.yml)

```yaml
name: Validate Config

on:
  pull_request:
    branches: [main, dev]
  push:
    branches: [dev]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install OpenClaw
        run: npm install -g openclaw

      - name: Inject test secrets
        run: |
          python3 .github/scripts/inject-secrets.py \
            configs/openclaw.template.json \
            test-config.json \
            --test-mode

      - name: Validate config
        run: |
          mkdir -p ~/.openclaw
          cp test-config.json ~/.openclaw/openclaw.json
          openclaw config validate

      - name: Check agents structure
        run: |
          for agent in boss planner office writer news reader finance coder; do
            if [ ! -d "configs/agents/$agent" ]; then
              echo "❌ Missing agent: $agent"
              exit 1
            fi
            echo "✅ Agent $agent OK"
          done

      - name: Lint JSON files
        run: |
          find configs -name "*.json" -exec python3 -c "import json; json.load(open('{}'))" \;
```

#### 生产部署 (.github/workflows/deploy-prod.yml)

```yaml
name: Deploy to Production

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

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.DEPLOY_KEY }}

      - name: Add host to known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -p ${{ secrets.DEPLOY_PORT || 22 }} ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts

      - name: Inject secrets to config
        run: |
          python3 .github/scripts/inject-secrets.py \
            configs/openclaw.template.json \
            openclaw.json \
            --env-file <(cat << 'EOF'
          FEISHU_MAIN_APPSECRET=${{ secrets.FEISHU_MAIN_APPSECRET }}
          FEISHU_PLANNER_APPSECRET=${{ secrets.FEISHU_PLANNER_APPSECRET }}
          FEISHU_OFFICE_APPSECRET=${{ secrets.FEISHU_OFFICE_APPSECRET }}
          FEISHU_WRITER_APPSECRET=${{ secrets.FEISHU_WRITER_APPSECRET }}
          FEISHU_NEWS_APPSECRET=${{ secrets.FEISHU_NEWS_APPSECRET }}
          FEISHU_READER_APPSECRET=${{ secrets.FEISHU_READER_APPSECRET }}
          FEISHU_FINANCE_APPSECRET=${{ secrets.FEISHU_FINANCE_APPSECRET }}
          FEISHU_CODER_APPSECRET=${{ secrets.FEISHU_CODER_APPSECRET }}
          OPENCLAW_GATEWAY_TOKEN=${{ secrets.OPENCLAW_GATEWAY_TOKEN }}
          KIMI_CODING_API_KEY=${{ secrets.KIMI_CODING_API_KEY }}
          MOONSHOT_API_KEY=${{ secrets.MOONSHOT_API_KEY }}
          NANO_BANANA_API_KEY=${{ secrets.NANO_BANANA_API_KEY }}
          ALLOWED_USER=${{ secrets.ALLOWED_USER }}
          EOF
          )

      - name: Deploy to server
        run: |
          DEPLOY_HOST="${{ secrets.DEPLOY_HOST }}"
          DEPLOY_USER="${{ secrets.DEPLOY_USER }}"
          DEPLOY_PORT="${{ secrets.DEPLOY_PORT || 22 }}"
          
          # 创建临时部署目录
          ssh -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_HOST "mkdir -p /tmp/openclaw-deploy"
          
          # 复制配置文件
          scp -P $DEPLOY_PORT openclaw.json $DEPLOY_USER@$DEPLOY_HOST:/tmp/openclaw-deploy/
          
          # 复制 Agents 配置
          scp -P $DEPLOY_PORT -r configs/agents $DEPLOY_USER@$DEPLOY_HOST:/tmp/openclaw-deploy/
          
          # 复制技能
          scp -P $DEPLOY_PORT -r skills $DEPLOY_USER@$DEPLOY_HOST:/tmp/openclaw-deploy/
          
          # 复制扩展
          scp -P $DEPLOY_PORT -r extensions $DEPLOY_USER@$DEPLOY_HOST:/tmp/openclaw-deploy/
          
          # 复制工作空间
          scp -P $DEPLOY_PORT -r workspaces $DEPLOY_USER@$DEPLOY_HOST:/tmp/openclaw-deploy/

      - name: Install and restart
        run: |
          DEPLOY_HOST="${{ secrets.DEPLOY_HOST }}"
          DEPLOY_USER="${{ secrets.DEPLOY_USER }}"
          DEPLOY_PORT="${{ secrets.DEPLOY_PORT || 22 }}"
          
          ssh -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_HOST << 'REMOTE_SCRIPT'
            # 备份现有配置
            if [ -d ~/.openclaw ]; then
              BACKUP_DIR="~/.openclaw/backups/$(date +%Y%m%d_%H%M%S)"
              mkdir -p "$BACKUP_DIR"
              cp ~/.openclaw/openclaw.json "$BACKUP_DIR/" 2>/dev/null || true
              cp -r ~/.openclaw/agents "$BACKUP_DIR/" 2>/dev/null || true
            fi
            
            # 复制新配置
            mkdir -p ~/.openclaw
            cp /tmp/openclaw-deploy/openclaw.json ~/.openclaw/
            cp -r /tmp/openclaw-deploy/agents ~/.openclaw/
            cp -r /tmp/openclaw-deploy/skills/* ~/.openclaw/skills/ 2>/dev/null || true
            cp -r /tmp/openclaw-deploy/skills/* ~/.agents/skills/ 2>/dev/null || true
            cp -r /tmp/openclaw-deploy/extensions/* ~/.openclaw/extensions/ 2>/dev/null || true
            
            # 安装扩展依赖
            for ext in ~/.openclaw/extensions/*/; do
              if [ -f "$ext/package.json" ]; then
                (cd "$ext" && npm install) || true
              fi
            done
            
            # 安装 OpenClaw (如未安装)
            if ! command -v openclaw &> /dev/null; then
              npm install -g openclaw
            fi
            
            # 重启服务
            openclaw gateway restart
            
            # 清理临时文件
            rm -rf /tmp/openclaw-deploy
          REMOTE_SCRIPT

      - name: Verify deployment
        run: |
          sleep 5
          curl -f http://${{ secrets.DEPLOY_HOST }}:18789/status || exit 1
          echo "✅ Deployment successful!"
```

### 3. 密钥注入脚本 (.github/scripts/inject-secrets.py)

```python
#!/usr/bin/env python3
"""
将环境变量注入到 OpenClaw 配置模板中
"""
import json
import sys
import os
import argparse
from datetime import datetime

def inject_secrets(template_path, output_path, env_vars=None, test_mode=False):
    """将密钥注入配置模板"""
    
    with open(template_path, 'r') as f:
        config_str = f.read()
    
    # 替换变量
    replacements = {
        '{{TIMESTAMP}}': datetime.utcnow().isoformat(),
        '{{FEISHU_MAIN_APPSECRET}}': env_vars.get('FEISHU_MAIN_APPSECRET', 'test-secret'),
        '{{FEISHU_PLANNER_APPSECRET}}': env_vars.get('FEISHU_PLANNER_APPSECRET', 'test-secret'),
        '{{FEISHU_OFFICE_APPSECRET}}': env_vars.get('FEISHU_OFFICE_APPSECRET', 'test-secret'),
        '{{FEISHU_WRITER_APPSECRET}}': env_vars.get('FEISHU_WRITER_APPSECRET', 'test-secret'),
        '{{FEISHU_NEWS_APPSECRET}}': env_vars.get('FEISHU_NEWS_APPSECRET', 'test-secret'),
        '{{FEISHU_READER_APPSECRET}}': env_vars.get('FEISHU_READER_APPSECRET', 'test-secret'),
        '{{FEISHU_FINANCE_APPSECRET}}': env_vars.get('FEISHU_FINANCE_APPSECRET', 'test-secret'),
        '{{FEISHU_CODER_APPSECRET}}': env_vars.get('FEISHU_CODER_APPSECRET', 'test-secret'),
        '{{OPENCLAW_GATEWAY_TOKEN}}': env_vars.get('OPENCLAW_GATEWAY_TOKEN', 'test-token'),
        '{{KIMI_CODING_API_KEY}}': env_vars.get('KIMI_CODING_API_KEY', ''),
        '{{MOONSHOT_API_KEY}}': env_vars.get('MOONSHOT_API_KEY', ''),
        '{{NANO_BANANA_API_KEY}}': env_vars.get('NANO_BANANA_API_KEY', ''),
        '{{ALLOWED_USER}}': env_vars.get('ALLOWED_USER', '*'),
    }
    
    for key, value in replacements.items():
        config_str = config_str.replace(key, value)
    
    # 验证JSON
    config = json.loads(config_str)
    
    # 写入输出
    with open(output_path, 'w') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Config generated: {output_path}")
    return config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('template', help='Template file path')
    parser.add_argument('output', help='Output file path')
    parser.add_argument('--env-file', help='Environment file')
    parser.add_argument('--test-mode', action='store_true', help='Use test values')
    
    args = parser.parse_args()
    
    env_vars = {}
    if args.env_file:
        with open(args.env_file, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    
    # 也读取实际环境变量
    for key in os.environ:
        if key.startswith('FEISHU_') or key.startswith('OPENCLAW_') or \
           key in ['KIMI_CODING_API_KEY', 'MOONSHOT_API_KEY', 'NANO_BANANA_API_KEY', 'ALLOWED_USER']:
            env_vars[key] = os.environ[key]
    
    inject_secrets(args.template, args.output, env_vars, args.test_mode)
```

---

## 🚀 使用流程

### 1. 初始化仓库

```bash
# 1. 创建GitHub仓库
git clone https://github.com/yourusername/openclaw-config.git
cd openclaw-config

# 2. 复制配置文件（从原环境）
mkdir -p configs/agents skills extensions workspaces

# 3. 复制Agents配置
for agent in boss planner office writer news reader finance coder; do
    cp -r ~/.openclaw/agents/$agent configs/agents/
done

# 4. 复制技能
cp -r ~/.openclaw/skills/* skills/local/ 2>/dev/null || true
cp -r ~/.agents/skills/* skills/agents/ 2>/dev/null || true

# 5. 复制扩展配置（不含node_modules）
for ext in feishu wecom-app; do
    mkdir -p extensions/$ext
    find ~/.openclaw/extensions/$ext -maxdepth 2 -type f ! -path "*/node_modules/*" -exec cp {} extensions/$ext/ \;
done

# 6. 提交到Git
git add .
git commit -m "Initial 8-agent config"
git push
```

### 2. 配置GitHub Secrets

在仓库 Settings → Secrets → Actions 中添加所有密钥（见上文列表）。

### 3. 自动部署

```bash
# 修改配置后推送到main分支
git add .
git commit -m "Update agent configs"
git push origin main

# GitHub Actions自动部署到生产环境
```

---

## 🔄 多环境管理

### 分支策略

| 分支 | 用途 | 部署目标 |
|:---|:---|:---|
| `main` | 生产环境 | 生产服务器 |
| `dev` | 开发测试 | 测试服务器 |
| `feature/*` | 功能开发 | 不自动部署 |

### 环境特定配置

```
configs/
├── openclaw.template.json    # 基础模板
├── prod.overrides.json       # 生产环境覆盖
└── dev.overrides.json        # 开发环境覆盖
```

在注入脚本中合并覆盖配置：

```python
# 合并环境特定配置
if environment == 'prod':
    with open('configs/prod.overrides.json') as f:
        overrides = json.load(f)
    config = merge_configs(config, overrides)
```

---

## 📊 部署状态监控

### 添加健康检查

```yaml
- name: Health check
  run: |
    for i in {1..10}; do
      if curl -f http://${{ secrets.DEPLOY_HOST }}:18789/status; then
        echo "✅ Service is healthy"
        exit 0
      fi
      echo "Waiting for service... ($i/10)"
      sleep 3
    done
    echo "❌ Health check failed"
    exit 1
```

### Slack通知

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "OpenClaw 8-Agent deployed successfully!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "🚀 *OpenClaw 8-Agent* deployed to production\n*Commit:* ${{ github.sha }}\n*Time:* $(date)"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

这套方案的优势：
1. ✅ 配置版本控制
2. ✅ 敏感信息安全存储
3. ✅ 自动化部署
4. ✅ PR验证防止错误配置
5. ✅ 多环境支持

需要我帮你初始化这个GitHub仓库吗？
