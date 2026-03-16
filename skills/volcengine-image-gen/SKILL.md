---
name: volcengine-image-gen
version: 1.0.0
description: 火山引擎豆包图像生成API调用技能，支持文生图
---

# 火山引擎图像生成

调用火山引擎豆包大模型的图像生成API，根据文本描述生成图片。

## 支持模型

- `doubao-seedream-3.0-t2i` - 文生图（推荐）
- `doubao-seedream-4.0` - 高画质
- `doubao-seedream-4.5` - 更高画质
- `doubao-seedream-5.0-lite` - 最新轻量版

## 使用方法

### 命令行

```bash
# 基础用法
cd ~/.openclaw/workspace-boss/skills/volcengine-image-gen
python3 scripts/generate.py "一只可爱的猫"

# 指定模型和尺寸
python3 scripts/generate.py "一只可爱的猫" doubao-seedream-3.0-t2i 1024x1024
```

### 作为模块调用

```python
from scripts.generate import generate_image

result = generate_image(
    prompt="一只可爱的猫",
    model="doubao-seedream-3.0-t2i",
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
| model | string | doubao-seedream-3.0-t2i | 模型ID |
| size | string | 1024x1024 | 图片尺寸 |
| seed | int | -1 | 随机种子 |

## 支持尺寸

- `1024x1024` - 1:1 方形
- `1280x720` - 16:9 宽屏
- `720x1280` - 9:16 竖屏
- `864x1152` - 3:4 竖版
- `1152x864` - 4:3 横版

## 价格

- 0.2元/次
- 免费额度: 200次

## 配置

在 `_meta.json` 中配置API密钥：

```json
{
  "env": {
    "VOLCENGINE_AK": "你的AK",
    "VOLCENGINE_SK": "你的SK",
    "VOLCENGINE_ENDPOINT": "https://ark.cn-beijing.volces.com/api/v3/images/generations"
  }
}
```

## 注意事项

1. 提示词建议不超过300个汉字或600个英文单词
2. 字数过多信息容易分散，模型可能忽略细节
3. 相同的seed值会生成类似结果
