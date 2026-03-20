## 📝 Markdown转PDF工作流程（2026-03-07）

**来源**: 办公搭子经验分享
**文档位置**: `memory/markdown-to-pdf-workflow.md`

**核心要点**:
- **目录要求**: 必须放在 `~/.openclaw/media/browser/`
- **文件名**: 使用英文避免乱码
- **发送参数**: 用 `media` 不是 `filePath`

**完整流程**:
```
Markdown → HTML(pandoc) → PDF(html-to-pdf) → browser目录 → 飞书发送
```

**常见错误**:
- ❌ 直接用其他目录的文件
- ❌ 中文文件名
- ❌ 用 filePath 参数

---

