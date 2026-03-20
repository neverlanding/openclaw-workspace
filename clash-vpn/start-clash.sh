#!/bin/bash
# Clash Verge 启动脚本

cd /home/gary/.openclaw/workspace/clash-vpn

# 设置配置目录
export XDG_CONFIG_HOME="/home/gary/.openclaw/workspace/clash-vpn/.config"

# 启动Clash Verge
./clash-verge &
echo "Clash Verge 已启动"
echo "配置目录: $XDG_CONFIG_HOME/clash-verge"
echo "订阅文件: $XDG_CONFIG_HOME/clash-verge/config.yaml"
