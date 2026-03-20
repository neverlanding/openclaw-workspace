# OpenClaw 完整配置备份

此仓库包含完整的 OpenClaw 8-Agent 团队配置备份，支持一键恢复。

## 文件结构

```
.
├── config/
│   └── openclaw.json.template    # 主配置文件（敏感信息已清理）
├── agents/                        # 各 Agent 独立配置
│   ├── boss/                     # 搭子总管
│   ├── tech/                     # 技术搭子
│   ├── office/                   # 办公搭子
│   ├── planner/                  # 方案搭子
│   ├── reader/                   # 读书搭子
│   ├── writer/                   # 写作搭子
│   ├── info/                     # 资讯搭子
│   └── life/                     # 生活搭子
├── workspaces/                    # 所有 Workspace 配置
│   ├── workspace-boss/           # 搭子总管
│   ├── workspace-tech/           # 技术搭子
│   ├── workspace-office/         # 办公搭子
│   ├── workspace-planner/        # 方案搭子
│   ├── workspace-reader/        # 读书搭子
│   ├── workspace-writer/        # 写作搭子
│   ├── workspace-info/          # 资讯搭子
│   └── workspace-life/          # 生活搭子
├── shared-memory/                 # 公共规则和知识
├── shared-skills/                 # 共享技能
├── scripts/
│   └── restore-from-github.sh    # 一键恢复脚本
└── README.md
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

| 配置项 | 说明 |
|:---|:---|
| `apiKey` | Qwen、Kimi、Moonshot 等 API Keys |
| `appSecret` | Feishu 应用密钥 |
| `token` | Gateway Token |
| `password` | 其他服务密码 |

## 8-Agent 团队

| 序号 | 名称 | Agent ID | 职责 |
|:---:|:---|:---|:---|
| 01 | 搭子总管 | boss | 团队协调、任务分发 |
| 02 | 方案搭子 | planner | 方案设计、PPT 制作 |
| 03 | 办公搭子 | office | 日常办公、文档处理 |
| 04 | 写作搭子 | writer | 内容创作、公众号文章 |
| 05 | 新闻搭子 | news | 新闻推送、资讯汇总 |
| 06 | 读书搭子 | reader | 读书笔记、知识整理 |
| 07 | 技术搭子 | tech | 代码开发、系统运维 |
| 08 | 理财搭子 | finance | 理财分析、投资研究 |

## 更新备份

在原环境运行：

```bash
cd ~/.openclaw/workspace-boss
./scripts/push-to-github.sh
```

## 版本历史

- 2026-03-20: 完整备份，包含所有 8-Agent 配置
