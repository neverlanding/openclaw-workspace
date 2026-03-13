# 飞书图片/文件发送指南

**文档类型**: 公共记忆（所有助手必读）  
**创建时间**: 2026-03-01  
**更新时间**: 2026-03-11（整合并标准化）  
**验证状态**: ✅ 【已验证】  
**适用范围**: 所有8个Agent（通过搭子总管发送飞书消息时）  

---

## 🎯 核心规则（一句话记住）

> **图片必须放在 `~/.openclaw/media/browser/` 目录，使用 `media` 参数发送**

---

## ✅ 正确发送方式

### 图片发送（标准流程）

```json
{
  "action": "send",
  "media": "/home/gary/.openclaw/media/browser/image.png",
  "target": "chat:oc_a9fde469b9dc7558da7371393670951e"
}
```

**关键要点**:
- ✅ 文件路径：`/home/gary/.openclaw/media/browser/` 目录
- ✅ 使用参数：`media`（不是 `filePath`）
- ✅ 支持格式：PNG, JPG, JPEG, GIF, WebP

### 音频/视频发送

```json
{
  "action": "send",
  "filePath": "/tmp/audio.mp3",
  "filename": "音频文件名.mp3",
  "message": "附带说明文字",
  "target": "user:ou_d2f4d8ac1969ad7c0c427628f320e976"
}
```

**关键要点**:
- ✅ 音频/视频可以直接从 `/tmp/` 发送
- ✅ 使用参数：`filePath` + `filename`
- ✅ 建议加上 `message` 说明内容

---

## ❌ 错误方式（避免踩坑）

| 错误方式 | 错误参数 | 结果 |
|:---|:---|:---|
| ❌ 图片放在 `/tmp/` | `media: "/tmp/image.png"` | 只显示路径文本 📎 /tmp/image.png |
| ❌ 图片放在其他目录 | `media: "~/.openclaw/media/image.png"` | 只显示路径文本 |
| ❌ 图片用 `filePath` | `filePath: "/home/gary/.openclaw/media/browser/image.png"` | 可能无法正确显示 |
| ❌ 图片用相对路径 | `media: "./image.png"` | 找不到文件 |
| ❌ 中文文件名 | `media: "/home/gary/.openclaw/media/browser/图片.png"` | 可能出现乱码 |

---

## 📋 完整操作流程

### 场景1：浏览器截图发送

```markdown
1. 使用 browser 工具截图
   ├─ 截图自动保存到 ~/.openclaw/media/browser/
   └─ 获取文件路径（如：~/.openclaw/media/browser/screenshot_123456.png）

2. 验证文件存在
   ls -la ~/.openclaw/media/browser/

3. 发送图片
   {
     "action": "send",
     "media": "/home/gary/.openclaw/media/browser/screenshot_123456.png",
     "target": "chat:oc_a9fde469b9dc7558da7371393670951e"
   }
```

### 场景2：生成图片后发送（如AI绘图）

```markdown
1. 生成/下载图片
   - DALL-E生成
   - AI绘图API返回
   - 网络下载

2. 保存到正确目录
   cp generated_image.png ~/.openclaw/media/browser/
   
   或使用英文文件名避免乱码：
   cp 图片.png ~/.openclaw/media/browser/image_result.png

3. 验证文件
   ls -la ~/.openclaw/media/browser/image_result.png

4. 发送
   {
     "action": "send",
     "media": "/home/gary/.openclaw/media/browser/image_result.png",
     "target": "user:ou_d2f4d8ac1969ad7c0c427628f320e976"
   }
```

### 场景3：多张图片发送

```markdown
# 目前飞书不支持一次性发送多张图片
# 需要分多次发送，或使用其他方式（如生成PDF后发送）

替代方案：
1. 将多张图片合并为PDF
2. 或使用 feishu-doc 创建文档插入图片
3. 或分多次发送单张图片
```

---

## 🔧 命令行发送示例

```bash
# 方式1：使用 openclaw CLI
openclaw message send \
  --media /home/gary/.openclaw/media/browser/image.png \
  --target chat:oc_a9fde469b9dc7558da7371393670951e

# 方式2：使用完整路径（推荐）
openclaw message send \
  --channel feishu \
  --media /home/gary/.openclaw/media/browser/image.png \
  --target user:ou_d2f4d8ac1969ad7c0c427628f320e976

# 方式3：发送音频文件
openclaw message send \
  --channel feishu \
  --filePath /tmp/audio.mp3 \
  --filename "学习音频.mp3" \
  --message "这是提取的音频文件" \
  --target user:ou_d2f4d8ac1969ad7c0c427628f320e976
```

---

## 📂 目录结构说明

```
~/.openclaw/media/
├── browser/          ← ✅ 图片必须放在这里
│   ├── screenshot_xxx.png
│   ├── image_result.jpg
│   └── ...
├── downloads/        ← 下载文件（不推荐用于发送）
└── temp/             ← 临时文件（不推荐用于发送）
```

---

## 🧪 验证测试

### 测试命令

```bash
# 1. 检查目录是否存在
ls -la ~/.openclaw/media/browser/

# 2. 创建测试图片（如果不存在）
echo "测试" > ~/.openclaw/media/browser/test.txt
# 或用Python生成简单图片
python3 -c "from PIL import Image; img = Image.new('RGB', (100, 100), color='red'); img.save('/home/gary/.openclaw/media/browser/test_image.png')"

# 3. 验证文件权限
ls -la ~/.openclaw/media/browser/test_image.png
```

---

## 💡 常见问题

### Q1: 图片发送后显示为文件而不是预览？
**原因**: 文件格式可能不被支持，或文件损坏
**解决**: 确认是标准图片格式（PNG/JPG/JPEG/GIF/WebP）

### Q2: 图片发送后对方收不到？
**原因**: 文件路径错误或文件不存在
**解决**: 
1. 检查文件是否真的在 `media/browser/` 目录
2. 使用 `ls -la` 确认文件存在且大小正常
3. 使用绝对路径 `/home/gary/.openclaw/media/browser/` 而不是 `~/.openclaw/`

### Q3: 中文文件名乱码？
**解决**: 使用英文文件名，如 `image_result.png` 而不是 `图片.png`

### Q4: 如何发送PDF文件？
**解决**: PDF不能直接用 `media` 参数，需要：
1. 上传到飞书云文档（使用 feishu-doc 技能）
2. 或转换为图片后发送

---

## 📚 相关文档

- `memory/signals/feishu-image-rules.md` - 历史验证记录
- `memory/2026-03-01.md` - 首次验证记录
- `AGENTS.md` - 飞书图片发送规则（简化版）

---

## ✅ 助手确认清单

请所有助手阅读本文档后确认：

- [ ] 搭子总管 (boss) - 已知晓
- [ ] 方案搭子 (planner) - 待确认
- [ ] 办公搭子 (office) - 待确认
- [ ] 公众号搭子 (writer) - 待确认
- [ ] 新闻搭子 (news) - 待确认
- [ ] 读书搭子 (reader) - 待确认
- [ ] 理财搭子 (finance) - 待确认
- [ ] 代码搭子 (coder) - 待确认

---

**最后更新**: 2026-03-11  
**记录人**: 搭子总管  
**重要性**: ⭐⭐⭐⭐⭐（发送图片时必须遵守）
