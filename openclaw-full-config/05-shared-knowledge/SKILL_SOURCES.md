# 技能查找渠道指南

**创建时间**: 2026-03-06
**维护者**: 搭子总管
**用途**: 8个助手共享的公共知识

---

## 📦 官方渠道

### 1. ClawHub（推荐）
- **命令**: `clawhub search <关键词>`
- **安装**: `clawhub install <技能名>`
- **更新**: `clawhub update <技能名>`
- **官网**: https://clawhub.com

**使用示例:**
```bash
clawhub search pdf          # 搜索PDF相关技能
clawhub install nano-pdf    # 安装技能
```

---

## 🌐 社区资源

### 2. GitHub Awesome 列表
- **仓库**: https://github.com/VoltAgent/awesome-openclaw-skills
- **用途**: 官方收录的社区技能
- **包含**: 技能列表、开发模板、示例代码

### 3. 手动安装（GitHub源）
如果ClawHub找不到，可以直接从GitHub安装:
```bash
# 克隆到技能目录
git clone <技能仓库> ~/.openclaw/skills/<技能名>
```

---

## 📂 本地技能目录

### 4. 系统内置技能
**位置**: `~/.npm-global/lib/node_modules/openclaw/skills/`
- 系统默认自带
- 无需安装，直接使用

### 5. 全局技能
**位置**: `~/.openclaw/skills/`
- 所有助手共享
- 适合公共工具

### 6. Workspace技能
**位置**: `~/.openclaw/workspace-boss/skills/`
- 总管专属
- 高级/管理工具

### 7. Agent专属技能
**位置**: `~/.openclaw/agents/{name}/skills/`
- 仅该助手可用
- 专业领域工具

---

## 🔍 查找流程

当用户说"帮我找XXX技能"时:

```
1. 询问用户需要什么功能的技能
        ↓
2. 使用 clawhub search 搜索
        ↓
3. 如果没找到 → 查 GitHub awesome 列表
        ↓
4. 返回推荐结果给用户
        ↓
5. 用户确认后安装
```

---

## ⚠️ 安全提醒

安装技能前:
- ✅ 检查技能来源是否可信
- ✅ 使用 `skill-vetter` 进行安全检查
- ❌ 不要安装来源不明的技能

---

*最后更新: 2026-03-06*
