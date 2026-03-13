# 📹 视频学习完整工作指南（公共记忆）

**文档类型**: 公共记忆（所有助手共享）  
**创建时间**: 2026-03-10  
**更新时间**: 2026-03-11（简化模型选择：仅保留faster-whisper small）  
**整合者**: 搭子总管  
**贡献者**: 搭子总管、办公搭子、方案搭子、理财搭子、代码搭子  
**适用范围**: 所有8个Agent（搭子总管 + 8个搭子）  
**版本**: v2.5（简化模型选择，仅保留faster-whisper small）  
**语音转文字模型**: faster-whisper small（唯一推荐）  

---

## 🎯 核心原则（优先级排序）

**必须遵守的优先级顺序：**

| 优先级 | 方法 | 速度 | 准确率 | 成本 | 说明 |
|:---|:---|:---|:---|:---|:---|
| **0** | B站自动生成字幕 | ⭐⭐⭐⭐⭐ | 高 | 免费 | 最快，B站AI已生成 |
| **1** | 提取官方字幕 | ⭐⭐⭐⭐⭐ | 高 | 免费 | yt-dlp或B站API |
| **2** | faster-whisper本地转录 | ⭐⭐⭐ | 中 | 免费 | 无需联网 |
| **3** | 在线API转录 | ⭐⭐ | 高 | 需Key | Google/Gemini等 |

**⚠️ 铁律：先尝试提取字幕，字幕不可用时才转录！**

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
    │         ./scripts/vtd.js transcript --url 'URL'
    ├─ 方法B: yt-dlp --write-subs --list-subs "URL"
    ├─ 方法C: yt-dlp --write-subs --sub-langs zh-CN --skip-download "URL"
    ├─ 方法D: summarize --youtube auto --extract-only "URL"（需API Key）
    │
    ├─ ✅ 任一成功 → 直接获取文本（快）→ 跳到步骤4
    │
    └─ ❌ 都失败 → 【步骤2】下载音频
                      ↓
            yt-dlp -f 30280 -o "audio.%(ext)s" --extract-audio --audio-format mp3 "URL"
            或 ./scripts/vtd.js audio --url 'URL' --output-dir ~/Downloads
                      ↓
            【步骤3】音频转录（推荐faster-whisper）
                      ↓
            Python脚本转录（见下方代码）
                      ↓
            ⚠️ 超时设置 = 音频时长 × 1.5倍
                      ↓
    【步骤4】整理要点（Markdown格式）
                  ↓
    【步骤5】生成文档
                  ├─ PDF（html-to-pdf技能）
                  └─ 飞书文档（feishu-doc技能）
```

---

## 🛠️ 技能清单（Skills）

| 序号 | 技能名称 | 用途 | 位置 | 优先级 |
|:---|:---|:---|:---|:---|
| 1 | **video-transcript-downloader** | 下载视频/音频/字幕 | `~/.agents/skills/video-transcript-downloader/` | ⭐⭐⭐⭐⭐ |
| 2 | **faster-whisper**（本地模型） | 音频转录成文字 | Python包 + 本地模型 | ⭐⭐⭐⭐⭐ |
| 3 | **summarize** | YouTube/网页视频摘要 | `~/.openclaw/skills/summarize/` | ⭐⭐⭐⭐ |
| 4 | **feishu-doc** | 创建飞书文档 | OpenClaw内置 | ⭐⭐⭐⭐ |
| 5 | **html-to-pdf** | Markdown转PDF | `~/.agents/skills/html-to-pdf/` | ⭐⭐⭐⭐ |
| 6 | **video-to-audio** | 视频转音频 | `~/.openclaw/workspace-office/skills/` | ⭐⭐⭐ |

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

#### 阿里云语音识别
```bash
# 需要配置环境变量
export ALIBABA_ACCESS_KEY_ID=your_key
export ALIBABA_ACCESS_KEY_SECRET=your_secret

python3 transcribe_audio.py
```
**特点**:
- ✅ 云端API，速度较快
- ⚠️ 需要阿里云账号和AccessKey
- 💰 按量计费（有免费额度）

#### Google Speech-to-Text
```bash
python3 transcribe_google.py
```
**特点**:
- ✅ 多语言支持好
- ⚠️ 需要科学上网
- 💰 按量计费

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
        line = f"[{segment.start:.2f}s - {segment.end:.2f}s] {segment.text}\n"
        f.write(line)
        print(line, end="")

print(f"\n✅ 完成！语言: {info.language}, 概率: {info.language_probability:.2f}")
```

