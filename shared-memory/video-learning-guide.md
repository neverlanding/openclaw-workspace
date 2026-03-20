# 视频学习完整工作指南 📹

**视频学习完整工作指南（公共记忆）**

| 属性 | 内容 |
|:---|:---|
| 文档类型 | 公共记忆（所有助手共享） |
| 创建时间 | 2026-03-10 |
| 更新时间 | 2026-03-19 |
| 整合者 | 搭子总管 |
| 贡献者 | 搭子总管、办公搭子、方案搭子 |
| 适用范围 | 所有8个Agent（搭子总管 + 8个搭子） |
| 版本 | v2.2（统一使用 faster-whisper，移除 FunASR） |
| 语音转文字模型 | faster-whisper-small（466MB，已安装） |

---

## 🎯 核心原则（优先级排序）

**必须遵守的优先级顺序：**

| 优先级 | 方法 | 速度 | 准确率 | 成本 | 说明 |
|:---|:---|:---|:---|:---|:---|
| 0 | B站自动生成字幕 | ⭐⭐⭐⭐⭐ | 高 | 免费 | 最快，B站AI已生成 |
| 1 | 提取官方字幕 | ⭐⭐⭐⭐⭐ | 高 | 免费 | yt-dlp或B站API |
| 2 | faster-whisper本地转录 | ⭐⭐⭐ | 中 | 免费 | 无需联网 |
| 3 | 在线API转录 | ⭐⭐ | 高 | 需Key | Google/Gemini等 |

> ⚠ **铁律：先尝试提取字幕，字幕不可用时才转录！**

---

## 📋 完整操作流程

### 标准流程（4步）

```
1. 获取视频链接/文件
    ↓
2. 提取/转录视频文本（音频→文字）
    ↓
3. 整理结构化内容（分段、摘要、要点）
    ↓
4. 生成学习成果（笔记、PPT、知识库条目）
```

### 详细步骤

```
视频URL
    ↓
【步骤0】B站视频？检查是否有自动生成字幕
    ├─ 播放器右下角"字幕"按钮
    └─ 开启后可提取
    ↓
【步骤1】尝试提取字幕（4种方法）
    ├─ 方法A: video-transcript-downloader（推荐）
    │   ./scripts/vtd.js transcript --url 'URL'
    ├─ 方法B: yt-dlp --write-subs --list-subs "URL"
    ├─ 方法C: yt-dlp --write-subs --sub-langs zh-CN --skip-download "URL"
    ├─ 方法D: summarize --youtube auto --extract-only "URL"（需API Key）
    │
    ├─ ✅ 任一成功 → 直接获取文本（快）→ 跳到步骤4
    └─ ❌ 都失败 → 【步骤2】下载音频
    ↓
yt-dlp -f 30280 -o "audio.%(ext)s" --extract-audio --audio-format mp3 "URL"
或 ./scripts/vtd.js audio --url 'URL' --output-dir ~/Downloads
    ↓
【步骤3】音频转录（推荐faster-whisper）
    ↓
Python脚本转录（见下方代码）
    ↓
⚠ 超时设置 = 音频时长 × 1.5倍
    ↓
【步骤4】整理要点（Markdown格式）
    ↓
【步骤5】生成文档
    ├─ PDF（html-to-pdf技能）
    └─ 飞书文档（feishu-doc技能）
```

---

## 🛠 技能清单（Skills）

| 序号 | 技能名称 | 用途 | 位置 | 优先级 |
|:---|:---|:---|:---|:---|
| 1 | video-transcript-downloader | 下载视频/音频/字幕 | ~/.agents/skills/video-transcript-downloader/ | ⭐⭐⭐⭐⭐ |
| 2 | faster-whisper（本地模型） | 音频转录成文字 | Python包 + 本地模型 | ⭐⭐⭐⭐⭐ |
| 3 | summarize | YouTube/网页视频摘要 | ~/.openclaw/skills/summarize/ | ⭐⭐⭐⭐ |
| 4 | feishu-doc | 创建飞书文档 | OpenClaw内置 | ⭐⭐⭐⭐ |
| 5 | html-to-pdf | Markdown转PDF | ~/.agents/skills/html-to-pdf/ | ⭐⭐⭐⭐ |
| 6 | video-to-audio | 视频转音频 | ~/.openclaw/workspace-office/skills/ | ⭐⭐⭐ |

