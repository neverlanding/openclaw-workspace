## 📹 视频学习工作流程（重要！所有助手必读）

**创建时间**：2026-03-07  
**适用场景**：从在线视频（B站、YouTube、今日头条等）快速学习新知识和技能  
**整理人**：搭子总管 + 办公助手协作

---

### 🎯 核心原则

**优先级顺序（必须遵守）：**

| 优先级 | 方法 | 说明 | 速度 |
|:---|:---|:---|:---|
| **0. B站自动生成字幕**（最高） | B站播放器设置开启 | 开启后使用 yt-dlp 提取，准确率高 | ⭐⭐⭐⭐⭐ 最快 |
| **1. 提取官方字幕** | yt-dlp --write-subs / B站API | 速度快、准确率高、成本低 | ⭐⭐⭐⭐⭐ 快 |
| **2. 本地模型转录** | faster-whisper | 无需联网、完全免费 | ⭐⭐⭐ 慢 |
| **3. 在线API转录** | Google/Gemini API | 需要API Key和网络 | ⭐⭐ 受限 |

**⚠️ 关键原则：先尝试提取字幕，字幕不可用时才使用模型转录！**

---

### 📋 完整流程

```
视频URL
    ↓
【步骤0】B站视频？→ 开启自动生成字幕（B站播放器设置）
    ↓
【步骤1】尝试提取字幕（3种方法）
    ↓
    ├─ 方法A: yt-dlp --write-subs（通用，最快）⭐
    ├─ 方法B: B站API获取官方字幕（B站专用）⭐
    ├─ 方法C: B站自动生成字幕（开启后提取）⭐⭐
    │
    ├─ ✅ 任一方法成功 → 直接获取文本（快）
    │
    └─ ❌ 都失败 → 【步骤2】下载音频（yt-dlp）
                  ↓
            【步骤3】音频转录（faster-whisper）
                  ↓
            （超时 = 音频时长 × 1.5）
                  ↓
            获取文本（慢）
                  ↓
              整理要点
                  ↓
            Markdown格式
                  ↓
              飞书文档
```

---

### 🎬 B站自动生成字幕（2026-03-07 新增）

**重要提示：** B站视频默认可能没有字幕，但UP主或B站系统可以**自动生成字幕**！

#### 如何开启/获取

**方式1：UP主开启**
- UP主在投稿时可选择"自动生成字幕"
- 开启后所有用户都能看到字幕按钮

**方式2：B站AI字幕**
- 部分视频B站会自动生成AI字幕
- 在播放器右下角"字幕"按钮查看

#### 提取方法（开启后）

一旦视频有自动生成字幕，用 yt-dlp 即可提取：

```bash
# 查看可用字幕
yt-dlp "https://b23.tv/xxx" --list-subs

# 提取自动字幕（通常是 ai-generated 或 auto 类型）
yt-dlp "https://b23.tv/xxx" --write-subs --sub-langs "zh-CN,ai-zh" --skip-download
```

#### 为什么重要

| 对比项 | 自动生成字幕 | faster-whisper转录 |
|:---|:---|:---|
| **速度** | 秒级提取 | 分钟级处理 |
| **准确率** | 高（B站官方AI） | 中等 |
| **成本** | 免费 | 免费但耗CPU |
| **适用** | B站有字幕的视频 | 无字幕的视频 |

**结论：B站视频务必先检查是否有自动生成字幕！** 可以省掉大量转录时间。

---

### 🛠️ 技能与工具清单

#### 技能（5个）

| 技能名称 | 用途 | 位置 | 优先级 |
|:---|:---|:---|:---|
| **video-transcript-downloader** | 下载视频/音频/字幕 | `~/.agents/skills/video-transcript-downloader/` | ⭐⭐⭐⭐⭐ |
| **faster-whisper** | 音频转录成文字 | Python包 + 本地模型 | ⭐⭐⭐⭐⭐ |
| **B站API** | 获取B站官方字幕 | 在线API | ⭐⭐⭐⭐ |
| **feishu-doc** | 创建飞书文档 | OpenClaw内置 | ⭐⭐⭐⭐ |
| **summarize** | 文本总结（备用） | `~/.openclaw/skills/summarize/` | ⭐⭐⭐ |

