# OpenClaw 8-Agent 团队 - 一键部署方案

## 📋 方案概览

为你准备了4种部署方式，从简单到复杂：

| 方式 | 适用场景 | 难度 | 时间 |
|:---|:---|:---:|:---:|
| **方式1: 手动复制** | 单台机器迁移 | ⭐ 简单 | 10分钟 |
| **方式2: 导出/导入脚本** | 批量部署/备份 | ⭐⭐ 较简单 | 15分钟 |
| **方式3: Docker部署** | 容器化/云服务器 | ⭐⭐⭐ 中等 | 20分钟 |
| **方式4: CI/CD集成** | 自动化部署 | ⭐⭐⭐⭐ 复杂 | 30分钟 |

---

## 🎯 方式1: 手动复制（最简单）

### 步骤

```bash
# 1. 在新机器安装 OpenClaw
npm install -g openclaw

# 2. 从旧机器复制以下目录到新机器
# 使用 scp 或 rsync
scp -r user@old-server:~/.openclaw/openclaw.json ~/.openclaw/
scp -r user@old-server:~/.openclaw/agents ~/.openclaw/
scp -r user@old-server:~/.openclaw/skills ~/.openclaw/
scp -r user@old-server:~/.openclaw/extensions ~/.openclaw/
scp -r user@old-server:~/.openclaw/workspace-* ~/.openclaw/

# 3. 安装扩展依赖
for ext in ~/.openclaw/extensions/*/; do
    (cd "$ext" && npm install)
done

# 4. 启动
openclaw gateway start
```

---

## 🎯 方式2: 导出/导入脚本（推荐）

### 在旧环境执行（导出）

```bash
# 1. 下载导出脚本
curl -O https://your-server/export-openclaw-config.sh
chmod +x export-openclaw-config.sh

# 2. 执行导出
./export-openclaw-config.sh ./my-openclaw-config

# 3. 将生成的压缩包传输到新环境
scp openclaw-config-*.tar.gz user@new-server:~/
```

### 在新环境执行（导入）

```bash
# 1. 安装 OpenClaw
npm install -g openclaw

# 2. 下载导入脚本
curl -O https://your-server/import-openclaw-config.sh
chmod +x import-openclaw-config.sh

# 3. 执行导入
./import-openclaw-config.sh openclaw-config-*.tar.gz

# 4. 按提示填写API Key
nano ~/.openclaw/openclaw.json

# 5. 启动
openclaw gateway start
```

---

## 🎯 方式3: Docker部署（生产推荐）

### 目录结构

```
openclaw-docker/
├── docker-compose.yml
├── Dockerfile
├── entrypoint.sh
├── inject-env-to-config.sh
├── .env                    # 环境变量（不提交Git）
├── config/
│   └── openclaw.json       # 脱敏配置模板
├── agents/                 # 8个Agent配置
├── skills/
│   ├── local/
│   └── agents/
├── extensions/             # feishu, wecom-app
└── workspaces/             # 工作空间
```

### 快速启动

```bash
# 1. 克隆配置仓库
git clone https://your-git/openclaw-config.git
cd openclaw-config

# 2. 配置环境变量
cp .env.example .env
nano .env  # 填写8个飞书AppSecret和其他Key

# 3. 启动
docker-compose up -d

# 4. 查看状态
docker-compose logs -f
```

### .env 文件示例

```bash
# 8个飞书机器人 AppSecret
FEISHU_MAIN_APPSECRET=cli_xxx_secret_xxx
FEISHU_PLANNER_APPSECRET=cli_xxx_secret_xxx
FEISHU_OFFICE_APPSECRET=cli_xxx_secret_xxx
FEISHU_WRITER_APPSECRET=cli_xxx_secret_xxx
FEISHU_NEWS_APPSECRET=cli_xxx_secret_xxx
FEISHU_READER_APPSECRET=cli_xxx_secret_xxx
FEISHU_FINANCE_APPSECRET=cli_xxx_secret_xxx
FEISHU_CODER_APPSECRET=cli_xxx_secret_xxx

# Gateway Token
OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)

# 模型API Key（可选）
KIMI_CODING_API_KEY=sk-xxx
MOONSHOT_API_KEY=sk-xxx
```

---

## 🔐 敏感信息管理

### 需要配置的敏感信息