---

## 🔧 工具清单（Tools）

### 1. 下载/字幕提取工具

#### video-transcript-downloader 技能使用（vtd.js 命令）

```bash
# 获取纯文本转录（推荐！无需下载）
./scripts/vtd.js transcript --url 'https://www.bilibili.com/video/xxx'

# 带时间戳的转录
./scripts/vtd.js transcript --url 'https://...' --timestamps

# 指定语言
./scripts/vtd.js transcript --url 'https://...' --lang zh

# 下载音频（推荐用于转录）
./scripts/vtd.js audio --url 'https://...' --output-dir ~/Downloads

# 下载视频
./scripts/vtd.js download --url 'https://...' --output-dir ~/Downloads

# 下载字幕
./scripts/vtd.js subs --url 'https://...' --output-dir ~/Downloads --lang zh

# 查看可用格式
./scripts/vtd.js formats --url 'https://...'
```

#### yt-dlp 常用命令

```bash
# 查看可用字幕
yt-dlp "URL" --list-subs

# 提取字幕（优先！）
yt-dlp "URL" --write-subs --sub-langs zh-CN --skip-download

# 下载最佳音频
yt-dlp -f bestaudio -o "%(title)s.%(ext)s" "https://..."

# B站特定格式下载音频（81k音质）
yt-dlp "URL" -f 30280 -o "audio.%(ext)s" --extract-audio --audio-format mp3

# 下载MP4视频
yt-dlp --remux-video mp4 -o "%(title)s.%(ext)s" "https://..."

# 解决网站限制
yt-dlp --cookies-from-browser chrome "URL"
```

#### summarize 技能（YouTube/网页视频）

```bash
# 视频摘要
summarize "https://youtu.be/xxx" --model google/gemini-3-flash-preview

# 提取完整转录（仅URL，无需下载）
summarize "https://youtu.be/xxx" --youtube auto --extract-only
```

### 2. 视频转音频工具（ffmpeg）

```bash
# 转为MP3（通用格式）
ffmpeg -i video.mp4 -vn -acodec libmp3lame -q:a 2 output.mp3

# 转为WAV（适合语音识别，16k采样率单声道）
ffmpeg -i video.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 output.wav

# 检查音频时长（关键验证步骤）
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 audio.mp3
```

### 3. 其他转录方案（备选）

如有API Key，可考虑：

**阿里云语音识别**
- 特点：
  - ✅ 云端API，速度较快
  - ⚠ 需要阿里云账号和AccessKey
  - 💰 按量计费（有免费额度）

```bash
# 需要配置环境变量
export ALIBABA_ACCESS_KEY_ID=your_key
export ALIBABA_ACCESS_KEY_SECRET=your_secret
python3 transcribe_audio.py
```

**Google Speech-to-Text**
- 特点：
  - ✅ 多语言支持好
  - ⚠ 需要科学上网
  - 💰 按量计费

```bash
python3 transcribe_google.py
```

---

## 📝 faster-whisper 标准代码

```python
from faster_whisper import WhisperModel
import os

# 国内镜像（解决HuggingFace访问问题）
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# 加载模型（small = 466MB，中文最佳平衡点）
model = WhisperModel('small', device='cpu', compute_type='int8')

# 转录
segments, info = model.transcribe("audio.mp3", language="zh", beam_size=5)

# 输出带时间戳的文本
with open("transcript.txt", "w", encoding="utf-8") as f:
    for segment in segments:
        line = f"[{segment.start:.2f}s - {segment.end:.2f}s]{segment.text}\n"
        f.write(line)
        print(line, end="")
    
    print(f"\n✅ 完成！语言: {info.language}, 概率: {info.language_probability:.2f}")
```

### 模型选择指南

| 模型 | 大小 | 准确率 | 适用场景 |
|:---|:---|:---|:---|
| tiny | 39MB | 一般 | 快速测试 |
| base | 74MB | 较好 | 资源受限 |
| small | 466MB | 好 | ⭐⭐⭐⭐⭐ 推荐，中文最佳 |
| medium | 1.5GB | 很好 | 高质量需求 |
| large | 3GB | 最好 | 专业需求 |

---

## ⚠ 关键注意事项

### 1. 超时设置（重要！）