#### 工具（4类）

**1. 下载工具**
- **yt-dlp** - 下载视频/音频/字幕（`pip install yt-dlp`）
- **ffmpeg** - 音频格式转换（`apt install ffmpeg`）

**2. 字幕提取**
```bash
# 方法A: yt-dlp 提取字幕（通用）
yt-dlp "URL" --write-subs --sub-langs zh-CN --skip-download

# 方法B: 下载音频（字幕不可用时）
yt-dlp "URL" -f 30280 -o "audio.%(ext)s" --extract-audio --audio-format mp3
```

**3. 音频转录（faster-whisper）**
```python
from faster_whisper import WhisperModel
import os

# 国内镜像（解决网络问题）
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# 加载模型
model = WhisperModel('small', device='cpu', compute_type='int8')

# 转录
segments, info = model.transcribe("audio.mp3", language="zh", beam_size=5)

# 输出
for segment in segments:
    print(f"[{segment.start:.2f}s] {segment.text}")
```

**4. 文档工具**
- **feishu-doc** - 创建飞书文档
- **Markdown编辑器** - 任何文本编辑器

---

### ⏱️ 关键配置

#### 超时设置（重要！）

| 任务类型 | 建议超时 | 说明 |
|:---|:---|:---|
| 字幕提取 | 5分钟 | 非常快 |
| 视频下载 | 5-10分钟 | 取决于网速 |
| **音频转录** | **音频时长 × 1.5** | 如15分钟音频设22分钟超时 |
| 文档生成 | 1分钟 | 很快 |

**关键公式：超时 = 音频时长 × 1.5倍**

#### 模型选择

| 模型 | 大小 | 准确率 | 适用场景 |
|:---|:---|:---|:---|
| tiny | 39MB | 一般 | 快速测试 |
| base | 74MB | 较好 | 资源受限 |
| **small** | **466MB** | **好** | **⭐⭐⭐⭐⭐ 推荐，已验证** |
| medium | 1.5GB | 很好 | 高质量需求 |
| large | 3GB | 最好 | 专业需求 |

#### 网络配置

```bash
# 国内镜像（解决HuggingFace访问问题）
export HF_ENDPOINT=https://hf-mirror.com
```

---

### ✅ 成功经验（2026-03-07验证）

1. **字幕优先**：先用 yt-dlp --write-subs 或 B站API 提取字幕，比转录快10倍以上
2. **faster-whisper最佳**：比 openai-whisper 快4-8倍，体积小（500MB vs 3GB+）
3. **small模型最佳平衡点**：466MB，准确率好，速度可接受
4. **超时必须充足**：转录时间≈音频时长（1:1），设1.5倍保险
5. **Markdown飞书兼容好**：导入后格式正确，支持表格、列表等

---

### ⚠️ 常见问题

| 问题 | 原因 | 解决方案 |
|:---|:---|:---|
| Google API失败 | 网络不可达 | 改用 faster-whisper 本地模型 |
| 模型下载失败 | 需联网访问HuggingFace | 使用 hf-mirror.com 国内镜像 |
| 转录超时 | 处理时间长 | 设置超时 = 音频时长 × 1.5 |
| B站视频下载失败 | 需要特定格式 | 使用 `-f 30280` 参数（81k音质）|

---

### 📝 协作提醒

**使用本流程前：**
1. 优先咨询办公助手（有相关经验）
2. 检查本地是否有 faster-whisper 模型
3. 确认网络环境（是否需要国内镜像）

**相关文件位置：**
- 工作总结：`memory/daily_summary_2026-03-07.md`
- 技能清单：`memory/video_workflow_skills_tools.md`

---

*最后更新：2026-03-07*

---

