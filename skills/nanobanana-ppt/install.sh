#!/bin/bash
# NanoBanana PPT Skills 安装脚本

set -e

echo "==================================="
echo "NanoBanana PPT Skills 安装脚本"
echo "==================================="

# 检查Python版本
echo ""
echo "1. 检查Python版本..."
python3 --version || { echo "❌ Python3 未安装"; exit 1; }

# 创建虚拟环境
echo ""
echo "2. 创建虚拟环境..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ 虚拟环境创建成功"
else
    echo "✅ 虚拟环境已存在"
fi

# 激活虚拟环境
echo ""
echo "3. 激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo ""
echo "4. 安装依赖..."
pip install --upgrade pip
pip install google-genai pillow python-dotenv

# 检查.env文件
echo ""
echo "5. 检查环境配置..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️ 已创建.env文件，请编辑并填写您的API Key"
    fi
else
    echo "✅ .env文件已存在"
fi

# 运行测试
echo ""
echo "6. 运行安装测试..."
python test_install.py

echo ""
echo "==================================="
echo "安装完成！"
echo "==================================="
echo ""
echo "使用方法:"
echo "  source venv/bin/activate"
echo "  python test_install.py"
echo ""
