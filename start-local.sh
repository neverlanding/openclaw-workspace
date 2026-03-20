#!/bin/bash
# 简化版启动脚本 - 仅局域网（最稳定）

echo "🚀 启动 8个搭子展示页（局域网版）..."
echo ""

LOCAL_IP=$(hostname -I | awk '{print $1}')

echo "📁 文件: ~/.openclaw/workspace-boss/output/team-showcase.html"
echo ""

# 检查端口是否被占用
if lsof -Pi :8080 -sTCP:LISTEN -t > /dev/null 2>&1; then
    echo "⚠️ 端口 8080 已被占用，尝试关闭..."
    pkill -f "python3 -m http.server" 2>/dev/null
    sleep 1
fi

# 启动服务器
cd ~/.openclaw/workspace-boss/output
echo "🔧 启动 HTTP 服务器..."
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 3

# 测试访问
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/team-showcase.html | grep -q "200"; then
    echo ""
    echo "═══════════════════════════════════════"
    echo "✅ 启动成功！"
    echo ""
    echo "📱 访问地址："
    echo "   💻 本地:   http://localhost:8080/team-showcase.html"
    echo "   🌐 局域网: http://$LOCAL_IP:8080/team-showcase.html"
    echo ""
    echo "⚠️ 外网访问：当前网络限制，暂不支持 ngrok"
    echo "   建议：在同一WiFi下使用局域网链接访问"
    echo "═══════════════════════════════════════"
    echo ""
    echo "🛑 停止服务: pkill -f 'python3 -m http.server'"
    wait
else
    echo "❌ 启动失败"
    exit 1
fi