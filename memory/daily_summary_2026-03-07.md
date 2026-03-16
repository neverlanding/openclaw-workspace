# 今日工作总结 - 视频学习完整流程

**日期：** 2026-03-07  
**任务：** 学习B站视频并输出结构化报告

---

## 一、任务概述

**视频标题：** 《读OpenClaw源码，弄懂多Agent自动协作3关键配置(1)》  
**来源：** B站（BV1GqZUBvENu）  
**时长：** 6分钟  
**最终产出：** Markdown格式学习报告

---

## 二、完整工作流程

### 阶段1：获取视频
**步骤：**
1. 从今日头条获取视频链接
2. 由于今日头条限制，转向B站搜索相同视频
3. 找到B站视频：https://www.bilibili.com/video/BV1GqZUBvENu/

**工具使用：**
- `yt-dlp` - 下载视频/音频
- `browser` - 获取视频源URL（今日头条需要）

---

### 阶段2：提取音频
**优先级策略：**
1. **优先提取字幕**（速度快、准确率高）- 但B站只有弹幕，非字幕
2. **次选：下载音频转录** - 采用此方案

**操作步骤：**
```bash
# 下载B站视频音频（81k音质）
yt-dlp "https://www.bilibili.com/video/BV1GqZUBvENu/" \
  -f 30280 \
  -o "audio.%(ext)s" \
  --extract-audio \
  --audio-format mp3
```

**产出：** `/tmp/openclaw_multiaudio.mp3`（2.8MB，6分钟）

---

### 阶段3：音频转文本
**尝试方案（按优先级）：**

#### 方案1：Google Speech API ❌
- 结果：网络不可达（需要翻墙）
- 结论：放弃

#### 方案2：在线API（Gemini/Whisper）❌
- 结果：需要下载模型，网络受限
- 结论：放弃

#### 方案3：本地 faster-whisper ✅
- **使用办公助手预下载的模型**
- 模型位置：`/home/gary/.cache/huggingface/hub/models--Systran--faster-whisper-small/`
- 关键：设置 `local_files_only=True`，无需联网

**转录命令：**
```python
from faster_whisper import WhisperModel

model = WhisperModel(
    model_path, 
    device="cpu", 
    compute_type="int8", 
    local_files_only=True  # 关键！使用本地模型
)

segments, info = model.transcribe(
    "/tmp/openclaw_multiaudio.mp3", 
    language="zh", 
    beam_size=5
)
```

**关键设置：**
- **超时时间：** 30分钟（6分钟音频需要较长时间）
- **语言：** 中文（zh）
- **模型：** faster-whisper-small（本地预下载）

**产出：** `/tmp/transcription_openclaw.txt`（完整转录文本，2290字符）

---

### 阶段4：内容整理

#### 4.1 提取核心内容
**从转录文本中提取：**
- 3个Agent的工作流
- 3个痛点
- 3个关键配置方案
- 效果对比

#### 4.2 结构化输出
**使用Markdown格式：**
- 一级标题（#）- 文档主标题
- 二级标题（##）- 主要章节（一、二、三...）
- 三级标题（###）- 子章节（2.1, 3.1...）
- 四级标题（####）- 细分内容
- 表格 - 对比数据
- 列表 - 要点整理

#### 4.3 创建飞书文档
**遇到的问题：**
- 飞书API限制：无法创建真正的标题块（Heading2/3）
- 无法区分字体大小
- 只能写入纯文本

**解决方案：**
- 使用标准Markdown语法
- 飞书会自动识别并渲染格式
- 生成 `.md` 文件供导入

**最终产出：**
- Markdown文件：`openclaw_guide_formatted.md`
- 飞书文档链接：https://feishu.cn/docx/BvFRdTlZMoef8OxGiyIcx43inCe

---

## 三、关键经验教训

### 🎯 核心原则（重要！）

**优先级顺序（必须遵守）：**

| 优先级 | 方法 | 说明 | 适用场景 |
|:---|:---|:---|:---|
| **1. 提取字幕**（最高） | yt-dlp --write-subs | 速度快、准确率高、成本低 | 优先尝试 |
| **2. 本地模型转录** | faster-whisper | 无需联网、完全免费 | 字幕不可用时 |
| **3. 在线API转录** | Google/Gemini API | 需要API Key和网络 | 备选方案 |

**⚠️ 关键原则：先尝试提取字幕，字幕不可用时才使用模型转录！**

---

### ✅ 成功经验

| 经验 | 说明 |
|:---|:---|
| **字幕优先** | 应先尝试提取字幕，比转录快且准 |
| **本地模型** | faster-whisper本地模型无需联网，适合内网环境 |
| **超时设置** | 音频转录需设置足够超时（30分钟以上）|
| **Markdown** | 飞书对Markdown支持好，导入后格式正确 |

### ⏱️ 超时设置要点（关键！）

| 任务类型 | 建议超时 | 说明 |
|:---|:---|:---|
| 视频下载 | 5分钟 | 一般较快 |
| 字幕提取 | 标准设置 | 非常快 |
| **音频转录** | **音频时长×1.5** | 6分钟音频需30+分钟 |
| 文档生成 | 1分钟 | 较快 |

**重要提醒（办公助手经验）：**
- 转录时间 ≈ 音频时长（1:1比例）
- **超时 = 音频时长 × 1.5倍**（如15分钟音频设22分钟超时）
- 本地模型转录耗时较长，必须设置足够超时
- 优先使用字幕提取，避免长时间转录

---

### 📚 办公助手经验（重要补充）

**办公助手今天也完成了视频转录任务，分享关键经验：**

#### 1. 工具对比

