# 视频学习流程 - 完整技能清单

**来源**: 办公搭子经验分享
**时间**: 2026-03-07
**用途**: 视频转录/字幕提取/学习笔记整理

---

## 一、核心技能

| 技能 | 用途 | 位置 | 状态 |
|------|------|------|------|
| **video-transcript-downloader** | 下载视频/音频/字幕 | `~/.agents/skills/video-transcript-downloader/` | ✅ 已安装 |
| **faster-whisper** | 音频转录（Python包） | Python site-packages | ✅ 已安装 |
| **html-to-pdf** | Markdown转PDF | `~/.agents/skills/html-to-pdf/` | ✅ 已安装 |

---

## 二、依赖工具

| 工具 | 用途 | 状态 |
|------|------|------|
| **yt-dlp** | 下载视频（video-transcript-downloader依赖） | ✅ 已安装 |
| **ffmpeg** | 音频处理 | ✅ 已安装 |
| **Puppeteer/Chrome** | PDF生成（html-to-pdf依赖） | ✅ 已安装 |

---

## 三、模型

| 模型 | 用途 | 大小 | 位置 |
|------|------|------|------|
| **faster-whisper small** | 中文音频转录 | 466MB | `~/.cache/huggingface/hub/` |

---

## 四、关键技巧

### 1. faster-whisper 使用（推荐）

```python
from faster_whisper import WhisperModel

# 使用国内镜像下载模型（如需）
import os
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

model = WhisperModel('small', device='cpu', compute_type='int8')

segments, info = model.transcribe(
    "/tmp/audio.mp3",
    language="zh",
    beam_size=5
)

for segment in segments:
    print(f"[{segment.start:.2f}s] {segment.text}")
```

### 2. 网络问题解决

- **PyPI镜像**: `https://pypi.tuna.tsinghua.edu.cn/simple`
- **HuggingFace镜像**: `https://hf-mirror.com`

### 3. 转录时间参考

| 音频时长 | 转录时间 | 建议超时 |
|---------|---------|---------|
| 10分钟 | 约10分钟 | 30分钟 |
| 15分钟 | 约15分钟 | 45分钟 |

---

## 五、注意事项

1. **今日头条视频**: 链接有访问限制，需在B站找同款
2. **B站视频**: 可直接用 video-transcript-downloader 下载
3. **模型选择**: small模型（466MB）是最佳平衡点
4. **权限问题**: 办公搭子缺少飞书文档创建权限，需找搭子总管帮忙

---

## 六、完整工作流程

```
视频链接
    ↓
[video-transcript-downloader] → 下载音频
    ↓
[faster-whisper] → 转录成文字
    ↓
[Markdown整理] → 学习笔记
    ↓
[html-to-pdf] → 生成PDF
    ↓
[搭子总管帮忙] → 创建飞书文档
```

---

*最后更新: 2026-03-07*
