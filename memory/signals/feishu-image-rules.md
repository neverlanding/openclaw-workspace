# 飞书图片发送规则（重要）

> 创建时间: 2026-03-01
> 验证状态: 【已验证】✅

---

## ✅ 已确认的有效方式

### 正确路径格式
```
/home/gary/.openclaw/media/browser/{filename}.{ext}
```

### 发送示例
```json
{
  "action": "send",
  "media": "/home/gary/.openclaw/media/browser/xxx.png",
  "target": "chat:oc_a9fde469b9dc7558da7371393670951e"
}
```

---

## ❌ 无效方式

| 方式 | 结果 |
|------|------|
| `/tmp/xxx.png` | 只显示路径文本 📎 /tmp/xxx.png |
| `~/.openclaw/media/xxx.png` | 只显示路径文本 📎 ~/.openclaw/media/xxx.png |
| URL 直接发送 | 可能无法正确渲染 |

---

## 📝 操作流程

### 1. 生成/获取图片
- 浏览器截图 → 自动保存到 `media/browser/` ✅
- 下载图片 → 手动复制到 `media/browser/`
- 生成图片 → 保存到 `media/browser/`

### 2. 验证文件存在
```bash
ls -la ~/.openclaw/media/browser/
```

### 3. 发送
```bash
openclaw message send --media ~/.openclaw/media/browser/xxx.png --target chat:{chat_id}
```

---

## 🔍 技术原因

飞书渠道对本地文件路径有特殊处理逻辑：
- `media/browser/` 子目录 → 识别为附件上传
- 其他目录 → 识别为文本链接

---

## 📋 同步清单

- [x] 搭子总管 (boss) - 已知晓
- [ ] 方案搭子 (planner) - 待同步
- [ ] 办公搭子 (office) - 待同步
- [ ] 公众号搭子 (writer) - 待同步
- [ ] 新闻搭子 (news) - 待同步
- [ ] 读书搭子 (reader) - 待同步
- [ ] 理财搭子 (finance) - 待同步
- [ ] 代码搭子 (coder) - 待同步

---

## 💡 注意事项

1. **文件必须先保存到本地**，不能直接发送远程URL
2. **必须使用绝对路径**，相对路径可能失效
3. **目录必须存在**：`~/.openclaw/media/browser/`
4. **权限要求**：文件需要有读取权限

---

*最后更新：2026-03-01*
