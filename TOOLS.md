# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## 🎨 Pollinations.ai 图片生成技能

**工作流程**：
1. 用户说"生成图片"或类似请求
2. **询问提示词**："你想要生成什么图片？请描述一下"
3. **优化提示词**：
   - 将用户的中文描述翻译成英文（Pollinations.ai对英文支持更好）
   - 适当添加风格描述词（如 "high quality, digital art, professional"等）
4. **生成链接**：
   ```
   https://image.pollinations.ai/prompt/{优化后的英文提示词}?width=1024&height=1024&nologo=true
   ```
5. **返回结果**：提供生成的图片链接给用户

**特点**：
- ✅ 完全免费，无需注册
- ✅ 无水印
- ✅ 支持自定义尺寸
- ✅ 即时生成

**示例**：
- 用户："一只在太空的猫"
- 优化："A cute cat floating in space, stars and galaxies background, digital art style, high quality"
- 链接：`https://image.pollinations.ai/prompt/A%20cute%20cat%20floating%20in%20space...`

---

## 📊 Node.js PPT生成方案

**使用工具**：`pptxgenjs` 库

**安装**：
```bash
npm install pptxgenjs
```

**使用方法**：
1. 创建JavaScript文件定义PPT内容
2. 运行 `node create_ppt.js` 生成
3. 输出生成 `.pptx` 文件

**示例代码模板**：
```javascript
const PptxGenJS = require("pptxgenjs");
const ppt = new PptxGenJS();

// 设置元数据
ppt.title = "标题";
ppt.author = "作者";

// 添加幻灯片
let slide = ppt.addSlide();
slide.background = { color: "667EEA" };
slide.addText("标题", { x: "10%", y: "20%", w: "80%", h: "20%", fontSize: 44, color: "FFFFFF" });
slide.addText("内容要点", { x: "10%", y: "45%", w: "80%", h: "40%", fontSize: 20, color: "FFFFFF" });

// 保存
ppt.writeFile({ fileName: "output.pptx" });
```

**优势**：
- ✅ 无需Python环境
- ✅ 无需API Key
- ✅ 完全免费
- ✅ 可自定义样式和布局
- ✅ 支持演讲者备注

**存放位置**：`/tmp/create_ppt.js` 或工作区

---

Add whatever helps you do your job. This is your cheat sheet.
