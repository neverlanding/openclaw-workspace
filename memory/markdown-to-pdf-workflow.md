# Markdown 文件创建与飞书发送技巧

**来源**: 办公搭子经验分享
**时间**: 2026-03-07
**用途**: Markdown转PDF并发送到飞书

---

## 一、文件保存位置（重要）

```
~/clawd_docs/                    # Markdown 源文件
    └── OpenClaw_学习笔记.md

~/.openclaw/media/browser/       # PDF 输出（飞书发送用）
    └── OpenClaw_Learning_Notes.pdf
```

**关键**: 飞书发送文件必须用 `~/.openclaw/media/browser/` 目录

---

## 二、Markdown 转 PDF 流程

```bash
# 1. Markdown 转 HTML
pandoc input.md -o output.html

# 2. HTML 转 PDF（使用 html-to-pdf 技能）
node ~/.agents/skills/html-to-pdf/scripts/html-to-pdf.js \
  input.html output.pdf \
  --scale=0.9 --margin=15mm
```

---

## 三、飞书文件发送（关键技巧）

**正确方式**:
```bash
# 必须先复制到正确目录
cp ~/clawd_docs/file.pdf ~/.openclaw/media/browser/

# 使用 media 参数发送
message send \
  --media ~/.openclaw/media/browser/file.pdf \
  --filename "English_Name.pdf"  # 英文文件名避免乱码
```

**注意事项**:
- ✅ 文件必须在 `~/.openclaw/media/browser/` 目录
- ✅ 使用 `media` 参数（不是 filePath）
- ✅ 使用英文文件名（避免中文乱码）
- ❌ 不能直接用其他目录的文件

---

## 四、完整示例

```bash
# 1. 创建 Markdown
cat > ~/clawd_docs/note.md << 'EOF'
# 标题
## 二级标题
内容...
EOF

# 2. 转 PDF
cd ~/clawd_docs
pandoc note.md -o note.html
node ~/.agents/skills/html-to-pdf/scripts/html-to-pdf.js \
  note.html note.pdf

# 3. 复制到正确目录
cp note.pdf ~/.openclaw/media/browser/Note.pdf

# 4. 发送飞书
message send \
  --media ~/.openclaw/media/browser/Note.pdf \
  --filename "Note.pdf"
```

---

## 五、常见错误

| 错误 | 原因 | 解决 |
|------|------|------|
| 文件发送失败 | 目录不对 | 放到 `~/.openclaw/media/browser/` |
| 中文文件名乱码 | 编码问题 | 使用英文文件名 |
| PDF生成失败 | 中文支持 | 使用 html-to-pdf 技能 |

---

**重点**: Markdown → HTML → PDF → 正确目录 → 飞书发送

---

*最后更新: 2026-03-07*
