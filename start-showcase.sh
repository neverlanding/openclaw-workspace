#!/bin/bash
# 启动 8个搭子展示页 - 局域网+外网访问

echo "🚀 启动 8个搭子展示页服务..."
echo ""

# 获取本机IP
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo "📁 文件目录: ~/.openclaw/workspace-boss/output"
echo "🎯 目标文件: team-showcase.html"
echo ""

# 启动本地服务器
echo "🔧 步骤1: 启动本地 HTTP 服务器..."
cd ~/.openclaw/workspace-boss/output
python3 -m http.server 8080 &
SERVER_PID=$!
echo "   本地服务器 PID: $SERVER_PID"
sleep 3

# 检查本地服务器是否成功
if curl -s http://localhost:8080/team-showcase.html > /dev/null; then
    echo "   ✅ 本地服务器启动成功"
    echo ""
    echo "📱 访问链接："
    echo "   💻 本地:   http://localhost:8080/team-showcase.html"
    echo "   🌐 局域网: http://$LOCAL_IP:8080/team-showcase.html"
    echo ""
else
    echo "   ❌ 本地服务器启动失败"
    exit 1
fi

# 启动 ngrok
echo "🔧 步骤2: 启动 ngrok 外网隧道..."
export PATH="$HOME/.local/bin:$PATH"
ngrok http 8080 &
NGROK_PID=$!
echo "   ngrok PID: $NGROK_PID"
echo ""
echo "⏳ 等待 ngrok 启动 (约5秒)..."
sleep 6

# 获取外网链接
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['tunnels'][0]['public_url'] if d.get('tunnels') else '未获取')" 2>/dev/null)

if [ "$NGROK_URL" != "未获取" ] && [ ! -z "$NGROK_URL" ]; then
    echo "   ✅ ngrok 启动成功"
    echo ""
    echo "🌍 外网链接: $NGROK_URL/team-showcase.html"
    echo ""
    echo "═══════════════════════════════════════"
    echo "✅ 全部启动成功！"
    echo ""
    echo "📱 三个访问地址："
    echo "   💻 本地:   http://localhost:8080/team-showcase.html"
    echo "   🌐 局域网: http://$LOCAL_IP:8080/team-showcase.html"
    echo "   🔗 外网:   $NGROK_URL/team-showcase.html"
    echo ""
    echo "⚠️  注意: 外网链接有效期约2小时"
    echo "═══════════════════════════════════════"
else
    echo "   ⚠️ ngrok 外网链接获取失败，但局域网可用"
    echo ""
    echo "📱 可用访问地址："
    echo "   💻 本地:   http://localhost:8080/team-showcase.html"
    echo "   🌐 局域网: http://$LOCAL_IP:8080/team-showcase.html"
fi

echo ""
echo "🛑 停止服务: 按 Ctrl+C 或运行: pkill -f 'http.server|ngrok'"

# 保持脚本运行
wait