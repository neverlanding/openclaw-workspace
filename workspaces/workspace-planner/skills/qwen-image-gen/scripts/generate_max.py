#!/usr/bin/env python3
"""
阿里云百炼平台 Qwen-Image-Max 最强图像生成API
使用 OpenAI 兼容模式
"""

import requests
import json
import os
import sys
from datetime import datetime

API_KEY = os.getenv("DASHSCOPE_API_KEY", "sk-c108db0165044c02904c451e968eb809")
# 使用新的 API v3 端点
ENDPOINT = "https://dashscope.aliyuncs.com/api/v3/images/generations"

def generate_image(prompt, model="qwen-image-max", size="1024x1024"):
    """
    调用阿里云百炼 Qwen-Image-Max 最强图像生成API
    """
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    # API v3 格式
    payload = {
        "model": model,
        "input": {
            "prompt": prompt
        },
        "parameters": {
            "size": size.replace("x", "*"),
            "n": 1
        }
    }
    
    try:
        print(f"🎨 调用阿里云最强模型: {model}")
        print(f"   Prompt: {prompt[:50]}...")
        print(f"   Size: {size}")
        print()
        
        response = requests.post(
            ENDPOINT,
            headers=headers,
            json=payload,
            timeout=120
        )
        
        print(f"   Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   错误: {response.text[:500]}")
            return {"success": False, "error": response.text}
        
        result = response.json()
        
        return {
            "success": True,
            "data": result,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}

def main():
    if len(sys.argv) < 2:
        print("用法: python generate.py '提示词' [模型] [尺寸]")
        print("示例: python generate.py '一只可爱的猫' qwen-image-max 1024x1024")
        print("")
        print("阿里云最强模型:")
        print("  - qwen-image-max (最高质量，0.5元/张) ⭐⭐⭐⭐⭐")
        print("  - qwen-image-2.0-pro (专业版，0.5元/张) ⭐⭐⭐⭐⭐")
        print("  - qwen-image-2.0 (加速版，0.2元/张) ⭐⭐⭐⭐")
        sys.exit(1)
    
    prompt = sys.argv[1]
    model = sys.argv[2] if len(sys.argv) > 2 else "qwen-image-max"
    size = sys.argv[3] if len(sys.argv) > 3 else "1024x1024"
    
    result = generate_image(prompt, model, size)
    
    if result["success"]:
        print("\n✅ 图像生成成功!")
        data = result["data"]
        print(json.dumps(data, indent=2, ensure_ascii=False))
        
        # 提取图片URL
        if "data" in data and len(data["data"]) > 0:
            url = data["data"][0].get("url", "")
            if url:
                print(f"\n🖼️  图片URL: {url}")
    else:
        print(f"\n❌ 失败: {result['error']}")

if __name__ == "__main__":
    main()
