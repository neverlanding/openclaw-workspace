# OpenClaw 8-Agent 团队 Docker 部署方案

## 方案概述

使用 Docker 部署完整的 OpenClaw 8-Agent 团队，支持一键启动。

## 目录结构

```
docker-deploy/
├── docker-compose.yml      # Docker Compose 配置
├── Dockerfile              # OpenClaw 镜像构建
├── entrypoint.sh           # 容器启动脚本
├── config/                 # 配置文件目录
│   └── openclaw.json       # 主配置（脱敏模板）
├── agents/                 # Agent 配置
│   ├── boss/
│   ├── planner/
│   ├── office/
│   ├── writer/
│   ├── news/
│   ├── reader/
│   ├── finance/
│   └── coder/
├── skills/                 # 自定义技能
│   ├── local/
│   └── agents/
├── extensions/             # 扩展插件
└── workspaces/             # 工作空间
```

## Docker Compose 配置

```yaml
version: '3.8'

services:
  openclaw:
    build: .
    container_name: openclaw-8agent-team
    restart: unless-stopped
    ports:
      - "18789:18789"  # Gateway 端口
    environment:
      # 飞书机器人 AppSecret (8个)
      - FEISHU_MAIN_APPSECRET=${FEISHU_MAIN_APPSECRET}
      - FEISHU_PLANNER_APPSECRET=${FEISHU_PLANNER_APPSECRET}
      - FEISHU_OFFICE_APPSECRET=${FEISHU_OFFICE_APPSECRET}
      - FEISHU_WRITER_APPSECRET=${FEISHU_WRITER_APPSECRET}
      - FEISHU_NEWS_APPSECRET=${FEISHU_NEWS_APPSECRET}
      - FEISHU_READER_APPSECRET=${FEISHU_READER_APPSECRET}
      - FEISHU_FINANCE_APPSECRET=${FEISHU_FINANCE_APPSECRET}
      - FEISHU_CODER_APPSECRET=${FEISHU_CODER_APPSECRET}
      
      # Gateway Token
      - OPENCLAW_GATEWAY_TOKEN=${OPENCLAW_GATEWAY_TOKEN}
      
      # 模型 API Key (可选)
      - KIMI_CODING_API_KEY=${KIMI_CODING_API_KEY:-}
      - MOONSHOT_API_KEY=${MOONSHOT_API_KEY:-}
      
      # 技能 API Key (可选)
      - NANO_BANANA_API_KEY=${NANO_BANANA_API_KEY:-}
    volumes:
      # 持久化数据
      - openclaw-data:/root/.openclaw
      - ./config/openclaw.json:/config/openclaw-template.json:ro
      - ./agents:/config/agents:ro
      - ./skills:/config/skills:ro
      - ./extensions:/config/extensions:ro
      - ./workspaces:/config/workspaces:ro
    networks:
      - openclaw-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/status"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

networks:
  openclaw-network:
    driver: bridge

volumes:
  openclaw-data:
```

## Dockerfile

```dockerfile
FROM node:22-slim

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# 安装 OpenClaw
RUN npm install -g openclaw

# 创建工作目录
WORKDIR /app

# 复制注入脚本
COPY inject-env-to-config.sh /app/
RUN chmod +x /app/inject-env-to-config.sh

# 复制启动脚本
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

# 暴露端口
EXPOSE 18789

# 启动命令
ENTRYPOINT ["/app/entrypoint.sh"]
```

## Entrypoint 脚本

