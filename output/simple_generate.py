import os
import google.generativeai as genai

os.environ['GEMINI_API_KEY'] = 'AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM'
genai.configure(api_key=os.environ['GEMINI_API_KEY'])

model = genai.GenerativeModel('gemini-2.0-flash-exp-image-generation')

response = model.generate_content(
    "Create a whiteboard presentation slide about Moore's Law. "
    "Style: Real whiteboard background, handwritten marker text in black/blue/red, "
    "hand-drawn microchip and exponential curve. "
    "Content: Title '摩尔定律 Moore's Law', key point '每18-24个月晶体管翻倍', "
    "formula '性能↑ 成本↓' in red. 16:9 slide format."
)

print(response.text)