### 模型选择指南（2026-03-11更新）

**唯一推荐模型**：
| 场景 | 选择 |
|:---|:---|
| **所有情况** | **faster-whisper small** ⭐⭐⭐⭐⭐ |

**模型对比**（参考）：
| 模型 | 大小 | 准确率 | 速度 | 说明 |
|:---|:---|:---|:---|:---|
| tiny | 39MB | 一般 | 快 | 快速测试 |
| base | 74MB | 较好 | 较快 | 资源受限 |
| **faster-whisper small** | **466MB** | **好** | **⭐⭐⭐⭐⭐ 最快** | **⭐⭐⭐⭐⭐ 唯一推荐，中文最佳** |
| ~~openai-whisper small~~ | ~~462MB~~ | ~~好~~ | ~~较慢~~ | ~~已删除~~ |
| ~~medium~~ | ~~1.5GB~~ | ~~很好~~ | ~~慢~~ | ~~已删除~~ |
| large | 3GB | 最好 | 最慢 | 专业需求（需额外下载） |

**为什么只用 faster-whisper small？**
- ✅ 速度快4-8倍（比openai-whisper）
- ✅ 内存占用低（支持int8量化）
- ✅ 准确率足够（small模型中文效果最佳）
- ✅ 本地已预下载（466MB）
- ✅ 83分钟音频实测：61分钟完成（效率比 1:0.73）

**已安装的本地模型**（唯一）：
- faster-whisper small (466MB) - ⭐ 唯一推荐

---

## ⚠️ 关键注意事项

### 1. 超时设置（重要！）

**核心公式：**
```
超时时间 = 音频时长(分钟) × 1.5倍
```
*示例：10分钟音频 → 15分钟超时；60分钟音频 → 90分钟超时*

| 音频时长 | 建议超时 | 实际耗时参考 |
|:---|:---|:---|
| 10分钟 | 15分钟 | 约10分钟 |
| 15分钟 | 22分钟 | 约15分钟 |
| 30分钟 | 45分钟 | 约30分钟 |
| 1小时 | 90分钟 | 约60分钟 |
| 2.7小时（162分钟）| 4小时 | 约3小时 |

**注意**：faster-whisper 转录时间 ≈ 音频时长（1:1比例），设置1.5倍保险。

### 2. 进度汇报要求
- **每30分钟**主动汇报一次进度
- **关键节点**立即汇报：
  - ✅ 视频下载完成
  - ✅ 音频提取完成
  - ✅ 转录开始
  - ✅ 转录完成
  - ❌ 遇到错误

### 3. 完整性验证（2026-03-09新增规则）

**转录完成后必须执行三要素验证：**
- [ ] **视频时长**（B站/YouTube页面显示）
- [ ] **音频时长**（ffprobe检查）
- [ ] **转录覆盖率**（文本字符数估算）

```bash
# 1. 获取音频总时长
ffprobe -i audio.mp3 -show_entries format=duration -v quiet -of csv="p=0"

# 2. 获取转录文本最后时间戳
grep -oE '\[[0-9]+\.[0-9]+s\]' transcript.txt | tail -1

# 3. 对比两者是否一致（误差应在10秒内）
```

**通过标准：**
- ✅ 转录时长 ≥ 音频时长 × 95%
- ✅ 最后时间戳与音频时长误差 ≤ 10秒
- ✅ 文本内容无大量空白或异常中断

**⚠️ 未完成验证前，不得认为任务已完成！**

### 3. 网络配置

```bash
# 国内镜像（必须设置，否则模型下载失败）
export HF_ENDPOINT=https://hf-mirror.com
```

### 4. 使用本地预下载模型

如果模型已预下载，设置 `local_files_only=True`：

```python
model = WhisperModel(
    'small', 
    device='cpu', 
    compute_type='int8', 
    local_files_only=True  # 使用本地模型，无需联网
)
```

---

## 📤 文档输出规范

### 标准交付物（必须产出）- 2026-03-12更新