```bash
#!/bin/bash
set -e

echo "🚀 启动 OpenClaw 8-Agent 团队..."

# 创建必要的目录
mkdir -p /root/.openclaw/{agents,skills,extensions}
mkdir -p /root/.agents/skills

# 如果配置文件不存在，从模板复制
if [ ! -f /root/.openclaw/openclaw.json ]; then
    echo "📄 初始化配置文件..."
    cp /config/openclaw-template.json /root/.openclaw/openclaw.json
fi

# 复制 Agent 配置
if [ -d /config/agents ]; then
    echo "🤖 复制 Agent 配置..."
    cp -r /config/agents/* /root/.openclaw/agents/
fi

# 复制技能
if [ -d /config/skills/local ]; then
    echo "🛠️ 复制本地技能..."
    cp -r /config/skills/local/* /root/.openclaw/skills/ 2>/dev/null || true
fi
if [ -d /config/skills/agents ]; then
    echo "🛠️ 复制 Agents 技能..."
    mkdir -p /root/.agents/skills
    cp -r /config/skills/agents/* /root/.agents/skills/ 2>/dev/null || true
fi

# 复制扩展
if [ -d /config/extensions ]; then
    echo "🔌 复制扩展插件..."
    cp -r /config/extensions/* /root/.openclaw/extensions/
    # 安装依赖
    for ext in /root/.openclaw/extensions/*/; do
        if [ -f "$ext/package.json" ]; then
            echo "   📦 安装 $(basename $ext) 依赖..."
            (cd "$ext" && npm install) || true
        fi
    done
fi

# 复制工作空间
if [ -d /config/workspaces ]; then
    echo "💼 复制工作空间..."
    for ws in /config/workspaces/*/; do
        ws_name=$(basename "$ws")
        cp -r "$ws" "/root/.openclaw/workspace-${ws_name#workspace-}"
    done
fi

# 注入环境变量
echo "🔧 注入环境变量..."
/app/inject-env-to-config.sh /root/.openclaw/openclaw.json

# 验证配置
echo "🔍 验证配置..."
openclaw config validate || {
    echo "❌ 配置验证失败"
    exit 1
}

# 启动 Gateway
echo "✅ 启动 Gateway..."
exec openclaw gateway start --foreground
```

## 环境变量文件 (.env)

```bash
# 飞书机器人 AppSecret (从飞书开发者后台获取)
FEISHU_MAIN_APPSECRET=your_main_app_secret_here
FEISHU_PLANNER_APPSECRET=your_planner_app_secret_here
FEISHU_OFFICE_APPSECRET=your_office_app_secret_here
FEISHU_WRITER_APPSECRET=your_writer_app_secret_here
FEISHU_NEWS_APPSECRET=your_news_app_secret_here
FEISHU_READER_APPSECRET=your_reader_app_secret_here
FEISHU_FINANCE_APPSECRET=your_finance_app_secret_here
FEISHU_CODER_APPSECRET=your_coder_app_secret_here

# Gateway Token (随机生成一个强密码)
OPENCLAW_GATEWAY_TOKEN=your_random_token_here

# 模型 API Key (可选)
KIMI_CODING_API_KEY=your_kimi_api_key
MOONSHOT_API_KEY=your_moonshot_api_key

# 技能 API Key (可选)
NANO_BANANA_API_KEY=your_gemini_api_key
```

## 使用方法

### 1. 准备配置

从原环境导出配置:
```bash
./export-openclaw-config.sh ./docker-deploy/config
```

### 2. 配置环境变量

```bash
cd docker-deploy
cp .env.example .env
nano .env  # 填写所有 API Key
```

### 3. 启动服务

```bash
docker-compose up -d
```

### 4. 查看日志

```bash
docker-compose logs -f openclaw
```

### 5. 停止服务

```bash
docker-compose down
```

## Kubernetes 部署 (可选)

如果需要 K8s 部署，可以使用以下资源:

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw-8agent
spec:
  replicas: 1
  selector:
    matchLabels:
      app: openclaw
  template:
    metadata:
      labels:
        app: openclaw
    spec:
      containers:
      - name: openclaw
        image: openclaw:8agent-latest
        ports:
        - containerPort: 18789
        envFrom:
        - secretRef:
            name: openclaw-secrets
        volumeMounts:
        - name: config
          mountPath: /config
          readOnly: true
      volumes:
      - name: config
        configMap:
          name: openclaw-config
```

```yaml
# secrets.yaml (使用 kubectl create secret 生成)
# kubectl create secret generic openclaw-secrets --from-env-file=.env
```

## 注意事项

1. **安全性**: 
   - 不要将 `.env` 文件提交到 Git
   - 使用 Docker Secrets 或 K8s Secrets 管理敏感信息
   - 定期轮换 API Key

2. **持久化**:
   - 生产环境建议使用外部卷存储数据
   - 定期备份 `/root/.openclaw` 目录

3. **网络**:
   - 确保容器能访问飞书服务器
   - 如需外网访问，配置反向代理 (nginx/traefik)
