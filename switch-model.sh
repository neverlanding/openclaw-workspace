#!/bin/bash

# 模型切换脚本 - 修复版
# 用法: ./switch-model.sh [模型名称]
# 支持: qwen(默认), kimi, glm

MODEL=${1:-qwen}

# 函数：执行 openclaw 命令（带超时）
run_openclaw() {
    timeout 10 openclaw "$@" 2>&1
    return ${PIPESTATUS[0]}
}

case "$MODEL" in
  qwen|qwen-portal|default)
    echo "切换到 Qwen Coder 模型..."
    output=$(run_openclaw session model qwen-portal/coder-model)
    echo "$output"
    ;;
  kimi|kimi-k2|kimi-coding)
    echo "切换到 Kimi K2.5 模型..."
    output=$(run_openclaw session model kimi-coding/k2p5)
    echo "$output"
    ;;
  glm|zai)
    echo "切换到 GLM 4.7 模型..."
    output=$(run_openclaw session model zai/glm-4.7)
    echo "$output"
    ;;
  status)
    echo "当前模型状态:"
    run_openclaw status
    ;;
  *)
    echo "用法: ./switch-model.sh [模型名称]"
    echo ""
    echo "支持的模型:"
    echo "  qwen    - Qwen Coder (默认)"
    echo "  kimi    - Kimi K2.5"
    echo "  glm     - GLM 4.7"
    echo "  status  - 查看当前状态"
    exit 1
    ;;
esac

# 检查是否成功
if [ $? -eq 124 ]; then
    echo "⚠️ 命令超时（10秒）。可能的解决方案："
    echo "   1. 关闭 openclaw-tui 进程后再试"
    echo "   2. 检查 openclaw-gateway 是否正常运行"
    exit 1
fi
