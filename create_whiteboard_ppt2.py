import sys
import os

# 设置 API Key
os.environ['GEMINI_API_KEY'] = 'AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM'

# 使用 Pollinations.ai 直接生成图片
import urllib.request
import urllib.parse
import json

# 构建提示词
prompt = """Whiteboard style presentation slide about Moore's Law:
- Real whiteboard photo background with slight texture
- Handwritten marker calligraphy style text
- Black, Blue, Red marker colors only
- Content:
  * Title: "摩尔定律 Moore's Law" (large, bold handwritten)
  * Subtitle: "集成电路的指数增长" (blue marker)
  * Key point: "每18-24个月，晶体管数量翻倍" (black marker)
  * Formula: "性能↑ 成本↓" (red marker)
  * Hand-drawn microchip sketch
  * Hand-drawn exponential growth curve graph
- Authentic classroom whiteboard look
- Professional layout with visual hierarchy
- Clean handwriting style, marker strokes visible"""

# 使用 Pollinations.ai 生成
encoded_prompt = urllib.parse.quote(prompt)
image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1920&height=1080&seed=42&nologo=true"

print(f"生成图片 URL: {image_url}")
print("正在下载...")

# 下载图片
output_path = "/home/gary/.openclaw/workspace-boss/output/moores_law_whiteboard.png"
urllib.request.urlretrieve(image_url, output_path)

print(f"✅ 图片已保存: {output_path}")
