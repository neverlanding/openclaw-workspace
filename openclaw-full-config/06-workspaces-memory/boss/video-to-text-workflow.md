# 视频学习工作流程 - 从视频到文本

> 创建时间：2026-03-07
> 验证状态：✅ 已验证通过
> 适用场景：从在线视频（B站、YouTube、今日头条等）提取文字内容

---

## 📋 工作流程概览

```
视频URL → 下载音频 → 提取字幕（优先）→ 转录文本 → 整理要点
              ↓
        字幕不可用时 → 本地模型转录
```

---

## 🎯 核心原则（重要！）

### 优先级顺序（必须遵守）

| 优先级 | 方法 | 说明 |
|--------|------|------|
| **1. 提取字幕**（最高） | yt-dlp --write-subs | 速度快、准确率高、成本低 |
| **2. 本地模型转录** | faster-whisper | 无需联网、完全免费 |
| **3. 在线API转录** | Google/Gemini API | 需要API Key和网络 |

**⚠️ 关键原则：先尝试提取字幕，字幕不可用时才使用模型转录！**

---

## 🔧 详细操作步骤

### 步骤1：获取视频URL

**B站视频：**
```bash
# 格式：https://www.bilibili.com/video/BV{视频ID}/
示例：https://www.bilibili.com/video/BV1GqZUBvENu/
```

**YouTube视频：**
```bash
# 格式：https://www.youtube.com/watch?v={视频ID}
示例：https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**今日头条视频：**
- 需要通过浏览器获取视频源URL（不支持直接yt-dlp下载）

---

### 步骤2：检查并下载字幕（优先级1）

```bash
# 查看可用字幕
yt-dlp "视频URL" --list-subs

# 下载字幕（以B站为例）
yt-dlp "https://www.bilibili.com/video/BV1GqZUBvENu/" \
  --write-subs \
  --sub-langs zh-CN,en \
  --skip-download \
  -o "video_subs"
```

**支持的格式：**
- SRT（推荐，纯文本）
- VTT（网页字幕格式）
- ASS/SSA（高级字幕）

**B站特殊说明：**
- B站通常只有**弹幕**（danmaku），不是字幕
- 弹幕内容是观众评论，不是视频内容
- 如果只有弹幕，需要转向步骤3

---

### 步骤3：下载音频（字幕不可用时）

```bash
# 下载最佳音频格式
yt-dlp "视频URL" \
  -f bestaudio \
  -o "audio.%(ext)s" \
  --extract-audio \
  --audio-format mp3

# 或指定B站音频格式（80k音质）
yt-dlp "https://www.bilibili.com/video/BV1GqZUBvENu/" \
  -f 30280 \
  -o "audio.%(ext)s" \
  --extract-audio \
  --audio-format mp3
```

**B站音频格式代码：**
| 代码 | 格式 | 音质 |
|------|------|------|
| 30216 | m4a | 66k |
| 30232 | m4a | 66k |
| 30280 | m4a | 81k（推荐） |

---

### 步骤4：本地模型转录（优先级2）

**前提条件：**
- 本地已安装 faster-whisper
- 已有预下载的模型文件

**模型位置（办公助手已下载）：**
```
/home/gary/.cache/huggingface/hub/models--Systran--faster-whisper-small/
```

**转录脚本：**
```python
#!/usr/bin/env python3
from faster_whisper import WhisperModel

# 使用本地模型（无需联网）
model_path = "/home/gary/.cache/huggingface/hub/models--Systran--faster-whisper-small/snapshots/..."
model = WhisperModel(model_path, device="cpu", compute_type="int8", local_files_only=True)

# 转录音频
segments, info = model.transcribe("audio.mp3", language="zh", beam_size=5)

# 输出结果
for segment in segments:
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
```

**执行命令：**
```bash
cd /tmp
source asr_env/bin/activate
python3 transcribe.py
```

**超时设置：**
- 6分钟音频建议设置30分钟超时
- 15分钟音频建议设置1小时超时

---

## ⚠️ 常见问题与解决方案

### 问题1：yt-dlp 提示 "Unsupported URL"

**原因：** 今日头条等部分网站需要特殊处理

**解决方案：**
```bash
# 通过浏览器获取视频源URL
# 1. 使用 browser 工具打开视频页面
# 2. 执行 JavaScript 获取 video.src
# 3. 使用 wget/curl 下载视频源
```

### 问题2：B站视频需要登录

**原因：** 高画质视频需要B站会员

**解决方案：**
- 使用低画质音频格式（如30280，无需登录）
- 或提供B站cookies

### 问题3：转录模型下载失败

**原因：** 网络问题无法下载模型

**解决方案：**
- 使用本地已下载的模型（办公助手的缓存）
- 设置 `local_files_only=True`

### 问题4：转录超时

**原因：** 音频太长，模型处理需要时间

**解决方案：**
- 增加超时时间（30分钟或更长）
- 分段处理音频（切成2-3分钟小段）

---

## 📝 完整工作流示例

### 示例：B站视频学习流程

```bash
# 1. 检查字幕
yt-dlp "https://www.bilibili.com/video/BV1GqZUBvENu/" --list-subs

# 2. 如果有字幕，下载字幕
yt-dlp "URL" --write-subs --sub-langs zh-CN --skip-download

# 3. 如果没有字幕，下载音频
yt-dlp "URL" -f 30280 -o "audio.mp3" --extract-audio --audio-format mp3

# 4. 使用本地模型转录
cd /tmp
source asr_env/bin/activate
python3 transcribe_local.py

# 5. 整理要点
# 将转录文本整理为Markdown格式，保存到 memory/ 目录
```

---

## 🎓 经验教训

### ✅ 成功经验（2026-03-07验证）

| 经验 | 说明 |
|------|------|
| 字幕优先 | 本次B站视频只有弹幕无字幕，但此原则正确 |
| 本地模型 | faster-whisper本地模型成功转录6分钟音频 |
| 超时设置 | 30分钟超时设置成功，转录完成 |
| 模型复用 | 使用办公助手已下载的模型，无需重复下载 |

### ❌ 失败教训

| 问题 | 原因 | 解决 |
|------|------|------|
| Google Speech API失败 | 网络不可达 | 改用本地模型 |
| faster-whisper下载失败 | 需联网下载模型 | 使用本地已有模型 |
| 分段转录超时 | 6分钟音频转录耗时较长 | 设置30分钟超时 |

---

## 📁 相关文件位置

| 文件 | 路径 |
|------|------|
| 本地Whisper模型 | `/home/gary/.cache/huggingface/hub/models--Systran--faster-whisper-small/` |
| 转录脚本示例 | `/tmp/transcribe_local.py` |
| 音频文件（示例） | `/tmp/openclaw_multiaudio.mp3` |
| 本工作流文档 | `memory/video-to-text-workflow.md` |

---

## 🔗 相关技能

- **summarize** - 总结URL/文件内容
- **video-frames** - 提取视频帧
- **feishu-doc** - 飞书文档操作

---

*最后更新：2026-03-07*