**核心公式：** `超时时间 = 音频时长(分钟) × 1.5倍`

示例：10分钟音频 → 15分钟超时；60分钟音频 → 90分钟超时

| 音频时长 | 建议超时 | 实际耗时参考 |
|:---|:---|:---|
| 10分钟 | 15分钟 | 约10分钟 |
| 15分钟 | 22分钟 | 约15分钟 |
| 30分钟 | 45分钟 | 约30分钟 |
| 1小时 | 90分钟 | 约60分钟 |
| 2.7小时（162分钟） | 4小时 | 约3小时 |

> 注意：faster-whisper 转录时间 ≈ 音频时长（1:1比例），设置1.5倍保险。

### 2. 进度汇报要求

- 每30分钟主动汇报一次进度

**关键节点立即汇报：**
- ✅ 视频下载完成
- ✅ 音频提取完成
- ✅ 转录开始
- ✅ 转录完成
- ❌ 遇到错误

### 3. 完整性验证（2026-03-09新增规则）

转录完成后必须执行**三要素验证**：

- [ ] 视频时长（B站/YouTube页面显示）
- [ ] 音频时长（ffprobe检查）
- [ ] 转录覆盖率（文本字符数估算）

**通过标准：**
- ✅ 转录时长 ≥ 音频时长 × 95%
- ✅ 最后时间戳与音频时长误差 ≤ 10秒
- ✅ 文本内容无大量空白或异常中断

> ⚠ **未完成验证前，不得认为任务已完成！**

```bash
# 1. 获取音频总时长
ffprobe -i audio.mp3 -show_entries format=duration -v quiet -of csv="p=0"

# 2. 获取转录文本最后时间戳
grep -oE '\[[0-9]+\.[0-9]+s\]' transcript.txt | tail -1

# 3. 对比两者是否一致（误差应在10秒内）
```

### 4. 网络配置

```bash
# 国内镜像（必须设置，否则模型下载失败）
export HF_ENDPOINT=https://hf-mirror.com
```

### 5. 使用本地预下载模型

如果模型已预下载，设置 `local_files_only=True`：

```python
model = WhisperModel('small',
    device='cpu',
    compute_type='int8',
    local_files_only=True  # 使用本地模型，无需联网
)
```

---

## 📤 文档输出规范

### 标准交付物

1. **原文转录**：完整文本（txt/md格式）
2. **结构化摘要**：分段+小标题+要点
3. **学习笔记**：3000字要点总结
4. **知识库条目**：按主题分类归档
5. **可选**：PPT/Word总结（方案搭子负责）

### 文件命名规范

```
视频标题_转录.txt
视频标题_摘要.md
视频标题_笔记.md
日期_主题_视频学习总结.md
```

### 学习资料归档规范

```
knowledge_base/[分类]/
└── YYYY-MM-DD_视频主题/
    ├── 视频信息.md          # 元数据、链接、时长
    ├── 原始资料/            # 音频、字幕、原始文本
    │   ├── audio.mp3
    │   ├── subtitles.srt
    │   └── transcript_raw.txt
    └── 学习总结/            # 笔记、要点、心得
        ├── 学习笔记.md
        └── 学习笔记.pdf
```

### Markdown格式标准

```markdown
# 视频标题

**来源**: [视频链接]
**时长**: XX分钟
**整理时间**: YYYY-MM-DD
**整理者**: [助手名称]

---

## 一、核心要点

### 1.1 XXX
- 要点1
- 要点2

### 1.2 XXX
...

## 二、详细内容

### 2.1 XXX
...

## 三、时间戳对照

| 时间 | 内容 |
|:---|:---|
| [00:00s] | 开场 |
| [01:30s] | 第一部分... |
| ... | ... |

## 四、总结
...
```

### 飞书文档发送规则

**文件存放位置（重要！）**

```
~/.openclaw/media/browser/     # 必须放在此目录
└── Your_Document.pdf          # 使用英文文件名
```

**发送参数：**
- ✅ 使用 `media` 参数
- ✅ 使用英文文件名（避免乱码）
- ❌ 不要用 `filePath` 参数
- ❌ 不要直接发送其他目录的文件

---

## ❌ 常见问题 & 解决方案

