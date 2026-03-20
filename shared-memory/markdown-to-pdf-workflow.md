# Markdown 文件创建与飞书发送技巧

**来源**: 办公搭子经验分享
**时间**: 2026-03-07
**更新时间**: 2026-03-19
**用途**: Markdown转PDF并发送到飞书

---

## 一、文件保存位置（重要）

```
~/clawd_docs/                           # Markdown 源文件
    └── OpenClaw_学习笔记.md

~/.openclaw/workspace-{助手名}/tmp/      # PDF 输出（飞书发送备用）
    └── OpenClaw_Learning_Notes.pdf
```

**关键**: 
- 默认直接发送PDF
- **如果从原位置发送失败**，复制到自己 workspace 的 tmp/ 目录再发

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

### 方式1：直接发送（首选）

```bash
# 直接尝试发送
message send \
  --media ~/clawd_docs/file.pdf \
  --filename "English_Name.pdf"
```

### 方式2：备用发送（失败时使用）

```bash
# 1. 复制到自己 workspace 的 tmp/
cp ~/clawd_docs/file.pdf ~/.openclaw/workspace-office/tmp/
# （办公搭子示例，其他助手换成自己的名字）

# 2. 从 tmp/ 发送
message send \
  --media ~/.openclaw/workspace-office/tmp/file.pdf \
  --filename "English_Name.pdf"
```

**注意事项**:
- ✅ 默认直接发送，失败时用自己的 workspace/tmp/
- ✅ 使用 `media` 参数（不是 filePath）
- ✅ 使用英文文件名（避免中文乱码）
- ❌ 不要用系统 `/tmp/`（重启会清理）

---

## 四、各助手的备用路径

| 助手 | 备用发送路径 |
|:---|:---|
| **搭子总管** (boss) | `~/.openclaw/workspace-boss/tmp/` |
| **方案搭子** (planner) | `~/.openclaw/workspace-planner/tmp/` |
| **办公搭子** (office) | `~/.openclaw/workspace-office/tmp/` |
| **写作搭子** (writer) | `~/.openclaw/workspace-writer/tmp/` |
| **信息搭子** (info) | `~/.openclaw/workspace-info/tmp/` |
| **读书搭子** (reader) | `~/.openclaw/workspace-reader/tmp/` |
| **生活搭子** (life) | `~/.openclaw/workspace-life/tmp/` |
| **技术搭子** (tech) | `~/.openclaw/workspace-tech/tmp/` |

---

## 五、完整示例

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

# 3. 直接尝试发送
message send \
  --media ~/clawd_docs/note.pdf \
  --filename "Note.pdf"

# 4. 如果失败，复制到 tmp/ 再发
cp note.pdf ~/.openclaw/workspace-office/tmp/Note.pdf
message send \
  --media ~/.openclaw/workspace-office/tmp/Note.pdf \
  --filename "Note.pdf"
```

---

## 六、常见错误

| 错误 | 原因 | 解决 |
|:---|:---|:---|
| 文件发送失败 | 路径问题 | 复制到自己 workspace/tmp/ 再试 |
| 中文文件名乱码 | 编码问题 | 使用英文文件名 |
| PDF生成失败 | 中文支持 | 使用 html-to-pdf 技能 |
| 文件丢失 | 放系统/tmp/ | 用 workspace/tmp/，重启不丢 |

---

**重点**: Markdown → HTML → PDF → 直接发送（失败时→workspace/tmp/）→ 飞书发送

---

*最后更新: 2026-03-19*