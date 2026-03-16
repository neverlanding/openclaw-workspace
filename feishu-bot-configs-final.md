# 飞书机器人配置汇总（2026-03-02 最终版）

**记录时间**: 2026-03-02 10:42
**记录人**: 搭子总管

---

## ✅ 已配置（2个）

### 1. 搭子总管（当前会话）
| 字段 | 值 |
|:---|:---|
| **App ID** | cli_a90ed7d1f6389cd9 |
| **App Secret** | kVi6SWUqA740dBv2cm6YTgtCzqkPS7yi |
| **状态** | ✅ 已确认 |
| **配置文件** | workspace-boss/feishu-bot-config-boss.md |
| **激活状态** | feishu-active.yaml 中使用此配置 |

### 2. 方案搭子
| 字段 | 值 |
|:---|:---|
| **App ID** | cli_a92bd5e6d339dcd2 |
| **App Secret** | uaWYfZK4P2ibdZcjER8jNbMLKF8VQw7h |
| **状态** | ✅ 已更新（2026-03-02） |
| **配置文件** | agents/planner/agent/feishu-bot-config.md |
| **说明** | 独立飞书机器人，可@调用 |

---

## ⏳ 待配置（6个）

| 搭子 | 状态 | 备注 |
|:---|:---|:---|
| 办公搭子 (office) | ⏳ 未配置 | 待创建 |
| 公众号搭子 (writer) | ⏳ 未配置 | 待创建 |
| 新闻搭子 (news) | ⏳ 未配置 | 待创建 |
| 读书搭子 (reader) | ⏳ 未配置 | 待创建 |
| 理财搭子 (finance) | ⏳ 未配置 | 待创建 |
| 代码搭子 (coder) | ⏳ 未配置 | 待创建 |

---

## 🔑 关键区别

| 对比项 | 搭子总管 | 方案搭子 |
|:---|:---|:---|
| **职责** | 团队协调、任务分配 | PPT/Word文档生成 |
| **调用方式** | @搭子总管 管理任务 | @方案搭子 生成文档 |
| **工作空间** | workspace-boss | workspace-boss（共享） |
| **飞书配置** | cli_a90ed7d1f6389cd9 | cli_a92bd5e6d339dcd2 |

---

*最后更新：2026-03-02 10:42*
