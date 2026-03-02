#!/bin/bash
# NanoBanana 修复启动脚本 - 修复版

cd ~/.openclaw/workspace-boss/skills/nanobanana-ppt

export PATH="$HOME/.local/bin:$PATH"
export GEMINI_API_KEY="AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM"

python3 << 'PYSCRIPT'
import sys
import os
sys.path.insert(0, 'src')

# 手动设置环境变量，避免 dotenv 问题
os.environ['GEMINI_API_KEY'] = 'AIzaSyALu1phcR4G8w5qD3SvTwKUUbryvqE62iM'

# 导入必要的模块
from google import genai
from google.genai import types

class PPTGenerator:
    """PPT生成器类"""
    
    def __init__(self, api_key=None):
        """初始化PPT生成器"""
        self.api_key = api_key or os.environ.get('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("需要提供 API Key")
        
        self.client = genai.Client(api_key=self.api_key)
        print(f"✅ PPTGenerator 初始化成功")
    
    def create_ppt(self, topic, num_slides=1, output_dir='./output'):
        """生成PPT"""
        print(f"📝 主题: {topic[:50]}...")
        print(f"📊 页数: {num_slides}")
        print(f"📁 输出: {output_dir}")
        
        # 使用 Gemini 生成图片
        try:
            response = self.client.models.generate_content(
                model='gemini-2.0-flash-exp-image-generation',
                contents=topic,
                config=types.GenerateContentConfig(
                    response_modalities=['Text', 'Image']
                )
            )
            
            # 保存图片
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    import pathlib
                    pathlib.Path(output_dir).mkdir(parents=True, exist_ok=True)
                    
                    filename = f"{output_dir}/nanobanana_moores_law.png"
                    with open(filename, 'wb') as f:
                        f.write(part.inline_data.data)
                    print(f"✅ 图片已保存: {filename}")
                    return filename
                elif hasattr(part, 'text') and part.text:
                    print(f"📝 说明: {part.text[:100]}...")
                    
        except Exception as e:
            print(f"❌ 生成失败: {e}")
            raise

print('🎨 正在生成摩尔定律白板风格PPT...')

try:
    generator = PPTGenerator()
    
    prompt = "Create a whiteboard presentation slide about Moore's Law. Real whiteboard background with texture. Handwritten marker text using black, blue, and red markers. Title '摩尔定律 Moore's Law' in large black handwriting. Key point '每18-24个月，晶体管数量翻倍' in black. Formula '性能↑ 成本↓' in red. Hand-drawn microchip sketch and exponential growth curve. Professional classroom whiteboard look, 1920x1080."
    
    result = generator.create_ppt(
        topic=prompt,
        num_slides=1,
        output_dir='../../output'
    )
    
    print('✅ PPT 生成完成！')
    
except Exception as e:
    print(f'❌ 错误: {e}')
    import traceback
    traceback.print_exc()
PYSCRIPT
