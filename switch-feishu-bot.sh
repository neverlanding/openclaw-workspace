#!/bin/bash

# 飞书机器人切换脚本
# 用法: ./switch-feishu-bot.sh [1|2|status]

BOT1_ID="cli_a90ed7d1f6389cd9"
BOT1_SECRET="kVi6SWUqA740dBv2cm6YTgtCzqkPS7yi"

BOT2_ID="cli_a92bd5e6d339dcd2"
BOT2_SECRET="uaWYfZK4P2ibdZcjER8jNbMLKF8VQw7h"

CONFIG_FILE="$HOME/.openclaw/openclaw.json"

# 获取当前机器人
get_current_bot() {
    grep -A2 '"feishu":' "$CONFIG_FILE" | grep '"appId":' | sed 's/.*"appId": "\(.*\)".*/\1/'
}

# 切换到指定机器人
switch_bot() {
    local bot_num=$1
    local app_id app_secret
    
    if [ "$bot_num" == "1" ]; then
        app_id="$BOT1_ID"
        app_secret="$BOT1_SECRET"
        echo "切换到 1号机器人..."
    else
        app_id="$BOT2_ID"
        app_secret="$BOT2_SECRET"
        echo "切换到 2号机器人..."
    fi
    
    # 更新配置
    sed -i "s/\"appId\": \".*\"/\"appId\": \"$app_id\"/" "$CONFIG_FILE"
    sed -i "s/\"appSecret\": \".*\"/\"appSecret\": \"$app_secret\"/" "$CONFIG_FILE"
    
    echo "配置已更新，重启 gateway..."
    openclaw gateway restart > /dev/null 2>&1 &
    
    sleep 3
    echo "✅ 已切换到 $bot_num 号机器人 ($app_id)"
    echo "请用对应飞书账号发送消息测试"
}

# 显示状态
show_status() {
    local current_id=$(get_current_bot)
    if [ "$current_id" == "$BOT1_ID" ]; then
        echo "当前: 1号机器人 ($BOT1_ID)"
    elif [ "$current_id" == "$BOT2_ID" ]; then
        echo "当前: 2号机器人 ($BOT2_ID)"
    else
        echo "当前: 未知机器人 ($current_id)"
    fi
}

# 自动切换（在1和2之间切换）
auto_switch() {
    local current_id=$(get_current_bot)
    if [ "$current_id" == "$BOT1_ID" ]; then
        switch_bot "2"
    else
        switch_bot "1"
    fi
}

# 主逻辑
case "${1:-auto}" in
    1)
        switch_bot "1"
        ;;
    2)
        switch_bot "2"
        ;;
    status)
        show_status
        ;;
    auto|*)
        auto_switch
        ;;
esac
