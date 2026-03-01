#!/usr/bin/env python3
"""
NanoBanana PPT Skills 安装测试脚本
"""
import os
import sys

def check_env():
    """检查环境变量"""
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ 错误: GEMINI_API_KEY 未设置")
        return False
    
    if api_key == 'your_gemini_api_key_here' or 'YOUR' in api_key.upper():
        print("⚠️ 警告: 请更新 .env 文件中的 GEMINI_API_KEY")
        return False
    
    print(f"✅ GEMINI_API_KEY 已配置: {api_key[:10]}...")
    return True

def check_dependencies():
    """检查依赖"""
    deps_ok = True
    
    try:
        import google.genai
        print("✅ google-genai 已安装")
    except ImportError:
        print("❌ google-genai 未安装: pip install google-genai")
        deps_ok = False
    
    try:
        import PIL
        print("✅ pillow 已安装")
    except ImportError:
        print("❌ pillow 未安装: pip install pillow")
        deps_ok = False
    
    try:
        import dotenv
        print("✅ python-dotenv 已安装")
    except ImportError:
        print("❌ python-dotenv 未安装: pip install python-dotenv")
        deps_ok = False
    
    return deps_ok

def test_api_connection():
    """测试API连接"""
    try:
        from google import genai
        import os
        from dotenv import load_dotenv
        
        load_dotenv()
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key:
            print("❌ API Key 未设置，跳过连接测试")
            return False
        
        client = genai.Client(api_key=api_key)
        
        # 简单测试
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents="Hello, this is a test."
        )
        
        print("✅ Google Gemini API 连接成功")
        return True
        
    except Exception as e:
        print(f"❌ API 连接测试失败: {e}")
        return False

def main():
    """主函数"""
    print("=" * 50)
    print("NanoBanana PPT Skills 安装测试")
    print("=" * 50)
    
    print("\n1. 检查依赖...")
    deps_ok = check_dependencies()
    
    print("\n2. 检查环境变量...")
    env_ok = check_env()
    
    print("\n3. 测试API连接...")
    api_ok = test_api_connection()
    
    print("\n" + "=" * 50)
    if deps_ok and env_ok and api_ok:
        print("✅ 所有测试通过！安装成功。")
        return 0
    else:
        print("⚠️ 部分测试未通过，请根据提示修复问题。")
        return 1

if __name__ == "__main__":
    sys.exit(main())
