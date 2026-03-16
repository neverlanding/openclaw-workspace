---
name: video-to-audio
description: 使用 ffmpeg 将视频文件转换为音频文件（MP3/WAV）。
homepage: https://ffmpeg.org
metadata:
  openclaw:
    emoji: 🎬
    requires:
      bins: ["ffmpeg"]
    install: []
---

# 视频转音频 (Video to Audio)

使用 ffmpeg 将视频文件转换为音频文件（MP3/WAV）。

## 前置要求

- **ffmpeg** 已安装

## 使用方法

### 1. 视频转 MP3
```bash
ffmpeg -i video.mp4 -vn -acodec libmp3lame -q:a 2 output.mp3
```

### 2. 视频转 WAV（适合语音识别）
```bash
ffmpeg -i video.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 output.wav
```

### 3. 提取特定时间段
```bash
# 从第5分钟开始，提取5分钟
ffmpeg -i video.mp4 -vn -ss 00:05:00 -t 300 -acodec libmp3lame output.mp3
```

### 4. 批量转换
```bash
for video in *.mp4 *.avi *.mkv; do
    [ -f "$video" ] && ffmpeg -i "$video" -vn -q:a 2 "${video%.*}.mp3"
done
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-i` | 输入文件 |
| `-vn` | 禁用视频（只保留音频） |
| `-acodec` | 音频编码器 |
| `-ar` | 采样率（16000用于语音识别） |
| `-ac` | 声道数（1=单声道，2=立体声） |
| `-q:a` | 音频质量（0-9，2=高质量） |
| `-ss` | 开始时间 |
| `-t` | 持续时间（秒） |

## 输出格式

- **MP3**: 通用格式，文件小
- **WAV**: 无损格式，音质好
- **M4A**: Apple 设备兼容
- **FLAC**: 无损压缩

## 使用脚本

```bash
# 使用技能脚本
python3 skills/video-to-audio/extract.py video.mp4 -o audio.mp3

# 批量处理
python3 skills/video-to-audio/extract.py *.mp4 -f wav
```
