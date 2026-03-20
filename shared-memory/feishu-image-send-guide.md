# 飞书图片/文件发送指南

**文档类型**: 公共记忆（所有助手必读）  
**创建时间**: 2026-03-01  
**更新时间**: 2026-03-19（更新为各助手使用自己的 workspace/tmp/）  
**验证状态**: ✅ 【已验证】  
**适用范围**: 所有8个Agent  

---

## 🎯 核心规则（一句话记住）

> **默认直接发送，如果从自己文件夹发送失败，复制到自己 workspace 下的 tmp/ 目录再发**

---

## ✅ 正确发送方式

### 默认方式（推荐）

直接从文件所在位置发送：

```json
{
  "action": "send",
  "media": "/path/to/your/file.png"
}
```

### 备用方式（发送失败时使用）

如果直接从原位置发送失败，复制到自己的 workspace/tmp/ 再发：

```bash
# 办公搭子示例
cp /path/to/file.png ~/.openclaw/workspace-office/tmp/

# 方案搭子示例  
cp /path/to/file.png ~/.openclaw/workspace-planner/tmp/
```

然后发送：

```json
{
  "action": "send",
  "media": "~/.openclaw/workspace-office/tmp/file.png"
}
```

---

## 📂 各助手的备用路径

| 助手 | 备用发送路径 |
|:---|:---|
| **搭子总管** (boss) | `~/.openclaw/workspace-boss/tmp/` |
| **方案搭子** (planner) | `~/.openclaw/workspace-planner/tmp/` |
| **办公搭子** (office) | `~/.openclaw/workspace-office/tmp/` |
| **写作搭子** (writer) | `~/.openclaw/workspace-writer/tmp/` |
| **信息搭子** (info) | `~/.openclaw/workspace-info/tmp/` |
| **读书搭子** (reader) | `~/.openclaw/workspace-reader/tmp/` |
| **生活搭子** (life) | `~/.openclaw/workspace-life/tmp/` |
| **技术搭子** (tech) | `~/.openclaw/workspace-tech/tmp/` |

---

## ❌ 避免的路径

| 路径 | 说明 |
|:---|:---|
| ❌ `/tmp/` | 系统临时目录，重启会清理 |
| ❌ `~/.openclaw/media/browser/` | 已废弃，不再使用 |
| ❌ 其他助手的工作区 | 不要跨助手使用路径 |

---

## 📋 完整操作流程

### 场景1：直接发送（首选）

```markdown
1. 直接使用 media 参数发送
   {
     "action": "send",
     "media": "/path/to/your/image.png"
   }

2. 如果成功，完成！

3. 如果失败，进入备用流程
```

### 场景2：备用发送流程

```markdown
1. 复制到自己的 workspace/tmp/
   cp /path/to/image.png ~/.openclaw/workspace-{你的名字}/tmp/

2. 从 tmp/ 发送
   {
     "action": "send",
     "media": "~/.openclaw/workspace-{你的名字}/tmp/image.png"
   }
```

### 场景3：生成文件后发送

```markdown
1. 生成文件（如PDF、图片）

2. 直接尝试发送

3. 失败时，复制到自己的 tmp/ 再发
```

---

## 🔧 中文文件名处理

**建议**: 使用英文文件名避免乱码

```bash
# 好的做法
cp 图片.png ~/.openclaw/workspace-office/tmp/image_result.png

# 然后发送 image_result.png
```

---

## 📚 相关文档

- `TOOLS.md` - 各助手的工具使用笔记
- `memory/feishu-image-rules.md` - 历史验证记录

---

## ✅ 助手确认清单

请所有助手阅读本文档后确认：

- [x] 搭子总管 (boss) - 已知晓
- [ ] 方案搭子 (planner) - 待确认
- [ ] 办公搭子 (office) - 待确认
- [ ] 写作搭子 (writer) - 待确认
- [ ] 信息搭子 (info) - 待确认
- [ ] 读书搭子 (reader) - 待确认
- [ ] 生活搭子 (life) - 待确认
- [ ] 技术搭子 (tech) - 待确认

---

**最后更新**: 2026-03-19  
**记录人**: 搭子总管  
**重要性**: ⭐⭐⭐⭐⭐