| 类型 | 数量 | 来源 |
|:---|:---:|:---|
| 飞书 AppSecret | 8个 | 飞书开发者后台 → 每个机器人应用 |
| Gateway Token | 1个 | 自己生成随机字符串 |
| 模型 API Key | 2-3个 | Kimi/Moonshot/Qwen 开发者平台 |
| 技能 API Key | 1个 | Gemini API (如需图片生成) |

### 安全最佳实践

1. **绝不提交到Git**
   ```bash
   echo ".env" >> .gitignore
   echo "*.secret" >> .gitignore
   ```

2. **使用环境变量注入**
   ```bash
   # 不修改配置文件，通过环境变量注入
   export FEISHU_MAIN_APPSECRET="xxx"
   ./inject-env-to-config.sh
   ```

3. **使用 Docker Secrets (Swarm/K8s)**
   ```yaml
   # docker-compose.yml
   secrets:
     - source: feishu_main_secret
       target: FEISHU_MAIN_APPSECRET
   ```

---

## 📊 配置清单检查表

部署前确认以下配置完整：

### Agents 配置
- [ ] boss (搭子总管) - `~/.openclaw/agents/boss/agent/`
- [ ] planner (方案搭子) - `~/.openclaw/agents/planner/agent/`
- [ ] office (办公搭子) - `~/.openclaw/agents/office/agent/`
- [ ] writer (公众号搭子) - `~/.openclaw/agents/writer/agent/`
- [ ] news (新闻搭子) - `~/.openclaw/agents/news/agent/`
- [ ] reader (读书搭子) - `~/.openclaw/agents/reader/agent/`
- [ ] finance (理财搭子) - `~/.openclaw/agents/finance/agent/`
- [ ] coder (代码搭子) - `~/.openclaw/agents/coder/agent/`

### Skills 配置
- [ ] 系统技能 (随OpenClaw自动安装)
- [ ] 本地技能 (`~/.openclaw/skills/`)
- [ ] Agents技能 (`~/.agents/skills/`)

### Extensions 配置
- [ ] feishu 插件
- [ ] wecom-app 插件

### API Keys
- [ ] 8个飞书机器人 AppSecret
- [ ] Gateway Token
- [ ] 模型 API Key (Kimi/Moonshot)
- [ ] 技能 API Key (可选)

---

## 🚀 部署后验证

### 1. 检查服务状态

```bash
# 检查 Gateway 是否运行
curl http://localhost:18789/status

# 查看日志
openclaw gateway logs
```

### 2. 测试飞书机器人

在飞书分别给8个机器人发送测试消息：
- `@搭子总管` 发送 "你好"
- `@方案搭子` 发送 "测试"
- ... 依此类推

每个机器人应该独立回复。

### 3. 检查Agent配置

```bash
# 列出所有 Agent
openclaw agents list

# 验证配置
openclaw config validate
```

---

## 🔧 常见问题

### Q: 导入后飞书机器人不回复
**A**: 检查以下几点：
1. `appSecret` 是否正确填写
2. 飞书开发者后台的回调 URL 是否指向新服务器
3. 防火墙是否开放 18789 端口
4. 查看日志: `openclaw gateway logs | grep feishu`

### Q: 技能无法使用
**A**: 
1. 系统技能需要重新安装: `npm install -g openclaw`
2. 本地技能检查路径是否正确
3. 查看技能日志了解具体错误

### Q: Agent 工作空间丢失
**A**: 
1. 确保 `workspace-*` 目录已复制
2. 检查 `openclaw.json` 中 `agents.list[].workspace` 路径

### Q: Docker 部署后数据丢失
**A**: 
1. 检查 volume 挂载是否正确
2. 使用命名卷持久化数据
3. 定期备份: `docker exec openclaw tar czf /backup/openclaw-$(date +%s).tar.gz /root/.openclaw`

---

## 📦 文件说明

| 文件 | 用途 | 位置 |
|:---|:---|:---|
| `export-openclaw-config.sh` | 导出配置 | 当前目录 |
| `import-openclaw-config.sh` | 导入配置 | 新环境 |
| `inject-env-to-config.sh` | 环境变量注入 | 辅助脚本 |
| `DEPLOY.md` | Docker部署详细文档 | 参考文档 |
| `openclaw-config-*.tar.gz` | 导出的配置包 | 导出产物 |

---

## 🎉 完成

按照以上步骤，你可以：

1. ✅ 完整迁移8个Agent配置
2. ✅ 保留所有自定义技能
3. ✅ 保持工作空间数据
4. ✅ 安全处理API Key
5. ✅ 支持Docker容器化部署

有任何问题随时问我！