| 问题 | 原因 | 解决方案 |
|:---|:---|:---|
| Google API失败 | 网络不可达 | 改用 faster-whisper 本地模型 |
| 模型下载失败 | HuggingFace被墙 | 设置 HF_ENDPOINT 国内镜像 |
| 转录超时 | 处理时间长 | 超时设为音频时长×1.5 |
| B站下载失败 | 格式不对 | 加 -f 30280 参数 |
| 只转录了一半 | 未验证完整性 | 检查最后时间戳是否匹配音频时长 |
| 飞书发送失败 | 目录不对 | 放到 ~/.openclaw/media/browser/ |
| 中文文件名乱码 | 编码问题 | 使用英文文件名 |

---

## 👥 团队协调规则

### 职责分工

| 助手 | 视频学习职责 |
|:---|:---|
| 办公搭子 | 主负责视频学习、知识库收集 |
| 方案搭子 | 制作学习总结PPT/文档 |
| 搭子总管 | 协调任务、审核成果 |
| 新闻搭子 | 监控视频来源、热点追踪 |
| 其他搭子 | 按需参与特定领域视频学习 |

### 知识库同步

- 学习成果需**双写**：个人记忆 + 公共记忆（本指南目录）
- 统一格式：Markdown，包含视频链接、主题、日期
- 分类归档：按领域（AI/科技/管理/其他）

### 推荐工作流

**场景1：YouTube视频学习**
1. 办公搭子使用 `summarize --youtube auto --extract-only` 获取转录
2. 整理结构化内容（分段、要点）
3. 方案搭子制作学习总结PPT/Word
4. 写入公共记忆，归入知识库

**场景2：本地视频/内网环境**
1. 使用 faster-whisper 本地转录
2. 设置超时 = 音频时长 × 1.5倍
3. 输出文本整理
4. 制作学习成果文档

### 技能文档位置

| 技能 | 位置 |
|:---|:---|
| video-transcript-downloader | ~/.agents/skills/video-transcript-downloader/SKILL.md |
| html-to-pdf | ~/.agents/skills/html-to-pdf/SKILL.md |
| summarize | ~/.openclaw/skills/summarize/SKILL.md |

### 记忆文件位置

| 文档 | 位置 |
|:---|:---|
| 本指南 | shared-memory/VIDEO_LEARNING_GUIDE.md |
| 原始工作流程 | memory/daily_summary_2026-03-07.md |
| 技能工具清单 | memory/video_workflow_skills_tools.md |
| Markdown转PDF技巧 | shared-memory/markdown-to-pdf-workflow.md |
| 方案搭子知识 | agent:planner:main 会话历史 |
| 办公搭子知识 | agent:office:main 会话历史 |

---

## 📋 快速检查清单

执行视频学习任务前，确认以下事项：

- [ ] 视频URL有效
- [ ] B站视频已检查是否有自动生成字幕
- [ ] 优先尝试字幕提取（yt-dlp --write-subs 或 vtd.js transcript）
- [ ] 字幕提取失败才下载音频
- [ ] 音频下载使用正确格式（-f 30280 for B站）
- [ ] 转录超时设置为音频时长×1.5倍
- [ ] 已设置 HF_ENDPOINT 国内镜像
- [ ] 使用 faster-whisper small 模型（466MB，已验证）
- [ ] 转录完成后验证三要素（视频/音频/转录时长）
- [ ] 整理为标准Markdown格式
- [ ] 按规范归档到知识库目录
- [ ] 输出到正确目录（飞书发送用 ~/.openclaw/media/browser/）

---

## 🎓 经验教训

### 已验证的最佳实践

- ✅ 统一使用 faster-whisper（比 openai-whisper 快4-8倍，中文效果优秀）
- ✅ 使用 simple 命令行执行，避免复杂脚本
- ✅ 设置足够超时（音频时长×1.5倍）
- ✅ 主动汇报进度（每30分钟一次）
- ✅ 优先提取字幕，避免不必要的转录
- ✅ 严格执行三要素验证（视频/音频/转录时长）

### 避免的坑

- ❌ 不要先尝试需API配置的工具（summarize需配KEY）
- ❌ 不要用脚本方式执行长任务（无输出反馈）
- ❌ 不要设置过短超时（会中断任务）

---

*版本: v2.2 | 更新: 2026-03-19*
*位置: shared-memory/VIDEO_LEARNING_GUIDE.md*
