# 视频学习流程 - 完整技能与工具清单

**整理时间：** 2026-03-07  
**整理人：** 搭子总管 + 办公助手

---

## 一、技能清单（Skills）

| 序号 | 技能名称 | 用途 | 位置 | 优先级 |
|:---|:---|:---|:---|:---|
| 1 | **video-transcript-downloader** | 下载视频/音频/字幕 | `~/.agents/skills/video-transcript-downloader/` | ⭐⭐⭐⭐⭐ |
| 2 | **faster-whisper**（本地模型） | 音频转录成文字 | Python包 + 本地模型缓存 | ⭐⭐⭐⭐⭐ |
| 3 | **feishu-doc** | 创建飞书文档 | OpenClaw内置 | ⭐⭐⭐⭐ |
| 4 | **summarize** | 文本/URL总结（备用） | `~/.openclaw/skills/summarize/` | ⭐⭐⭐ |

---

## 二、工具清单（Tools）

### 2.1 下载/字幕提取工具

| 工具 | 用途 | 安装方式 | 使用场景 | 优先级 |
|:---|:---|:---|:---|:---|
| **yt-dlp** | 下载视频/音频/字幕 | `pip install yt-dlp` | B站、YouTube等 | ⭐⭐⭐⭐⭐ |
| **ffmpeg** | 音频格式转换 | `apt install ffmpeg` | 格式不兼容时 | ⭐⭐⭐ |
| **B站API** | 获取官方字幕 | 在线API | B站视频有字幕时 | ⭐⭐⭐⭐ |

**yt-dlp 常用命令：**
```bash
# 下载音频
yt-dlp "URL" -f bestaudio -o "audio.%(ext)s" --extract-audio --audio-format mp3

# 提取字幕（优先！）
yt-dlp "URL" --write-subs --sub-langs zh-CN --skip-download

# B站特定格式（81k音质）
yt-dlp "URL" -f 30280 -o "audio.%(ext)s" --extract-audio --audio-format mp3
```

**B站API 获取字幕（办公助手推荐）：**
```bash
# 使用B站API获取官方字幕（如果视频有字幕）
# 需要先获取视频BV号，然后调用API
# 返回JSON格式字幕数据

# 示例流程：
# 1. 从URL中提取BV号
# 2. 调用B站字幕API
# 3. 解析返回的JSON获取字幕内容
```

### 2.2 转录工具

| 工具 | 类型 | 大小 | 速度 | 推荐度 |
|:---|:---|:---|:---|:---|
| **faster-whisper** | 本地模型 | ~500MB | 快4-8倍 | ⭐⭐⭐⭐⭐ |
| openai-whisper | 本地模型 | 3GB+ | 慢 | ⭐⭐ |
| Google Speech API | 在线API | - | 快 | ⭐⭐（需翻墙）|
| Gemini API | 在线API | - | 快 | ⭐⭐⭐（需Key）|

**faster-whisper 使用示例：**
```python
from faster_whisper import WhisperModel
import os

# 国内镜像（如需下载模型）
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# 加载模型
model = WhisperModel('small', device='cpu', compute_type='int8')

# 转录
segments, info = model.transcribe("audio.mp3", language="zh", beam_size=5)

# 输出
for segment in segments:
    print(f"[{segment.start:.2f}s] {segment.text}")
```

### 2.3 文档工具

| 工具 | 用途 | 说明 |
|:---|:---|:---|
| **feishu-doc** | 创建飞书文档 | OpenClaw内置skill |
| Markdown编辑器 | 编辑文档 | 任何文本编辑器 |

---

## 三、完整工作流程

```
视频URL
    ↓
【步骤1】尝试提取字幕（3种方法）
    ↓
    ├─ 方法A: yt-dlp --write-subs（最快）
    ├─ 方法B: B站API获取官方字幕（B站视频）
    │
    ├─ ✅ 任一方法成功 → 直接获取文本（最快）
    │
    └─ ❌ 都失败 → 【步骤2】下载音频（yt-dlp）
                  ↓
            【步骤3】音频转录（faster-whisper）
                  ↓
            （超时 = 音频时长 × 1.5）
                  ↓
            获取文本
                  ↓
            整理要点
                  ↓
            Markdown格式
                  ↓
            飞书文档（feishu-doc）
```

**字幕提取优先级：**
1. **yt-dlp --write-subs** - 通用方法，支持多平台
2. **B站API** - B站视频专用，获取官方字幕
3. **音频转录** - 最后手段，耗时较长

---

## 四、关键配置

### 4.1 超时设置

| 任务 | 建议超时 | 说明 |
|:---|:---|:---|
| 字幕提取 | 5分钟 | 非常快 |
| 视频下载 | 5-10分钟 | 取决于网速 |
| **音频转录** | **音频时长 × 1.5** | 6分钟音频→9分钟超时 |
| 文档创建 | 1分钟 | 很快 |

### 4.2 模型选择

| 模型 | 大小 | 准确率 | 适用场景 |
|:---|:---|:---|:---|
| tiny | 39MB | 一般 | 快速测试 |
| base | 74MB | 较好 | 资源受限 |
| **small** | **466MB** | **好** | **⭐⭐⭐⭐⭐ 推荐** |
| medium | 1.5GB | 很好 | 高质量需求 |
| large | 3GB | 最好 | 专业需求 |

### 4.3 网络配置

```bash
# 国内镜像（解决HuggingFace访问问题）
export HF_ENDPOINT=https://hf-mirror.com
```

---

## 五、待办公助手补充

- [ ] video-transcript-downloader 技能详细说明
- [ ] 其他字幕提取相关技能
- [ ] B站API获取字幕的方法
- [ ] 其他优化建议

---

**备注：** 此清单由搭子总管整理，办公助手补充后更新。