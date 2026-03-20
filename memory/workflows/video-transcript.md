## 📚 视频转录工作流程（2026-03-07）

**来源**: 办公搭子经验分享
**文档位置**: `memory/video-transcript-workflow.md`

**核心技能**:
- `video-transcript-downloader` - 下载视频/音频/字幕
- `faster-whisper` - 音频转录（Python包）
- `html-to-pdf` - Markdown转PDF

**关键配置**:
- 模型: faster-whisper small（466MB，中文最佳）
- 镜像: HF_ENDPOINT=https://hf-mirror.com
- 转录时间: ≈音频时长（10分钟音频≈10分钟转录）

**完整流程**:
```
视频链接 → 下载音频 → 转录文字 → Markdown整理 → PDF生成 → 飞书文档
```

---

