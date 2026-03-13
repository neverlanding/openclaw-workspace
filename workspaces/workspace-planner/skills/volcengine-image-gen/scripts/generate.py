#!/usr/bin/env python3
"""
火山引擎豆包图像生成API调用
使用API Key认证方式
"""

import requests
import json
import os
import sys
from datetime import datetime

# API配置 - 从环境变量或默认值读取
# 火山引擎API Key（从 https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey 获取）
API_KEY = os.getenv("VOLCENGINE_API_KEY", "14ece993-0349-4ee4-bddc-008d85e1445b")
# 兼容旧配置（AK/SK方式已弃用）
AK = os.getenv("VOLCENGINE_AK", "")
SK = os.getenv("VOLCENGINE_SK", "")
ENDPOINT = os.getenv("VOLCENGINE_ENDPOINT", "https://ark.cn-beijing.volces.com/api/v3/images/generations")

def generate_image(prompt, model="doubao-seedream-3.0-t2i", size="1024x1024", seed=-1):
    """
    调用火山引擎图像生成API
    
    参数:
        prompt: 图像描述提示词
        model: 模型ID 
        size: 图像尺寸
        seed: 随机种子
    
    返回:
        dict: 包含生成的图片URL或base64数据
    """
    
    # 火山引擎Ark API使用API Key认证
    # 优先使用 VOLCENGINE_API_KEY，如果没有则尝试使用 AK
    api_key = API_KEY if API_KEY else AK
    
    if not api_key:
        return {
            "success": False,
            "error": "未配置API Key，请在_meta.json中设置 VOLCENGINE_API_KEY",
            "timestamp": datetime.now().isoformat()
        }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    payload = {
        "model": model,
        "prompt": prompt
    }
    
    # 根据模型设置尺寸
    if size:
        payload["size"] = size
    
    if seed != -1:
        payload["seed"] = seed
    
    try:
        print(f"📡 正在调用API...")
        print(f"   URL: {ENDPOINT}")
        print(f"   Model: {model}")
        
        response = requests.post(
            ENDPOINT,
            headers=headers,
            json=payload,
            timeout=120
        )
        
        # 打印响应状态
        print(f"   Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   Response: {response.text[:500]}")
        
        response.raise_for_status()
        result = response.json()
        
        return {
            "success": True,
            "data": result,
            "timestamp": datetime.now().isoformat()
        }
        
    except requests.exceptions.HTTPError as e:
        error_msg = f"HTTP错误: {e}"
        if response.text:
            try:
                error_detail = response.json()
                error_msg += f"\n详情: {json.dumps(error_detail, ensure_ascii=False)}"
            except:
                error_msg += f"\n响应: {response.text[:200]}"
        return {
            "success": False,
            "error": error_msg,
            "timestamp": datetime.now().isoformat()
        }
        
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": f"请求错误: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }

def main():
    """命令行入口"""
    if len(sys.argv) < 2:
        print("用法: python generate.py '提示词' [模型] [尺寸]")
        print("示例: python generate.py '一只可爱的猫' doubao-seedream-3.0-t2i 1024x1024")
        print("")
        print("支持的模型:")
        print("  - doubao-seedream-3.0-t2i (推荐)")
        print("  - doubao-seedream-4.0")
        print("  - doubao-seedream-4.5")
        print("  - doubao-seedream-5.0-lite")
        sys.exit(1)
    
    prompt = sys.argv[1]
    model = sys.argv[2] if len(sys.argv) > 2 else "doubao-seedream-3.0-t2i"
    size = sys.argv[3] if len(sys.argv) > 3 else "1024x1024"
    
    print(f"🎨 正在生成图像...")
    print(f"提示词: {prompt}")
    print(f"模型: {model}")
    print(f"尺寸: {size}")
    print("-" * 40)
    
    result = generate_image(prompt, model, size)
    
    if result["success"]:
        print("✅ 图像生成成功!")
        print(json.dumps(result["data"], indent=2, ensure_ascii=False))
    else:
        print("❌ 图像生成失败:")
        print(result["error"])

if __name__ == "__main__":
    main()
