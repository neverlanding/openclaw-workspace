---
name: qwen-image-gen
version: 1.0.0
description: 通义千问(Qwen)图像生成API调用技能，支持文生图
---

# 通义千问图像生成

调用阿里云 DashScope 的通义万相图像生成API，根据文本描述生成图片。

## 支持模型

- `wanx-v1` - 通义万相文生图（默认）
- `wanx2.1-t2i-plus` - 通义万相2.1 Plus
- `wanx2.0-t2i` - 通义万相2.0

## 使用方法

### 命令行

```bash
# 基础用法
cd ~/.openclaw/workspace-planner/skills/qwen-image-gen
python3 scripts/generate.py "一只可爱的猫"

# 指定模型和尺寸
python3 scripts/generate.py "一只可爱的猫" wanx-v1 1024x1024
```

### 作为模块调用

```python
from scripts.generate import generate_image

result = generate_image(
    prompt="一只可爱的猫",
    model="wanx-v1",
    size="1024x1024"
)

if result["success"]:
    print(result["data"])
else:
    print(result["error"])
```

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| prompt | string | 必填 | 图像描述提示词 |
| model | string | wanx-v1 | 模型ID |
| size | string | 1024x1024 | 图片尺寸 |

## 支持尺寸

- `1024x1024` - 1:1 方形
- `1280x720` - 16:9 宽屏
- `720x1280` - 9:16 竖屏
- `864x1152` - 3:4 竖版
- `1152x864` - 4:3 横版

## 配置

在 `_meta.json` 中配置API密钥：

```json
{
  "env": {
    "DASHSCOPE_API_KEY": "你的API Key",
    "DASHSCOPE_ENDPOINT": "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis"
  }
}
```

## 获取 API Key

1. 访问阿里云 DashScope 控制台：https://dashscope.aliyun.com/
2. 注册/登录账号
3. 在「API Key 管理」页面创建 API Key
4. 将 API Key 填入 `_meta.json` 的 `DASHSCOPE_API_KEY` 字段

## 价格

- 按生成图片数量计费
- 具体价格参考阿里云官方定价

## 注意事项

1. 提示词建议不超过300个汉字或600个英文单词
2. 字数过多信息容易分散，模型可能忽略细节