| 序号 | 交付物 | 格式 | 位置 | 说明 |
|:---|:---|:---|:---|:---|
| 1 | **视频信息** | .md | `视频信息.md` | 元数据、来源链接、时长 |
| 2 | **音频文件** | .m4a/.wav | `中间整理/audio.m4a` | **转录完成后删除** |
| 3 | **转录文本** | .txt | `中间整理/transcript.txt` | 带时间戳的完整转录（**保留**） |
| 4 | **学习笔记** | .md | `学习总结/学习笔记.md` | 结构化学习总结 |
| 5 | **PDF版本** | .pdf | `学习总结/学习笔记.pdf` | 用于飞书发送 |

**存储原则**:
- ✅ **视频不存**（只存链接在视频信息.md）
- ✅ **音频临时**（下载后转录，完成后删除）
- ✅ **转录文本保留**（中间整理目录）
- ✅ **学习总结归档**（学习总结目录）

**产出流程**:
```
视频学习完成
    ↓
1. 创建视频信息.md → 记录视频链接、标题、时长
2. 下载音频 → 中间整理/audio.m4a
3. faster-whisper转录 → 中间整理/transcript.txt
4. 删除音频文件（释放空间）
5. 整理学习笔记 → 学习总结/学习笔记.md
6. 生成PDF → 学习总结/学习笔记.pdf
```

### 文件命名规范（详细版）

**1. 目录命名**:
```
YYYY-MM-DD_视频主题关键词

示例:
✅ 2026-03-10_OpenClaw多Agent协作
✅ 2026-03-10_MultiAgent_Collaboration
❌ 2026.03.10 视频学习（不要用点，不要有空格）
```

**2. 文件命名**:
```
[文件名].[扩展名]

示例:
视频信息.md
audio.m4a
transcript.txt
学习笔记.md
学习笔记.pdf
```

**3. 飞书发送文件名（英文）**:
```
Learning_Notes_YYYYMMDD.pdf
Video_Summary_YYYYMMDD.pdf

示例: Learning_Notes_20260312.pdf
```

### 学习资料归档规范（2026-03-12更新）

**存储位置**: `~/.openclaw/学习材料/[助手名称]/[主题]/`

**完整目录结构**:
```
~/.openclaw/学习材料/
└── [助手名称]/                    # 如: 办公搭子/理财搭子/代码搭子
    └── [主题]/                    # 如: OpenClaw实战/量化交易
        └── 视频主题目录/           # 示例: 飞书玩虾大会/
            ├── 视频信息.md          # 视频链接、标题、时长
            ├── 中间整理/            # 音频+转录文本
            │   ├── audio.m4a        # 音频文件（**转录后删除**）
            │   └── transcript.txt   # 转录完整文本（**保留**）
            └── 学习总结/            # 最终交付物
                ├── 学习笔记.md      # 结构化学习笔记
                └── 学习笔记.pdf     # PDF版本
```

**命名规范**:
| 文件类型 | 命名格式 | 示例 | 说明 |
|:---|:---|:---|:---|
| 视频信息 | `视频信息.md` | 固定文件名 | 记录视频元数据 |
| 音频文件 | `audio.m4a/.wav` | 固定文件名 | 临时文件，转录后删除 |
| 转录文本 | `transcript.txt` | 固定文件名 | 保留，带时间戳 |
| 学习笔记 | `学习笔记.md` | 固定文件名 | 核心产出 |
| PDF输出 | `学习笔记.pdf` | 固定文件名 | 飞书发送用 |
| 目录名 | `视频主题` | `飞书玩虾大会` | 简洁明了 |

**分类建议**:
- `AI` - 人工智能、大模型、机器学习
- `Tech` - 技术、编程、开源项目
- `Biz` - 商业、管理、产品
- `Finance` - 金融、投资、理财
- `Other` - 其他无法分类的

**重要提醒**:
- ✅ **视频不存**（只存链接在视频信息.md）
- ✅ **音频临时**（下载后转录，完成后删除，节省空间）
- ✅ **转录文本保留**（中间整理目录）
- ✅ **学习总结归档**（学习总结目录）
- ✅ 学习总结必须双写：本地文件 + 飞书文档
- ✅ PDF生成后需复制到 `~/.openclaw/media/browser/` 才能发送
- ✅ 目录名使用中文或英文，避免特殊字符

