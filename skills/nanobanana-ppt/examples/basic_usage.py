#!/usr/bin/env python3
"""
NanoBanana PPT Skills 使用示例
"""
import os
import sys
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

def example_basic_usage():
    """基本使用示例"""
    print("=" * 50)
    print("基本使用示例")
    print("=" * 50)
    
    code = '''
from google import genai
import os

# 初始化客户端
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

# 生成内容
response = client.models.generate_content(
    model="gemini-2.0-flash-exp",
    contents="生成一个关于人工智能的PPT大纲，包含5页"
)

print(response.text)
'''
    print(code)
    
    # 实际运行
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
        
        print("\n实际运行结果:")
        print("-" * 50)
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents="生成一个关于人工智能的PPT大纲，包含5页，每页包含标题和要点"
        )
        print(response.text)
        print("-" * 50)
        
    except Exception as e:
        print(f"运行失败: {e}")

def example_image_generation():
    """图片生成示例"""
    print("\n" + "=" * 50)
    print("图片生成示例")
    print("=" * 50)
    
    code = '''
from google import genai
import os

client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

# 生成图片
response = client.models.generate_content(
    model="gemini-2.0-flash-exp",
    contents="生成一张AI科技感的PPT封面图片"
)

# 保存图片
if response.candidates[0].content.parts[0].inline_data:
    image_data = response.candidates[0].content.parts[0].inline_data.data
    with open("cover.png", "wb") as f:
        f.write(image_data)
'''
    print(code)

def example_ppt_generation():
    """PPT生成示例"""
    print("\n" + "=" * 50)
    print("PPT生成示例")
    print("=" * 50)
    
    code = '''
# 完整的PPT生成流程
# 1. 生成大纲
# 2. 为每页生成内容
# 3. 生成配图
# 4. 组装成PPT文件

# 详细代码请参考官方文档
# https://github.com/op7418/NanoBanana-PPT-Skills
'''
    print(code)

def main():
    """主函数"""
    # 检查API Key
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key or 'your' in api_key.lower():
        print("⚠️ 请先在 .env 文件中配置有效的 GEMINI_API_KEY")
        sys.exit(1)
    
    example_basic_usage()
    example_image_generation()
    example_ppt_generation()
    
    print("\n" + "=" * 50)
    print("示例运行完成！")
    print("=" * 50)

if __name__ == "__main__":
    main()
