# MEMORY.md - 方案搭子记忆

## 触发规则

### 助手演示
**触发词**：当用户说"助手演示"时
**动作**：
1. 启动 team-showcase.html 页面本地服务器
2. 发送访问链接给用户

**访问地址**：
- 本地：http://localhost:8080/team-showcase.html
- 局域网：http://192.168.253.128:8080/team-showcase.html

**页面内容**：8个搭子团队介绍幻灯片（搭子总管、方案搭子、办公搭子、公众号搭子、新闻搭子、读书搭子、理财搭子、代码搭子）

---

## 触发词：火山生图

**说明**：当用户说"火山生图"时，调用火山引擎即梦图像生成技能

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

## 飞书发送图片正确方式（2026-03-11 从公共记忆获取）

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

**错误做法**（避免）：
- ❌ 放在 `/tmp/` 目录
- ❌ 放在 `~/.openclaw/workspace-boss/output/`
- ❌ 使用 filePath 参数

**来源**：公共记忆 `memory/markdown-to-pdf-workflow.md`

---

## 其他记忆
（后续添加）
