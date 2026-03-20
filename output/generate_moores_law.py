import os
os.environ['GEMINI_API_KEY'] = 'AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM'

from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ['GEMINI_API_KEY'])

# 生成图片的提示词
prompt = """Create a whiteboard-style presentation slide about Moore's Law with:

STYLE REQUIREMENTS:
- Real whiteboard photo background with slight texture
- Handwritten marker calligraphy style text
- Hand-drawn illustrations and sketches
- Only use 3 colors: Black, Blue, and Red markers

CONTENT:
1. Title: "摩尔定律 Moore's Law" (large, bold, black handwritten style, top center)
2. Subtitle: "集成电路的指数增长" (blue marker, below title)
3. Key Point: "每18-24个月，晶体管数量翻倍" (black marker, left side)
4. Formula: "性能 ↑  成本 ↓" (red marker, emphasized)
5. Hand-drawn microchip sketch (black outline, left bottom)
6. Hand-drawn exponential growth curve graph (red curve, axes in black, right side)
7. Small signature: "Gordon Moore 1965" (gray, bottom right)

VISUAL STYLE:
- Authentic classroom whiteboard look
- Professional layout with clear visual hierarchy
- Marker strokes visible with natural variation
- Clean and readable handwriting
- 16:9 aspect ratio, presentation slide format"""

print("🎨 正在生成白板风格图片...")
print("这可能需要 10-20 秒...")

try:
    # 使用 Gemini 2.0 Flash Experimental 生成图片
    response = client.models.generate_content(
        model='gemini-2.0-flash-exp-image-generation',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=['Text', 'Image']
        )
    )
    
    # 保存生成的图片
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            image_data = part.inline_data.data
            filename = 'moores_law_whiteboard_gemini.png'
            with open(filename, 'wb') as f:
                f.write(image_data)
            print(f"✅ 图片已保存: {filename}")
            print(f"📁 位置: {os.path.abspath(filename)}")
        elif part.text is not None:
            print(f"📝 说明: {part.text}")
            
except Exception as e:
    print(f"❌ 错误: {e}")
    print("尝试备选方案...")
