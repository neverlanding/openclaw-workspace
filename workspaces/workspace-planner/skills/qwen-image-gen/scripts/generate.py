#!/usr/bin/env python3
"""
阿里云百炼平台 Qwen-Image 图像生成API调用
使用异步任务模式（适合 qwen-image 系列模型）
"""

import requests
import json
import os
import sys
import time
from datetime import datetime

API_KEY = os.getenv("DASHSCOPE_API_KEY", "sk-c108db0165044c02904c451e968eb809")
ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis"

def generate_image(prompt, model="wanx2.1-t2i-plus", size="1024x1024"):
    """
    调用阿里云百炼图像生成API（异步模式）
    注意：qwen-image系列模型可能不支持此端点，使用 wanx2.1-t2i-plus
    """
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
        "X-DashScope-Async": "enable"
    }
    
    # 转换尺寸格式
    size_parts = size.split("x")
    if len(size_parts) == 2:
        size_formatted = f"{size_parts[0]}*{size_parts[1]}"
    else:
        size_formatted = size
    
    payload = {
        "model": model,
        "input": {
            "prompt": prompt
        },
        "parameters": {
            "size": size_formatted,
            "n": 1
        }
    }
    
    try:
        print(f"🎨 生成图像: {prompt[:50]}...")
        print(f"\n📡 提交异步任务...")
        print(f"   URL: {ENDPOINT}")
        print(f"   Model: {model}")
        print(f"   Size: {size_formatted}")
        
        response = requests.post(ENDPOINT, headers=headers, json=payload, timeout=60)
        print(f"   Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   错误: {response.text[:500]}")
            return {"success": False, "error": response.text}
        
        result = response.json()
        task_id = result.get("output", {}).get("task_id")
        
        if not task_id:
            return {"success": False, "error": "未获取到任务ID"}
        
        print(f"   Task ID: {task_id}")
        
        # 轮询查询结果
        return query_task(task_id)
        
    except Exception as e:
        return {"success": False, "error": str(e)}

def query_task(task_id, max_retries=30, interval=2):
    """轮询查询任务结果"""
    
    query_url = f"https://dashscope.aliyuncs.com/api/v1/tasks/{task_id}"
    headers = {"Authorization": f"Bearer {API_KEY}"}
    
    print(f"\n⏳ 等待任务完成...")
    
    for i in range(max_retries):
        try:
            response = requests.get(query_url, headers=headers, timeout=30)
            result = response.json()
            
            status = result.get("output", {}).get("task_status", "")
            print(f"   轮询 {i+1}/{max_retries}: {status}")
            
            if status == "SUCCEEDED":
                print("\n✅ 图像生成成功!")
                return {"success": True, "data": result}
            elif status in ["FAILED", "CANCELLED"]:
                return {"success": False, "error": result.get("output", {}).get("message", "任务失败")}
            
            time.sleep(interval)
            
        except Exception as e:
            return {"success": False, "error": f"查询失败: {str(e)}"}
    
    return {"success": False, "error": "查询超时"}

def main():
    if len(sys.argv) < 2:
        print("用法: python generate.py '提示词' [模型] [尺寸]")
        print("示例: python generate.py '一只可爱的猫' wanx2.1-t2i-plus 1024x1024")
        print("")
        print("可用模型:")
        print("  - wanx2.1-t2i-plus (推荐，通义万相2.1)")
        print("  - wanx-v1 (通义万相基础版)")
        sys.exit(1)
    
    prompt = sys.argv[1]
    model = sys.argv[2] if len(sys.argv) > 2 else "wanx2.1-t2i-plus"
    size = sys.argv[3] if len(sys.argv) > 3 else "1024x1024"
    
    result = generate_image(prompt, model, size)
    
    if result["success"]:
        data = result["data"]
        print(json.dumps(data, indent=2, ensure_ascii=False))
        
        # 提取图片URL
        if "output" in data and "results" in data["output"]:
            for img in data["output"]["results"]:
                url = img.get("url", "")
                if url:
                    print(f"\n🖼️  图片URL: {url}")
    else:
        print(f"❌ 失败: {result['error']}")

if __name__ == "__main__":
    main()