| 工具 | 大小 | 速度 | 推荐度 |
|:---|:---|:---|:---|
| openai-whisper | 3GB+ | 慢 | ⭐⭐ |
| **faster-whisper** | ~500MB | **快4-8倍** | ⭐⭐⭐⭐⭐ |
| B站API | - | 快（有字幕时） | ⭐⭐⭐⭐ |

**结论**：faster-whisper 是最佳选择（今天已验证）

#### 2. 网络问题解决

**问题**：无法访问 HuggingFace 下载模型  
**解决**：使用国内镜像
```bash
export HF_ENDPOINT=https://hf-mirror.com
```

#### 3. 超时设置（办公助手建议）

| 音频时长 | 建议超时 | 实际耗时 |
|:---|:---|:---|
| 10分钟 | 15分钟 | 约10分钟 |
| 15分钟 | 22分钟 | 约15分钟 |
| 30分钟 | 45分钟 | 约30分钟 |

**比例**：转录时间 ≈ 音频时长（1:1）  
**建议**：超时 = 音频时长 × 1.5倍

#### 4. 模型选择

| 模型 | 大小 | 准确率 | 推荐 |
|:---|:---|:---|:---|
| tiny | 39MB | 一般 | 快速测试 |
| base | 74MB | 较好 | 平衡选择 |
| **small** | **466MB** | **好** | **⭐⭐⭐⭐⭐ 推荐** |
| medium | 1.5GB | 很好 | 高质量需求 |
| large | 3GB | 最好 | 专业需求 |

**办公助手今天使用 small 模型，15分钟音频约10分钟完成转录，准确率很高。**

#### 5. 完整流程脚本（办公助手提供）

```bash
#!/bin/bash
# 视频转录完整流程

VIDEO_URL="https://www.bilibili.com/video/BVxxxxx"
OUTPUT_DIR="/tmp"

# 1. 下载音频
cd ~/.agents/skills/video-transcript-downloader
./scripts/vtd.js audio --url "$VIDEO_URL" --output-dir "$OUTPUT_DIR"

# 2. 转录（Python脚本）
python3 << 'EOF'
from faster_whisper import WhisperModel
import os

# 使用国内镜像（如需下载模型）
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

print("加载模型...")
model = WhisperModel('small', device='cpu', compute_type='int8')

print("开始转录...")
audio_file = "/tmp/视频标题.mp3"

segments, info = model.transcribe(audio_file, language="zh", beam_size=5)

print(f"\n总时长: {info.duration:.2f}秒\n")

# 保存结果
with open("/tmp/transcript.txt", "w", encoding="utf-8") as f:
    for segment in segments:
        line = f"[{segment.start:.2f}s - {segment.end:.2f}s] {segment.text}\n"
        f.write(line)
        print(line, end="")

print(f"\n✅ 完成！保存到: /tmp/transcript.txt")
EOF
```

---

### ⚠️ 问题与解决

| 问题 | 原因 | 解决方案 |
|:---|:---|:---|
| Google API失败 | 网络不可达 | 改用本地模型 |
| 模型下载失败 | 需联网下载 | 复用办公助手预下载的模型 |
| 转录超时 | 6分钟音频处理慢 | 设置30分钟超时 |
| 飞书格式问题 | API限制无法创建标题块 | 使用Markdown导入方式 |

---

## 四、核心技术点

### 4.1 视频学习流程（更新版）

```
视频URL 
    ↓
【步骤1】尝试提取字幕（优先！）
    ↓
    ├─ ✅ 成功 → 直接获取文本（快）
    │
    └─ ❌ 失败 → 【步骤2】下载音频
                  ↓
            【步骤3】本地模型转录
                  ↓
            （设置超时≥1小时）
                  ↓
            获取文本（慢）
                  ↓
              整理要点
                  ↓
            Markdown格式
                  ↓
              飞书文档
```

**流程要点：**
1. **字幕优先**：先用 yt-dlp --write-subs 提取字幕
2. **音频备用**：字幕不可用时才下载音频转录
3. **超时设置**：转录任务必须设≥1小时超时

### 4.2 工具链（更新版）

| 环节 | 工具 | 说明 | 优先级 |
|:---|:---|:---|:---|
| **字幕提取** | yt-dlp --write-subs | 最快最准，优先使用 | ⭐⭐⭐⭐⭐ |
| 视频下载 | yt-dlp | 支持B站、YouTube等 | ⭐⭐⭐⭐ |
| **音频转录** | faster-whisper | 本地运行，需≥1小时超时 | ⭐⭐⭐ |
| 文档创建 | feishu-doc | API写入Markdown | ⭐⭐⭐⭐ |

**协作提醒：** 办公助手有相关技能和经验，处理前应优先咨询

---

## 五、与办公助手协作要点（待补充）

**咨询内容：**
1. 字幕提取的具体方法和技能
2. 视频转录的最佳实践
3. 工具和流程优化建议

**待更新：** 办公助手回复后补充此章节

---

## 六、明日改进方向

### 4.3 关键配置
- **超时设置：** 长任务必须设置足够超时时间
- **本地模型：** 内网环境优先使用预下载模型
- **格式选择：** Markdown是飞书最佳兼容格式

---

## 五、明日改进方向

1. **技能增强**
   - 学习飞书文档 block-level 操作（如果API支持）
   - 优化Markdown排版，更接近参考文档风格

2. **流程优化**
   - 字幕提取流程进一步完善
   - 建立本地模型库，避免重复下载

3. **知识积累**
   - 将本次经验写入 MEMORY.md
   - 同步给其他助手共享经验

---

**总结：** 今日成功完成视频学习全流程，从B站视频→音频→文本→结构化报告，积累了音频转录和文档排版经验。