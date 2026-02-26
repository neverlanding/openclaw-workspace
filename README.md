# OpenClaw Workspace

个人OpenClaw工作区配置备份，包含记忆系统、配置文件和工具脚本。

## 内容

- **记忆系统**: 三层记忆架构 (P0热记忆/P1温记忆/P2冷记忆)
- **配置文件**: AGENTS.md, MEMORY.md, SOUL.md, USER.md等
- **工具脚本**: memory-health.sh, switch-model.sh等
- **恢复脚本**: restore-openclaw.sh

## 新环境恢复

```bash
# 1. 克隆仓库
git clone https://github.com/neverlanding/openclaw-workspace.git
cd openclaw-workspace

# 2. 运行恢复脚本
./restore-openclaw.sh

# 3. 配置OpenClaw
openclaw configure
```

## 目录结构

```
.
├── AGENTS.md              # 代理配置指南
├── MEMORY.md              # 长期记忆
├── SOUL.md               # 人格定义
├── USER.md               # 用户信息
├── memory/               # 记忆系统
│   ├── feedback/        # 反馈循环
│   ├── signals/         # 信号捕获
│   ├── verified/        # 验证记录
│   └── ...
├── *.sh                  # 工具脚本
└── restore-openclaw.sh  # 恢复脚本
```
