# OpenClaw 完整备份计划 v1.0
# 目标：环境损坏后，可完整恢复所有设置、记忆、技能和资料
# 时间：2026-03-16
# 负责人：技术搭子

## 📋 备份目标

**核心目标**：环境损坏 → GitHub下载 → 一键恢复 → 100%还原

**包含内容**：
1. 主配置 (openclaw.json)
2. 8个Agent配置 (含记忆)
3. 自定义Skills (~15个)
4. 扩展插件 (feishu, wecom-app)
5. 共享知识 (shared-knowledge)
6. 工作空间记忆 (workspace-*/memory/)
7. 学习资料 (K8s_Kubeflow等)
8. 运行时记忆 (.sqlite)
9. 重要脚本和工具

---

## 📁 完整备份目录结构

```
openclaw-complete-backup/
├── README.md                          # 恢复说明
├── BACKUP_MANIFEST.json               # 备份清单
├── VERSION                            # 备份版本
│
├── 01-core-config/                    # 核心配置
│   ├── openclaw.json                  # 主配置(脱敏)
│   └── openclaw.json.secrets.template # 密钥模板
│
├── 02-agents/                         # 8个Agent完整配置
│   ├── boss/                          # 搭子总管
│   │   ├── agent/                     # Agent配置
│   │   ├── memory/                    # 工作日志(.md)
│   │   └── sqlite/                    # 运行时记忆(.sqlite)
│   ├── planner/                       # 方案搭子
│   ├── office/                        # 办公搭子
│   ├── writer/                        # 公众号搭子
│   ├── news/                          # 新闻搭子
│   ├── reader/                        # 读书搭子
│   ├── finance/                       # 理财搭子
│   └── coder/                         # 技术搭子
│
├── 03-skills/                         # 技能
│   ├── local/                         # ~/.openclaw/skills/
│   └── agents/                        # ~/.agents/skills/
│
├── 04-extensions/                     # 扩展插件
│   ├── feishu/                        # 飞书插件配置
│   └── wecom-app/                     # 企业微信插件配置
│
├── 05-shared-knowledge/               # 共享知识
│   ├── COMMON_RULES.md
│   ├── SKILL_SOURCES.md
│   ├── USER_MAPPING.md
│   └── VIDEO_LEARNING_GUIDE.md
│
├── 06-workspaces-memory/              # 工作空间记忆
│   ├── boss/                          # workspace-boss/memory/
│   ├── planner/                       # workspace-planner/memory/
│   ├── office/
│   ├── writer/
│   ├── news/
│   ├── reader/
│   ├── finance/
│   └── coder/
│
├── 07-learning-materials/             # 学习资料
│   └── K8s_Kubeflow/                  # K8s培训资料
│       ├── 视频信息.md
│       ├── 中间整理/
│       └── 学习总结/
│
├── 08-scripts-tools/                  # 脚本和工具
│   ├── export-config.sh
│   ├── import-config.sh
│   └── cron/                          # 定时任务
│
└── 09-system-memory/                  # 系统级记忆
    └── memory/                        # ~/.openclaw/memory/
        ├── boss.sqlite
        ├── coder.sqlite
        ├── finance.sqlite
        ├── main.sqlite
        ├── news.sqlite
        ├── office.sqlite
        ├── planner.sqlite
        ├── reader.sqlite
        └── writer.sqlite
```

---

## 📊 备份内容详情

### 1. Core Config (核心配置)
- **源**: ~/.openclaw/openclaw.json
- **大小**: ~12KB
- **脱敏**: API Key, Secret, Token 替换为 [REDACTED]
- **恢复**: 需手动填入真实密钥

