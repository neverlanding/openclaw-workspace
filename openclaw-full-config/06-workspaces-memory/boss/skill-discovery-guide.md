# 技能查找指南 - 8-Agent团队公用

> 生效时间: 2026-03-07
> 制定人: 组长
> 适用范围: 所有Agent（搭子总管及8个搭子）

---

## 📋 技能查找渠道（全覆盖）

当用户询问"如何查找技能"、"有没有XXX技能"或"技能怎么找"时，按以下优先级和渠道进行查找：

### 渠道1: 本地已安装技能（最高优先级）

**位置**:
- 系统启动时自动加载的 `available_skills` 列表
- 全局技能: `~/.openclaw/skills/`
- 工作区技能: `~/.openclaw/workspace-boss/skills/`
- Agent专属技能: `~/.openclaw/agents/{name}/skills/`

**使用方法**:
```
直接读取对应技能的 SKILL.md 文件了解用法
```

**当前统计**: 68+ 个技能已安装

---

### 渠道2: Skills CLI / skills.sh（社区技能仓库）

**平台地址**: https://skills.sh/

**核心命令**:
```bash
# 搜索技能
npx skills find [关键词]

# 安装技能
npx skills add <owner/repo@skill> -g -y

# 检查更新
npx skills check

# 更新所有技能
npx skills update
```

**使用场景**:
- 用户问"如何做XXX"
- 用户说"找XXX技能"
- 用户问"有没有XXX功能的技能"

**示例**:
```bash
# 用户问: "怎么优化React性能？"
npx skills find react performance

# 返回结果示例:
# vercel-labs/agent-skills@vercel-react-best-practices
# Install: npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

---

### 渠道3: ClawHub 技能仓库

**平台地址**: https://clawhub.com

**用途**:
- 搜索、安装社区共享的技能
- 浏览热门技能排行
- 查看技能详情和使用说明

---

### 渠道4: GitHub 官方资源库

**仓库地址**: https://github.com/VoltAgent/awesome-openclaw-skills

**用途**:
- 官方收录的OpenClaw技能列表
- 社区贡献的技能资源
- 技能开发模板和示例
- 扩展能力的重要来源

---

## 🎯 技能查找工作流程

```
用户询问技能相关问题
        ↓
┌─────────────────────────────────────┐
│  步骤1: 检查本地已安装技能            │
│  - 查看 available_skills 列表        │
│  - 搜索本地技能目录                  │
└─────────────────────────────────────┘
        ↓ 未找到
┌─────────────────────────────────────┐
│  步骤2: 使用 Skills CLI 搜索         │
│  - npx skills find [关键词]          │
│  - 查看 skills.sh 结果               │
└─────────────────────────────────────┘
        ↓ 未找到
┌─────────────────────────────────────┐
│  步骤3: 搜索 ClawHub                 │
│  - 访问 clawhub.com                  │
│  - 使用搜索功能                      │
└─────────────────────────────────────┘
        ↓ 未找到
┌─────────────────────────────────────┐
│  步骤4: 查看 GitHub 资源库            │
│  - awesome-openclaw-skills           │
│  - 浏览社区贡献                      │
└─────────────────────────────────────┘
        ↓
向用户汇报查找结果
```

---

## 📝 常用技能分类速查

| 分类 | 关键词示例 | 可能来源 |
|:---|:---|:---|
| 开发类 | coding, github, git, pr-review | Skills CLI, ClawHub |
| 搜索类 | web-search, tavily, search | 本地已安装 |
| 办公类 | feishu-doc, email, excel | 本地已安装 |
| 分析类 | stock-analysis, data-analysis | 本地已安装 |
| 媒体类 | video, audio, image | Skills CLI, ClawHub |
| 部署类 | docker, kubernetes, ngrok | Skills CLI, GitHub |

---

## ⚠️ 注意事项

1. **优先本地**: 先检查本地已安装技能，避免重复安装
2. **安全检查**: 安装新技能前使用 `skill-vetter` 进行安全检查
3. **分类建议**: 判断是公共技能还是某个搭子的专属技能
4. **最终确认**: 安装前需经组长同意（重要技能）

---

## 🔗 快速链接

| 平台 | 地址 | 用途 |
|:---|:---|:---|
| Skills CLI | `npx skills` | 搜索安装社区技能 |
| skills.sh | https://skills.sh/ | 在线浏览技能 |
| ClawHub | https://clawhub.com | OpenClaw技能市场 |
| GitHub资源 | https://github.com/VoltAgent/awesome-openclaw-skills | 官方技能列表 |

---

*最后更新: 2026-03-07*
*更新者: 搭子总管*
