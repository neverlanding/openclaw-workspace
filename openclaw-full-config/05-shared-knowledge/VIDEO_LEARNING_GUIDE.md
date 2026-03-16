# 视频学习完整操作手册

**创建时间**: 2026-03-10  
**更新**: 2026-03-12（明确使用 faster-whisper）
**来源**: 办公助手经验 + 组长要求  
**适用对象**: 全体搭子

---

## 一、前期准备

### 1.1 获取视频信息
访问B站视频页面，记录：
- 视频BV号（如 BV1SZAZzzEw3）
- 视频时长（如 162.7分钟）
- 视频标题

### 1.2 计算超时时间
```bash
# 公式：视频时长(分钟) × 2
# 示例：162.7分钟 → 325.4分钟 → 5.5小时

# 转换为秒（用于 --timeout-seconds）
# 5.5小时 = 5.5 × 3600 = 19800秒
```

---

## 二、下载视频/音频

### 2.1 安装依赖（首次）
```bash
# 安装 yt-dlp
pip install yt-dlp

# 或更新
pip install -U yt-dlp
```

### 2.2 下载音频（推荐）
```bash
# 下载最佳质量音频
yt-dlp -f "bestaudio" -o "audio.%(ext)s" "https://www.bilibili.com/video/BV1SZAZzzEw3"
```

---

## 三、时长验证（关键！）

### 3.1 使用 ffprobe 检查音频时长
```bash
# 检查音频时长
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 audio.m4a

# 输出示例：9762.123456（秒）
# 转换为分钟：9762.12 / 60 = 162.7分钟 ✓
```

### 3.2 验证清单
- [ ] 视频时长（B站页面）
- [ ] 音频时长（ffprobe检查）
- [ ] 两者差异：____（应 < 5%）

---

## 四、音频转录（faster-whisper）

### ⚠️ 重要说明
**本地已安装 faster-whisper，直接使用，无需重新安装！**

### 4.1 faster-whisper 转录（推荐）

#### 本地已配置
- **工具**: faster-whisper（已安装）
- **模型**: small（约500MB，使用国内镜像 hf-mirror.com 下载）
- **优势**: 体积小、速度快、适合本地部署
- **对比**: openai-whisper 体积 3GB+，速度较慢

#### 转录命令
```bash
# 基本转录
faster-whisper audio.m4a --model small --language zh --output_format txt

# 生成带时间戳的字幕
faster-whisper audio.m4a --model small --language zh --output_format srt

# 输出到指定目录
faster-whisper audio.m4a --model small --language zh --output_dir ./transcription/
```

#### 模型下载（如需要）
```bash
# 设置国内镜像（已配置）
export HF_ENDPOINT=https://hf-mirror.com

# 首次使用会自动下载模型到 ~/.cache/huggingface/
```

### 4.2 长音频处理（超过30分钟）

对于超长音频（如傅盛对话 163分钟），建议：

```bash
# 方案1：直接转录（faster-whisper 可处理长音频）
faster-whisper audio.m4a --model small --language zh

# 方案2：分割后转录（如需）
ffmpeg -i audio.m4a -f segment -segment_time 1800 -c copy part_%03d.m4a
# 然后分别转录各片段，再合并文本
```

---

## 五、转录质量验证

### 5.1 字符数估算覆盖率
```bash
# 估算标准：中文约 200-250 字/分钟
# 162.7分钟视频 → 预计 32540-40675 字

# 统计转录文本字符数
wc -m transcript.txt

# 覆盖率 = 实际字符数 / 预计字符数 × 100%
# 要求：≥95%
```

### 5.2 抽样检查
- [ ] 开头5分钟内容完整
- [ ] 中间随机5分钟内容完整
- [ ] 结尾5分钟内容完整

---

## 六、学习总结

### 6.1 整理要点
```markdown
# 视频学习总结

**视频**: [标题](链接)
**时长**: XX分钟
**转录字数**: XXXX字

## 核心观点
1. 
2. 
3. 

## 关键金句
- 
- 

## 个人思考

```

### 6.2 存储规范
```
主题目录/
├── 视频信息.md          ← 视频基本信息
├── 中间整理/
│   ├── audio.m4a        ← 音频文件（转录后删除）
│   └── transcript.txt   ← 转录完整文本（保留）
└── 学习总结/
    └── 学习笔记.md      ← 学习笔记报告
```

---

## 七、进度汇报模板

### 7.1 初始汇报
```
组长，开始执行视频学习任务：
- 视频：[标题](BV号)
- 时长：XX分钟
- 预计完成时间：XX:XX
- 超时设置：XX秒
```

### 7.2 每30分钟汇报
```
进度更新：
- 当前阶段：[下载/转录/总结]
- 完成度：XX%
- 预计剩余时间：XX分钟
```

### 7.3 完成汇报
```
视频学习任务完成！
- 视频：[标题]
- 转录字数：XXXX字（覆盖率XX%）
- 总结文件：[路径]
- 核心要点：[1-3条]
```

---

## 八、常见问题

### Q1: faster-whisper 模型下载慢？
**解决**: 已配置国内镜像 hf-mirror.com，自动使用

### Q2: 长音频转录失败？
**解决**: faster-whisper 支持长音频，可直接处理；或分割为30分钟片段

### Q3: 转录准确率不高？
**解决**: 
- 确保音频质量清晰
- 中文内容使用 `--language zh`
- 专业术语可在转录后人工校对

### Q4: 下载的音频时长不对？
**解决**: 检查 yt-dlp 参数，使用 `-f "bestaudio"`

---

## 九、工具清单

| 工具 | 用途 | 安装命令 | 状态 |
|------|------|----------|------|
| yt-dlp | 下载视频/音频 | `pip install yt-dlp` | 需安装 |
| ffmpeg | 音频处理 | `sudo apt install ffmpeg` | 需安装 |
| ffprobe | 检测时长 | 随ffmpeg安装 | 需安装 |
| faster-whisper | **音频转录** | `pip install faster-whisper` | **✅ 已安装** |

---

## 十、核心规则（必须遵守）

### 1. 超时设置公式
```
超时时间 = 视频时长(分钟) × 2
```

### 2. 音频转录流程
```
下载音频 → faster-whisper转录 → 删除音频 → 保留转录文本 → 撰写学习总结
```

### 3. 存储原则
- **视频不存**（只存链接）
- **音频临时**（转录后删除）
- **转录文本保留**
- **学习总结归档**

---

**最后更新**: 2026-03-12（明确 faster-whisper 为唯一转录工具）  
**维护者**: 搭子团队
