# MEMORY.md - 方案搭子记忆

> 版本: v1.0 | 更新: 2026-03-19

---

## 触发规则

### 助手演示

**触发词**：当用户说"助手演示"时

**动作**：
1. 启动 team-showcase.html 页面本地服务器
2. 发送访问链接给用户

**访问地址**：
- 本地：http://localhost:8080/team-showcase.html
- 局域网：http://10.232.20.72:8080/team-showcase.html

**页面内容**：8个搭子团队介绍幻灯片

**服务时长**：至少保证 **2小时** 持续访问时间

---

### 火山生图

**触发词**：当用户说"火山生图"时

**技能路径**：`~/.openclaw/workspace-planner/skills/volcengine-image-gen/`

**使用方法**：
```bash
cd ~/.openclaw/workspace-planner/skills/volcengine-image-gen
python3 scripts/generate.py "提示词" doubao-seedream-3-0-t2i-250415 1280x720
```

**配置信息**：
- API Key: `14ece993-0349-4ee4-bddc-008d85e1445b`
- 模型: `doubao-seedream-3-0-t2i-250415`
- 免费额度: 200张
- 价格: 0.2590元/张

---

## 经验速查

### 飞书发送图片正确方式

**关键要点**：
- ✅ **文件位置**：必须放在 `~/.openclaw/media/browser/`
- ✅ **发送参数**：用 `media`（不是 filePath）

**正确示例**：
```bash
# 1. 复制图片到正确目录
mkdir -p ~/.openclaw/media/browser/
cp /path/to/image.jpg ~/.openclaw/media/browser/

# 2. 发送
message({
  action: "send",
  media: "~/.openclaw/media/browser/image.jpg"
})
```

**错误做法**：
- ❌ 放在 `/tmp/` 目录
- ❌ 使用 filePath 参数

**来源**：公共记忆

---

## 演示资源

### 摩尔定律演示页面（5个）

**触发词**：当用户提到"摩尔定律演示"、"摩尔定律页面"时

**局域网访问地址**（10.232.20.72:8080）：

| 页面 | 风格 | 链接 |
|:---|:---|:---|
| 3D沉浸版 | Three.js炫酷效果 | http://10.232.20.72:8080/moore-law-3d.html |
| 赛博朋克风 | 霓虹灯效果 | http://10.232.20.72:8080/moore-law-cyberpunk.html |
| 极简风格 | 简洁大方 | http://10.232.20.72:8080/moore-law-minimal.html |
| 数据可视化 | 图表丰富 | http://10.232.20.72:8080/moore-law-dataviz.html |
| 电影叙事风 | 故事感强 | http://10.232.20.72:8080/moore-law-film.html |

**文件位置**：`~/.openclaw/workspace-planner/output/`

**操作方式**：鼠标点击底部按钮 / 键盘左右方向键 / 触摸左右滑动

**服务时长**：至少保证 **2小时** 持续访问时间
