# NanoBanana PPT Skills

基于 AI 自动生成高质量 PPT 图片和视频的强大工具，支持智能转场和交互式播放。

## 功能特性

- 🤖 基于 Google Gemini AI 生成高质量 PPT 内容
- 🎨 自动生成精美的 PPT 图片
- 🎬 支持智能视频转场效果
- 📊 交互式播放支持
- 🔧 可灵AI API 集成（可选）

## 安装说明

### 1. 克隆项目

```bash
git clone https://github.com/op7418/NanoBanana-PPT-Skills.git
cd NanoBanana-PPT-Skills
```

### 2. 创建虚拟环境

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows
```

### 3. 安装依赖

```bash
pip install google-genai pillow python-dotenv
```

### 4. 配置环境变量

复制 `.env.example` 为 `.env` 并填写您的 API Key：

```bash
cp .env.example .env
# 编辑 .env 文件，填写您的 API Key
```

### 5. 环境变量说明

```env
# Google Gemini API Key (必需)
GEMINI_API_KEY=your_gemini_api_key_here

# 可灵AI API配置 (可选，用于视频转场功能)
# KLING_ACCESS_KEY=your_kling_access_key
# KLING_SECRET_KEY=your_kling_secret_key
```

## 使用方法

### 基本使用

```python
from nanobanana import PPTGenerator

# 初始化生成器
generator = PPTGenerator()

# 生成PPT
generator.create_ppt(
    topic="人工智能的发展",
    num_slides=10,
    output_dir="./output"
)
```

### 命令行使用

```bash
python -m nanobanana --topic "人工智能的发展" --slides 10 --output ./output
```

## 目录结构

```
nanobanana-ppt/
├── src/              # 源代码
├── examples/         # 示例文件
├── docs/             # 文档
├── output/           # 输出目录
├── temp/             # 临时文件
├── .env              # 环境配置
└── README.md         # 说明文档
```

## API Key 获取

### Google Gemini API Key

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录您的 Google 账号
3. 点击 "Create API Key"
4. 复制生成的 API Key

### 可灵AI API (可选)

1. 访问 [可灵AI官网](https://klingai.com/)
2. 注册并登录账号
3. 在开发者中心获取 Access Key 和 Secret Key

## 注意事项

- 请妥善保管您的 API Key，不要将其提交到公共代码仓库
- `.env` 文件已添加到 `.gitignore`，不会被提交
- 可灵AI API 是可选配置，用于增强视频转场功能

## 许可证

MIT License
