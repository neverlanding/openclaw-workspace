import sys
sys.path.insert(0, '/home/gary/.openclaw/workspace-boss/skills/nanobanana-ppt')

from dotenv import load_dotenv
load_dotenv('/home/gary/.openclaw/workspace-boss/skills/nanobanana-ppt/.env')

from nanobanana import PPTGenerator

# 初始化生成器
generator = PPTGenerator()

# 白板风格提示词
whiteboard_prompt = """
Create a single slide about Moore's Law with the following style:
- Real whiteboard photo background (slightly textured, realistic)
- Handwritten marker calligraphy style text (like written with a marker on whiteboard)
- Hand-drawn illustrations/sketches
- Use only 3 colors: Black, Blue, and Red markers
- The content should include:
  * Title: "摩尔定律 Moore's Law" in bold handwritten style
  * Key point: "每18-24个月，集成电路上可容纳的晶体管数量翻倍"
  * Visual: Simple sketch of microchip/transistors
  * Graph: Hand-drawn exponential growth curve
- Style: Authentic classroom whiteboard look, professional but handwritten
- Clean layout with good visual hierarchy
"""

# 生成 PPT
generator.create_ppt(
    topic=whiteboard_prompt,
    num_slides=1,
    output_dir="/home/gary/.openclaw/workspace-boss/output"
)

print("✅ PPT 生成完成")
