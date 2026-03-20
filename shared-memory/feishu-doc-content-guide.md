# 飞书文档添加正文经验

**关键词**: 飞书、正文、文档内容、添加内容、feishu_doc

**文档位置**: `shared-memory/failure-lessons-quickref.md` 第6条

---

## 问题现象

发送的飞书文档链接打开后**只有标题，无正文内容**

## 根本原因

创建文档时只写了标题，**未执行追加内容操作**

## 正确操作流程

```
feishu_doc create (只创建标题)
    ↓
feishu_doc append (追加正文内容) ← 关键步骤！
    ↓
feishu_doc read (验证内容完整)
    ↓
发送文档链接
```

## 关键要点

| 步骤 | 工具 | 说明 |
|:---|:---|:---|
| 1. 创建 | `feishu_doc create` | 只创建空文档+标题 |
| 2. 追加 | `feishu_doc append` | **必须执行！**添加正文 |
| 3. 验证 | `feishu_doc read` | 确认内容完整 |
| 4. 发送 | `message` | 发送文档链接 |

## 常见错误

❌ **错误**: 只执行 `create`，没执行 `append`  
✅ **正确**: `create` → `append` → `read` 验证 → 发送

## 预防措施

- 创建文档后立即执行 `feishu_doc read` 验证内容
- 发送前再次确认文档内容完整
- 重要文档本地备份+飞书文档双重保存

---

*创建时间: 2026-03-20*  
*来源: failure-lessons-quickref.md 第6条*
