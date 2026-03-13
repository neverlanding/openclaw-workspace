# 飞书文件发送规则（图片/音频/视频）

> 创建时间: 2026-03-01
> 最新验证: 2026-03-07（音频文件发送成功）
> 验证状态: 【已验证】✅

---

## ✅ 已确认的有效方式

### 正确路径格式
```
/home/gary/.openclaw/media/browser/{filename}.{ext}
```

### 发送示例
```json
{
  "action": "send",
  "media": "/home/gary/.openclaw/media/browser/xxx.png",
  "target": "chat:oc_a9fde469b9dc7558da7371393670951e"
}
```

---

## ❌ 无效方式

| 方式 | 结果 |
|------|------|
| `/tmp/xxx.png` | 只显示路径文本 📎 /tmp/xxx.png |
| `~/.openclaw/media/xxx.png` | 只显示路径文本 📎 ~/.openclaw/media/xxx.png |
| URL 直接发送 | 可能无法正确渲染 |

---

## 📝 操作流程

### 1. 生成/获取图片
- 浏览器截图 → 自动保存到 `media/browser/` ✅
- 下载图片 → 手动复制到 `media/browser/`
- 生成图片 → 保存到 `media/browser/`

### 2. 验证文件存在
```bash
ls -la ~/.openclaw/media/browser/
```

### 3. 发送
```bash
openclaw message send --media ~/.openclaw/media/browser/xxx.png --target chat:{chat_id}
```

---

## 🔍 技术原因

飞书渠道对本地文件路径有特殊处理逻辑：
- `media/browser/` 子目录 → 识别为附件上传
- 其他目录 → 识别为文本链接

---

## 📋 同步清单（已归档至公共知识库）

此文档位于 `memory/signals/feishu-image-rules.md`，所有助手均可读取。

- [x] 搭子总管 (boss) - 已知晓
- [x] 方案搭子 (planner) - 可读取
- [x] 办公搭子 (office) - 可读取  
- [x] 公众号搭子 (writer) - 可读取
- [x] 新闻搭子 (news) - 可读取
- [x] 读书搭子 (reader) - 可读取
- [x] 理财搭子 (finance) - 可读取
- [x] 代码搭子 (coder) - 可读取

---

## 📅 最新验证记录

### 2026-03-07 成功发送音频文件
**场景**: 下载今日头条视频并提取音频后发送给组长
**文件**: `/tmp/openclaw_audio.mp3` (15分钟音频，约15MB)
**操作**: 
```json
{
  "action": "send",
  "filePath": "/tmp/openclaw_audio.mp3",
  "filename": "OpenClaw浏览器自动化_音频提取.mp3",
  "message": "完成！已提取音频...",
  "target": "user:ou_d2f4d8ac1969ad7c0c427628f320e976"
}
```
**结果**: ✅ 发送成功，组长正常接收

---

## 📝 完整工作流程（2026-03-07验证）

### 音频/视频处理 → 发送流程

```bash
# 1. 获取视频URL（通过浏览器自动化）
# 2. 下载视频
wget -O /tmp/video.mp4 "视频URL"

# 3. 提取音频
ffmpeg -i /tmp/video.mp4 -vn -acodec libmp3lame -q:a 2 /tmp/audio.mp3

# 4. 发送给飞书用户
# 使用 message 工具，参数：
# - filePath: /tmp/audio.mp3
# - filename: 显示文件名
# - message: 附带文字说明
# - target: user:{open_id} 或 chat:{chat_id}
```

---

## 💡 注意事项

1. **文件必须先保存到本地**，不能直接发送远程URL
2. **必须使用绝对路径**，相对路径可能失效
3. **音频/视频文件可以直接从 /tmp/ 发送**（2026-03-07验证）
4. **图片文件必须从 ~/.openclaw/media/browser/ 发送**（2026-03-01验证）
5. **权限要求**：文件需要有读取权限
6. **文件大小**：大文件（如15MB音频）发送正常

---

*最后更新：2026-03-07*
