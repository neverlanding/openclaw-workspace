import os
os.environ['GEMINI_API_KEY'] = 'AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM'

import google.generativeai as genai
genai.configure(api_key=os.environ['GEMINI_API_KEY'])

model = genai.GenerativeModel('gemini-2.0-flash-exp-image-generation')

prompt = """
Create a presentation slide about Moore's Law with this exact style:
- Whiteboard background texture
- Handwritten text using black, blue, and red markers
- Title: "摩尔定律 Moore's Law" in large black handwriting
- Subtitle: "集成电路的指数增长" in blue
- Key text: "每18-24个月，晶体管数量翻倍" in black
- Formula: "性能 ↑ 成本 ↓" in red
- Simple hand-drawn microchip sketch
- Exponential growth curve graph
- 1920x1080 presentation slide format
"""

print("正在生成图片，请稍等...")
response = model.generate_content(prompt)

# 尝试获取图片
if response.parts:
    for part in response.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            with open('moores_law_whiteboard.png', 'wb') as f:
                f.write(part.inline_data.data)
            print("✅ 图片生成成功: moores_law_whiteboard.png")
        else:
            print(part.text)
else:
    print(response.text)
