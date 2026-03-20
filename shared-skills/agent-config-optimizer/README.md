# Agent配置优化技能使用指南

## 快速开始

### 1. 运行配置检查

```bash
~/.openclaw/skills/agent-config-optimizer/check-config.sh <你的助手名称>
```

示例：
```bash
~/.openclaw/skills/agent-config-optimizer/check-config.sh office
```

### 2. 阅读详细指南

```bash
cat ~/.openclaw/skills/agent-config-optimizer/SKILL.md
```

### 3. 开始优化

告诉办公搭子（或其他配置优化助手）：
> "请帮我优化我的配置文件，目标是95分以上"

## 优化流程

### 第一步：备份现有配置

```bash
cd ~/.openclaw/workspace-{你的名字}/
mkdir -p backup-$(date +%Y%m%d)
cp *.md backup-$(date +%Y%m%d)/
```

### 第二步：运行检查脚本

运行检查脚本，查看当前状态：
```bash
~/.openclaw/skills/agent-config-optimizer/check-config.sh {你的名字}
```

### 第三步：按顺序修改

建议顺序：**SOUL → AGENTS → TOOLS → IDENTITY → USER → HEARTBEAT → MEMORY**

#### SOUL.md 重点
- 核心定位（一句话）
- 核心信念（3-5条）
- 核心特质（表格化）
- **主动性原则**（必须有！）
- **客观性原则**（必须有！）

参考模板：
```markdown
## 主动性原则

### 核心
不等问，主动发现问题、主动汇报进展、主动检查异常。

### 量化标准
| 情况 | 判断 | 行动 |
|:---|:---:|:---|
| 任务耗时>30分钟 | 🔴 | 主动汇报进度 |
| 连续2次失败 | 🔴 | 立即汇报，暂停操作 |
```

#### AGENTS.md 重点
- 核心定位
- 主要职责（表格化：职责+内容+交付标准）
- **量化判断标准**（必须有！）
- **记忆检索规则**（必须有！）
- 公共规则引用（放在定时任务规范末尾）

参考模板：
```markdown
## 量化判断标准

| 场景 | 判断标准 | 处理方式 |
|:---|:---|:---|
| 任务耗时 | >30分钟 | 🔴 立即汇报组长 |
| 连续失败 | ≥2次同一操作失败 | 🔴 立即汇报，暂停操作 |
```

#### TOOLS.md 重点
- 工具速查表
- 常用路径
- 共享记忆路径
- **不要放公共规则引用**

### 第四步：验证检查

修改完成后，再次运行检查脚本：
```bash
~/.openclaw/skills/agent-config-optimizer/check-config.sh {你的名字}
```

确认：
- [ ] 所有文件行数在推荐范围内
- [ ] SOUL.md 包含主动性原则、客观性原则
- [ ] AGENTS.md 包含量化判断标准、记忆检索规则
- [ ] 所有文件有版本号
- [ ] 公共规则引用位置正确

### 第五步：自评

根据5维度评分标准自评：

| 维度 | 权重 | 你的评分 |
|:---|:---:|:---:|
| 职责清晰度 | 25% | ? |
| 内容实用性 | 25% | ? |
| 长度合理性 | 20% | ? |
| 一致性 | 20% | ? |
| 可维护性 | 10% | ? |
| **总分** | 100% | **?** |

目标：**≥95分**

## 常见问题

### Q1: 我的AGENTS.md有300行，怎么精简？

A: 把详细说明移到技能文件，AGENTS.md只保留速查表。例如：
- 详细的命令示例 → 移到技能目录
- 常见问题解答 → 移到 failure-lessons-quickref.md
- 长段落描述 → 改为表格

### Q2: 主动性原则和客观性原则必须写吗？

A: **必须！** 这是评分的关键项，缺少会扣大量分数。

### Q3: 版本号格式有要求吗？

A: 统一使用：`版本: v1.0 | 更新: YYYY-MM-DD`

### Q4: 公共规则引用放在哪里？

A: 根据你的助手类型：
- **执行者**（办公、代码等）：AGENTS.md → 定时任务规范 → 执行规范 末尾
- **统筹者**（总管）：AGENTS.md → 团队配置同步 末尾
- **规划者**（方案）：AGENTS.md → Every Session → 共享规范 部分

### Q5: 配置文件放在哪个目录？

A: `~/.openclaw/workspace-{你的名字}/`

**不是** `agents/{名字}/agent/` 目录！

## 示例文件

可以参考以下已优化的配置文件：
- 办公搭子：`workspace-office/`
- 方案搭子：`workspace-planner/`
- 搭子总管：`workspace-boss/`

## 获取帮助

如果需要帮助，可以：
1. 查看详细指南：`~/.openclaw/skills/agent-config-optimizer/SKILL.md`
2. 运行检查脚本获取诊断报告
3. 询问办公搭子或其他配置优化助手

---

**记住：目标是95分以上！**
