# 助手求助处理记录

**时间**: 2026-03-07 16:02
**求助者**: 办公搭子
**问题**: 飞书PDF文件发送失败

---

## 问题详情

- **文件位置**: `/home/gary/clawd_docs/OpenClaw浏览器自动化教程_学习笔记.pdf`
- **文件大小**: 533KB
- **已尝试**: 使用 message 工具的 filePath 参数发送
- **结果**: 工具返回成功，但组长收不到文件

---

## 原因分析

飞书渠道对本地文件路径有特殊处理逻辑：

| 路径类型 | 处理方式 | 结果 |
|:---|:---|:---|
| `~/.openclaw/media/browser/` | 识别为附件上传 | ✅ 正常发送 |
| 其他目录（如 `/home/gary/...`） | 识别为文本链接 | ❌ 只显示路径 |

---

## 解决方案

### 正确发送步骤

```bash
# 步骤1: 将文件复制到正确目录
cp /path/to/file.pdf ~/.openclaw/media/browser/

# 步骤2: 使用 media 参数发送
openclaw message send \
  --media ~/.openclaw/media/browser/file.pdf \
  --target user:{user_id}
```

### 关键要点

1. ✅ 文件必须放在 `~/.openclaw/media/browser/` 目录
2. ✅ 使用 `media` 参数（不是 filePath）
3. ✅ 使用绝对路径
4. ❌ 不能直接用其他目录的文件

---

## 参考文档

- `memory/signals/feishu-image-rules.md`

---

## 处理状态

- [x] 收到求助
- [x] 分析问题原因
- [x] 提供解决方案
- [x] 向组长汇报

**状态**: ✅ 已解决
