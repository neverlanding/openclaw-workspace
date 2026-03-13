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