### Markdown格式标准

```markdown
# 视频标题

**来源**: [视频链接](URL)  
**平台**: B站/YouTube/其他  
**时长**: XX分钟  
**处理时间**: YYYY-MM-DD  
**处理者**: [助手名称]  
**分类**: AI/Tech/Biz/Finance/Other

---

## 一、视频信息
- 作者: XXX
- 发布时间: YYYY-MM-DD
- 观看量: XXX
- 标签: #标签1 #标签2

## 二、核心要点（5-10条）

### 2.1 XXX
- 要点1
- 要点2

### 2.2 XXX
...

## 三、详细内容

### 3.1 第一部分：XXX（[00:00] - [05:30]）
...

### 3.2 第二部分：XXX（[05:30] - [12:00]）
...

## 四、关键引用
> "原文引用内容" —— [时间戳]

## 五、个人心得/实践建议
- 心得1
- 心得2

## 六、相关资源
- [链接1]
- [链接2]

## 七、后续行动
- [ ] 待办事项1
- [ ] 待办事项2
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
...

## 四、总结
...
```

### 飞书文档发送规则

**文件存放位置（重要！）**
```
~/.openclaw/media/browser/    # 必须放在此目录
    └── Your_Document.pdf     # 使用英文文件名
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
| B站下载失败 | 格式不对 | 加 `-f 30280` 参数 |
| 只转录了一半 | 未验证完整性 | 检查最后时间戳是否匹配音频时长 |
| 飞书发送失败 | 目录不对 | 放到 `~/.openclaw/media/browser/` |
| 中文文件名乱码 | 编码问题 | 使用英文文件名 |

---

## 👥 团队协调规则

### 职责分工
| 助手 | 视频学习职责 |
|------|-------------|
| **办公搭子** | 主负责视频学习、知识库收集 |
| **方案搭子** | 制作学习总结PPT/文档 |
| **搭子总管** | 协调任务、审核成果 |
| **新闻搭子** | 监控视频来源、热点追踪 |
| **其他搭子** | 按需参与特定领域视频学习 |

### 知识库同步
- 学习成果需双写：个人记忆 + 公共记忆（本指南目录）
- 统一格式：Markdown，包含视频链接、主题、日期
- 分类归档：按领域（AI/科技/管理/其他）

### 推荐工作流

#### 场景1：YouTube视频学习
```
1. 办公搭子使用 summarize --youtube auto --extract-only 获取转录
2. 整理结构化内容（分段、要点）
3. 方案搭子制作学习总结PPT/Word
4. 写入公共记忆，归入知识库
```

#### 场景2：本地视频/内网环境
```
1. 使用 faster-whisper 本地转录
2. 设置超时 = 音频时长 × 1.5倍
3. 输出文本整理
4. 制作学习成果文档
```

### 技能文档位置
- video-transcript-downloader: `~/.agents/skills/video-transcript-downloader/SKILL.md`
- html-to-pdf: `~/.agents/skills/html-to-pdf/SKILL.md`
- summarize: `~/.openclaw/skills/summarize/SKILL.md`

### 记忆文件位置
- 本指南: `memory/video-learning-guide.md`
- 原始工作流程: `memory/daily_summary_2026-03-07.md`
- 技能工具清单: `memory/video_workflow_skills_tools.md`
- Markdown转PDF技巧: `memory/markdown-to-pdf-workflow.md`
- 方案搭子知识: `agent:planner:main` 会话历史
- 办公搭子知识: `agent:office:main` 会话历史

---

## 📋 快速检查清单

执行视频学习任务前，确认以下事项：

```markdown
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
```

---

## 🎓 经验教训

### 已验证的最佳实践
✅ **统一使用 faster-whisper small**（速度最快，中文效果最佳，实测83分钟音频61分钟完成）
✅ 使用 simple 命令行执行，避免复杂脚本  
✅ 设置足够超时（音频时长×1.5倍）  
✅ 主动汇报进度（每30分钟一次）  
✅ 优先提取字幕，避免不必要的转录  
✅ 严格执行三要素验证（视频/音频/转录时长）

### 避免的坑
❌ 不要先尝试需API配置的工具（summarize需配KEY）  
❌ 不要用脚本方式执行长任务（无输出反馈）  
❌ 不要设置过短超时（会中断转录）  
❌ 不要等用户询问才汇报（要主动）  
❌ 不要跳过完整性验证（会出现转录不完整的情况）  
❌ 不要凭经验估算超时（要用公式计算）

### 2026-03-11 - 模型选择规则更新（组长指示）

**更新内容**:
- **默认模型**: faster-whisper small（速度最快，中文效果最佳）
- **备选模型**: openai-whisper small（多任务同时执行时使用）
- **关键差异**: faster-whisper 比 openai-whisper 快4-8倍，内存占用更低

**执行要求**: 所有助手必须遵守新的模型选择规则

### 2026-03-11 - 模型简化决策（组长审核）

**决策内容**:
- ✅ 保留: faster-whisper small (466MB)
- ❌ 删除: openai-whisper small (462MB)
- ❌ 删除: openai-whisper medium (1.5GB)

**原因**:
1. faster-whisper 比 openai-whisper 快4-8倍
2. 内存占用更低（支持int8量化）
3. small模型中文效果已足够好
4. 简化选择，避免助手混淆

**实测数据**:
- 83分钟音频 → 61分钟完成（效率比 1:0.73）

**执行要求**: 所有场景统一使用 faster-whisper small，不再区分默认/备选

### 2026-03-09 - 视频学习任务完整性检查

**问题**: 只转录了56%的内容就以为任务完成  
**原因**: 未检查音频时长与转录文本时长是否一致  
**解决**: 新增完整性验证步骤，转录后必须对比时长

### 2026-03-07 - 流程确立

**发现**: faster-whisper 比 openai-whisper 快4-8倍，体积小（500MB vs 3GB+）  
**结论**: 确立字幕优先、本地转录次之的优先级顺序

---

## ⏰ 定时汇报机制设计（2026-03-11）

**适用场景**: 长时视频学习任务（>30分钟音频）  
**汇报频率**: 每30分钟一次  
**自动清理**: 任务完成后自动删除定时任务

### 架构设计

```
视频学习任务开始
    ↓
