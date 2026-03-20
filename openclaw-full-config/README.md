# OpenClaw 完整配置备份

**备份时间**: 2026-03-16  
**备份大小**: ~235MB  
**版本**: v1.0  

---

## 📦 备份内容

| 目录 | 内容 | 大小 |
|:---|:---|:---:|
| `01-core-config/` | openclaw.json (脱敏) | ~12KB |
| `02-agents/` | 8个Agent完整配置 | ~130MB |
| `03-skills/` | 自定义Skills (~15个) | ~300KB |
| `04-extensions/` | 扩展插件 (feishu, wecom-app) | ~5MB |
| `05-shared-memory/` | 共享知识库 | ~28KB |
| `06-workspaces-memory/` | 工作空间记忆 (.md) | ~10MB |
| `07-learning-materials/` | 学习资料 (K8s等) | ~5MB |
| `08-scripts-tools/` | 脚本工具 | - |
| `09-system-memory/` | 系统内存 (.sqlite) | ~656KB |
| `10-sessions/` | 完整Session历史 | ~78MB |

**总计**: ~235MB

---

## 🚀 快速恢复

```bash
# 1. 克隆仓库
git clone https://github.com/neverlanding/openclaw-workspace.git
cd openclaw-workspace/openclaw-full-config

# 2. 运行恢复脚本
./restore.sh

# 3. 填写API Key
nano ~/.openclaw/openclaw.json

# 4. 启动服务
openclaw gateway start
```

---

## 📝 手动恢复

如需手动恢复，按以下顺序复制文件：

1. **主配置**: `01-core-config/openclaw.json` → `~/.openclaw/`
2. **Agents**: `02-agents/*` → `~/.openclaw/agents/`
3. **Skills**: `03-skills/*` → `~/.openclaw/skills/` 和 `~/.agents/skills/`
4. **Extensions**: `04-extensions/*` → `~/.openclaw/extensions/`
5. **Shared Knowledge**: `05-shared-memory/*` → `~/.openclaw/shared-memory/`
6. **Workspaces Memory**: 按需复制到各workspace
7. **System Memory**: `09-system-memory/*` → `~/.openclaw/memory/`
8. **Sessions**: `10-sessions/*` → `~/.openclaw/agents/*/sessions/`

---

## ⚠️ 重要提示

1. **API Key脱敏**: 配置文件中所有API Key已替换为 `[REDACTED]`
2. **恢复后必填**: 必须手动填入真实的API Key才能正常使用
3. **备份原有配置**: 恢复脚本会自动备份现有配置
4. **扩展依赖**: 恢复后会自动安装扩展插件依赖

---

## 🔧 包含的Agents

| ID | 名称 | 职责 |
|:---|:---|:---|
| `boss` | 搭子总管 | 协调管理 |
| `planner` | 方案搭子 | PPT/方案 |
| `office` | 办公搭子 | 日常办公 |
| `writer` | 公众号搭子 | 内容创作 |
| `news` | 新闻搭子 | 资讯追踪 |
| `reader` | 读书搭子 | 阅读学习 |
| `finance` | 理财搭子 | 财富管理 |
| `coder` | 代码搭子 | 编程开发 |

---

## 📅 备份历史

| 日期 | 版本 | 说明 |
|:---|:---|:---|
| 2026-03-16 | v1.0 | 首次完整备份，含Session |

---

*由代码搭子于2026-03-16创建*
