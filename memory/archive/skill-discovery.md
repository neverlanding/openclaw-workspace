## 📚 技能查找规范（2026-03-07 更新）

### 四种技能查找渠道（全覆盖）

当用户询问技能相关问题时，按以下渠道依次查找：

| 优先级 | 渠道 | 方式 | 位置/命令 |
|:---|:---|:---|:---|
| 1 | 本地已安装 | 直接读取 | `available_skills` 列表 |
| 2 | Skills CLI | 命令搜索 | `npx skills find [关键词]` |
| 3 | ClawHub | 网站浏览 | https://clawhub.com |
| 4 | GitHub | 仓库浏览 | awesome-openclaw-skills |

### 详细指南文档
- **完整文档**: `memory/skill-discovery-guide.md`
- **公用记忆**: 所有Agent共享此规范

### 核心命令速查
```bash
# 搜索社区技能
npx skills find [关键词]

# 安装技能
npx skills add <owner/repo@skill> -g -y

# 检查更新
npx skills check
```

---