创建监控脚本 + Cron任务（每30分钟）
    ↓
每次执行：
    ├─ 实际检查转录文件（数量、大小）
    ├─ 判断进度状态
    ├─ 生成真实汇报内容
    └─ 发送给组长
    ↓
完成后：
    └─ 自动删除Cron任务（自我清理）
```

### 监控脚本模板

**文件位置**: `/tmp/video_progress_monitor.py`

```python
#!/usr/bin/env python3
"""视频学习进度监控脚本 - 定时汇报机制"""
import os
import glob
import subprocess
from datetime import datetime

# ========== 配置区域 ==========
TASK_NAME = "视频学习任务名称"
TRANSCRIPT_DIR = "/tmp/transcription/"
TOTAL_PARTS = 3
TARGET_USER = "user:ou_d2f4d8ac1969ad7c0c427628f320e976"
# ===============================

def check_actual_progress():
    """实际检查转录进度 - 必须真实检查文件"""
    
    # 1. 检查目录是否存在
    if not os.path.exists(TRANSCRIPT_DIR):
        return {"status": "not_started", "completed": 0, 
                "message": "❌ 转录目录不存在"}
    
    # 2. 获取所有txt文件
    txt_files = glob.glob(os.path.join(TRANSCRIPT_DIR, "*.txt"))
    
    # 3. 验证每个文件的有效性（关键！避免空文件）
    valid_files = []
    for f in txt_files:
        size = os.path.getsize(f)
        if size > 100:  # 大于100字节才算有效
            valid_files.append(os.path.basename(f))
    
    completed = len(valid_files)
    
    # 4. 判断状态
    if completed >= TOTAL_PARTS:
        return {"status": "completed", "completed": completed, 
                "total": TOTAL_PARTS, "message": f"✅ 全部完成"}
    elif completed > 0:
        return {"status": "in_progress", "completed": completed,
                "total": TOTAL_PARTS, "message": f"⏳ 进行中 ({completed}/{TOTAL_PARTS})"}
    else:
        return {"status": "waiting", "completed": 0,
                "total": TOTAL_PARTS, "message": "⏳ 等待中"}

