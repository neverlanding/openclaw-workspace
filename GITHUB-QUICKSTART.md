# OpenClaw 8-Agent GitHub 部署 - 快速开始

## 🚀 三步完成部署

### 第1步：创建GitHub仓库

```bash
# 在GitHub上创建空仓库，然后执行：
git clone https://github.com/YOUR_USERNAME/openclaw-config.git
cd openclaw-config
```

### 第2步：一键初始化

```bash
# 下载并运行初始化脚本
curl -O https://raw.githubusercontent.com/YOUR_USERNAME/openclaw-config/main/init-github-repo.sh
chmod +x init-github-repo.sh
./init-github-repo.sh https://github.com/YOUR_USERNAME/openclaw-config.git
```

或者手动复制当前环境的配置：

```bash
# 1. 复制提供的文件到仓库
cp ~/workspace-boss/init-github-repo.sh .
cp ~/workspace-boss/deploy.yml .github/workflows/

# 2. 运行初始化
./init-github-repo.sh https://github.com/YOUR_USERNAME/openclaw-config.git
```

### 第3步：配置GitHub Secrets

访问: `https://github.com/YOUR_USERNAME/openclaw-config/settings/secrets/actions`

添加以下Secrets：

#### 必需配置

| Secret Name | 值来源 |
|:---|:---|
| `FEISHU_MAIN_APPSECRET` | 飞书开发者后台 → 搭子总管应用 |
| `FEISHU_PLANNER_APPSECRET` | 飞书开发者后台 → 方案搭子应用 |
| `FEISHU_OFFICE_APPSECRET` | 飞书开发者后台 → 办公搭子应用 |
| `FEISHU_WRITER_APPSECRET` | 飞书开发者后台 → 公众号搭子应用 |
| `FEISHU_NEWS_APPSECRET` | 飞书开发者后台 → 新闻搭子应用 |
| `FEISHU_READER_APPSECRET` | 飞书开发者后台 → 读书搭子应用 |
| `FEISHU_FINANCE_APPSECRET` | 飞书开发者后台 → 理财搭子应用 |
| `FEISHU_CODER_APPSECRET` | 飞书开发者后台 → 代码搭子应用 |
| `OPENCLAW_GATEWAY_TOKEN` | 任意随机字符串（如：`openssl rand -hex 32`）|
| `DEPLOY_HOST` | 你的服务器IP或域名 |
| `DEPLOY_USER` | SSH用户名（如：root）|
| `DEPLOY_KEY` | SSH私钥（完整内容）|

#### 可选配置

| Secret Name | 说明 |
|:---|:---|
| `KIMI_CODING_API_KEY` | Kimi模型API Key |
| `MOONSHOT_API_KEY` | Moonshot模型API Key |
| `NANO_BANANA_API_KEY` | Gemini API Key（图片生成）|
| `ALLOWED_USER` | 允许访问的飞书用户ID |

---

## 📁 仓库结构

初始化后，仓库结构如下：

```
openclaw-config/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 部署工作流
├── configs/
│   ├── openclaw.template.json   # 脱敏配置模板
│   └── agents/                  # 8个Agent配置
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
├── .env.example                 # 环境变量示例
├── .gitignore
└── README.md
```

---

## 🔄 日常使用

### 修改配置并部署

```bash
# 1. 修改配置（如编辑Agent的SOUL.md）
nano configs/agents/boss/agent/SOUL.md

# 2. 提交并推送
git add .
git commit -m "Update boss agent personality"
git push origin main

# 3. GitHub Actions自动部署
# 查看进度: https://github.com/YOUR_USERNAME/openclaw-config/actions
```

### 手动触发部署

在GitHub仓库页面：
1. 点击 **Actions** 标签
2. 选择 **Deploy OpenClaw 8-Agent Team**
3. 点击 **Run workflow**
4. 选择环境（production/staging）
5. 点击 **Run workflow**

---

## 🔧 故障排查

### 部署失败

1. **查看GitHub Actions日志**
   - 进入 Actions 标签页
   - 点击失败的workflow
   - 查看具体步骤的错误信息

2. **检查服务器连接**
   ```bash
   # 在本地测试SSH连接
   ssh -i ~/.ssh/your_key -p 22 user@your-server
   ```

3. **检查OpenClaw状态**
   ```bash
   # 在服务器上执行
   openclaw gateway status
   openclaw gateway logs
   ```

### 配置验证失败

```bash
# 在服务器上验证配置
openclaw config validate

# 检查配置文件JSON格式
python3 -c "import json; json.load(open('/root/.openclaw/openclaw.json'))"
```

---

## 🔐 安全最佳实践

1. **不要提交敏感信息**
   - 所有密钥通过GitHub Secrets管理
   - 配置文件模板已脱敏
   - `.gitignore`已配置忽略敏感文件

2. **定期轮换密钥**
   - 建议每3-6个月轮换一次API Key
   - 在GitHub Secrets中更新即可

3. **限制访问权限**
   - 仓库设置为Private
   - 仅授权人员可访问Secrets
   - 使用Deploy Key而非个人SSH Key

---

## 📚 更多文档

- 完整方案: `GITHUB-DEPLOY.md`
- Docker部署: `DEPLOY.md`
- 通用部署: `DEPLOY-GUIDE.md`

---

## ✅ 检查清单

部署前确认：

- [ ] GitHub仓库已创建
- [ ] 所有8个飞书AppSecret已添加到Secrets
- [ ] Gateway Token已设置
- [ ] 服务器SSH配置正确
- [ ] 目标服务器已安装Node.js (v20+)
- [ ] 目标服务器可访问飞书服务器
- [ ] 防火墙已开放18789端口

---

有问题随时问我！