### 2. Agents (8个助手)
- **源**: ~/.openclaw/agents/*
- **大小**: ~130MB
- **包含**:
  - Agent配置 (AGENTS.md, SOUL.md, TOOLS.md等)
  - 认证配置 (auth.json, auth-profiles.json)
  - 模型配置 (models.json)
  - 工作空间记忆 (workspace-*/memory/*.md)
  - 运行时记忆 (.sqlite)

### 3. Skills (技能)
- **本地Skills**: ~/.openclaw/skills/ (~15个)
  - email-sender, find-skills, nano-pdf, ngrok, reminder-parser
  - self-improving-agent, skill-vetter, tavily-search等
- **Agents Skills**: ~/.agents/skills/ (~7个)
  - freeride, html-to-pdf, last30days, playwright-cli等
- **大小**: ~300KB
- **注意**: 系统自带Skills(~50个)无需备份，OpenClaw安装时自动提供

### 4. Extensions (扩展)
- **源**: ~/.openclaw/extensions/
- **包含**: feishu/, wecom-app/
- **大小**: ~52MB (含node_modules)
- **备份策略**: 只备份配置，不备份node_modules

### 5. Shared Knowledge (共享知识)
- **源**: ~/.openclaw/shared-knowledge/
- **文件**: COMMON_RULES.md, USER_MAPPING.md等
- **大小**: ~28KB

### 6. Workspaces Memory (工作空间记忆)
- **源**: ~/.openclaw/workspace-*/memory/
- **格式**: .md文件
- **内容**: 工作日志、项目文档、经验教训
- **大小**: ~10MB

### 7. Learning Materials (学习资料)
- **源**: ~/.openclaw/workspace-coder/knowledge_base/
- **当前**: K8s_Kubeflow/ 培训资料
- **大小**: ~5MB

### 8. System Memory (系统记忆)
- **源**: ~/.openclaw/memory/*.sqlite
- **文件**: 9个Agent的sqlite数据库
- **大小**: ~656KB
- **用途**: 运行时向量记忆

### 9. Scripts & Tools (脚本工具)
- 导出/导入脚本
- 定时任务配置

---

## 🔒 脱敏策略

### 需要脱敏的字段

```bash
# API Keys
sk-[a-zA-Z0-9]* → [OPENAI_API_KEY]
tvly-[a-zA-Z0-9]* → [TAVILY_API_KEY]
ghp_[a-zA-Z0-9]* → [GITHUB_TOKEN]

# Secrets
appSecret → [APP_SECRET]
apiKey → [API_KEY]
token → [TOKEN]
password → [PASSWORD]

# Gateway
gateway.auth.token → [GATEWAY_TOKEN]

# Channel Config
channels.*.appSecret → [CHANNEL_SECRET]
```

### 脱敏方法
- Python脚本自动替换
- 保留配置结构
- 生成secrets.template供恢复时参考

---

## ⏰ 备份频率

| 类型 | 频率 | 说明 |
|:---|:---:|:---|
| **完整备份** | 每周日 02:00 | 全量备份到GitHub |
| **增量备份** | 每日 | 仅变更文件 |
| **手动备份** | 重要变更后 | 重大配置修改后立即备份 |

---

## 🚀 恢复流程

### 一键恢复命令

```bash
# 1. 克隆备份仓库
git clone https://github.com/neverlanding/openclaw-workspace.git
cd openclaw-workspace

# 2. 运行恢复脚本
./restore-complete.sh

# 3. 填入密钥
nano 01-core-config/openclaw.json
# 按 secrets.template 填入真实API Key

# 4. 启动服务
openclaw gateway start
```

### 恢复脚本功能
1. 复制所有配置文件到对应位置
2. 安装扩展插件依赖
3. 验证配置完整性
4. 生成恢复报告

---

## 📈 备份大小预估

| 组件 | 大小 | 说明 |
|:---|:---:|:---|
| Core Config | 12KB | openclaw.json |
| Agents | 130MB | 含配置+记忆 |
| Skills | 300KB | 自定义技能 |
| Extensions | 5MB | 仅配置 |
| Shared Knowledge | 28KB | 共享规则 |
| Workspaces Memory | 10MB | 工作日志 |
| Learning Materials | 5MB | 学习资料 |
| System Memory | 656KB | .sqlite |
| Scripts | 100KB | 脚本工具 |
| **总计** | **~150MB** | 压缩后~50MB |

---

## ✅ 检查清单

备份完成后检查：
- [ ] openclaw.json 已脱敏
- [ ] 8个Agent配置完整
- [ ] Skills全部包含
- [ ] 扩展插件配置完整
- [ ] 工作空间记忆已备份
- [ ] 学习资料已备份
- [ ] .sqlite文件已备份
- [ ] 恢复脚本可执行
- [ ] GitHub推送成功
- [ ] 定时任务已配置

---

## 📝 待补充备份 (当前缺失)

1. **Extensions完整备份** - 当前只备份了配置，建议包含完整插件
2. **Star-Office-UI** - 办公室视图项目
3. **Media文件** - 生成的图片/文档（可选，较大）
4. **Cron配置** - 定时任务完整配置

---

*备份计划制定完成，等待组长确认后执行*