def generate_report(progress):
    """生成汇报内容 - 基于真实数据"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    report = f"""📊 视频学习进度汇报

📹 任务：{TASK_NAME}
🕐 检查时间：{now}
📊 进度：{progress['message']}
"""
    
    if progress['status'] == 'in_progress':
        remaining = TOTAL_PARTS - progress['completed']
        report += f"\n⏱️ 预计剩余：约 {remaining * 30} 分钟"
    
    return report

def send_report(report):
    """发送汇报给组长"""
    try:
        subprocess.run([
            "openclaw", "message", "send",
            "--to", TARGET_USER,
            "--channel", "feishu",
            "--message", report
        ], check=True, capture_output=True)
        return True
    except Exception as e:
        print(f"发送失败: {e}")
        return False

def remove_cron_job():
    """任务完成后删除定时任务"""
    try:
        result = subprocess.run(["crontab", "-l"], capture_output=True, text=True)
        lines = result.stdout.strip().split('\n')
        new_lines = [l for l in lines if 'video_progress_monitor.py' not in l]
        subprocess.run(["crontab", "-"], input='\n'.join(new_lines), text=True)
        
        # 发送完成通知
        send_report(f"✅ {TASK_NAME} 完成！定时监控已停止。")
    except Exception as e:
        print(f"删除定时任务失败: {e}")

def main():
    progress = check_actual_progress()
    report = generate_report(progress)
    send_report(report)
    
    if progress['status'] == 'completed':
        remove_cron_job()

if __name__ == "__main__":
    main()
```

### Cron配置

**创建定时任务**:
```bash
# 添加到crontab（每30分钟执行一次）
crontab -e

# 添加以下行
*/30 * * * * /usr/bin/python3 /tmp/video_progress_monitor.py >> /tmp/video_progress.log 2>&1
```

### 关键原则

| 原则 | 说明 |
|:---|:---|
| **实际检查** | 必须读取真实文件，不能编造数据 |
| **验证有效性** | 检查文件大小（>100字节才算有效） |
| **自我清理** | 完成后自动删除定时任务 |
| **诚实汇报** | 宁可说"无法检查"也不说"假数据" |

### 2026-03-11 - 定时任务进度汇报教训

**问题**: 未实际检查文件，编造"已完成2段"的虚假进度  
**后果**: 误导组长，失去信任  
**解决**: 
- 必须实际检查文件数量和大小
- 验证文件有效性（非空文件）
- 基于真实数据生成汇报

**黄金法则**: 没有检查就没有汇报，没有验证就没有数据。

---

## 📝 更新日志

| 日期 | 更新内容 | 更新者 |
|:---|:---|:---|
| 2026-03-12 | v2.6: **目录结构重大更新** - 删除"原始资料"目录，音频统一放"中间整理"，转录后删除音频；统一目录结构为：视频信息.md → 中间整理/（音频+转录文本）→ 学习总结/ | 办公搭子（组长指示） |
| 2026-03-11 | v2.5: 简化模型选择，删除openai-whisper，仅保留faster-whisper small作为唯一模型 | 代码搭子（组长审核） |
| 2026-03-11 | v2.4: 新增定时汇报机制设计（吸取之前教训，确保实际检查、诚实汇报、自动清理） | 搭子总管（组长指示） |
| 2026-03-11 | v2.3: 更新模型选择规则（默认faster-whisper small，多任务时可用openai-whisper备选） | 搭子总管（组长指示） |
| 2026-03-10 | v2.2: 新增详细归档存储规范（目录结构、命名规则、交付物清单） | 搭子总管 |
| 2026-03-10 | v2.1: 移除FunASR，统一使用faster-whisper；明确已安装模型信息 | 搭子总管 |
| 2026-03-10 | v2.0: 整合搭子总管、方案搭子、办公搭子的所有知识 | 搭子总管 |
| 2026-03-09 | 新增完整性验证规则 | 搭子总管 |
| 2026-03-07 | 确立视频学习基础工作流程 | 搭子总管+办公搭子 |

---

**⚠️ 重要提醒：所有助手进行视频学习任务时，必须参考本指南！**

如有新的经验或发现，请及时更新本文档。
