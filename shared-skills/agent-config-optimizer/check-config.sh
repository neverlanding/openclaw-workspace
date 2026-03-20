#!/bin/bash
# Agent配置文件优化检查脚本
# 用法: ./check-config.sh <助手名称>
# 示例: ./check-config.sh office

AGENT_NAME=$1

if [ -z "$AGENT_NAME" ]; then
    echo "❌ 错误: 请提供助手名称"
    echo "用法: ./check-config.sh <助手名称>"
    echo "示例: ./check-config.sh office"
    exit 1
fi

WORKSPACE_DIR="$HOME/.openclaw/workspace-$AGENT_NAME"

echo "========================================"
echo "📝 Agent配置文件检查"
echo "助手: $AGENT_NAME"
echo "目录: $WORKSPACE_DIR"
echo "========================================"
echo ""

# 检查目录是否存在
if [ ! -d "$WORKSPACE_DIR" ]; then
    echo "❌ 错误: 目录不存在 $WORKSPACE_DIR"
    exit 1
fi

# 检查文件是否存在
echo "📁 文件存在性检查:"
echo "----------------------------------------"

files=("IDENTITY.md" "SOUL.md" "AGENTS.md" "TOOLS.md" "HEARTBEAT.md" "USER.md" "MEMORY.md")
missing=0

for file in "${files[@]}"; do
    if [ -f "$WORKSPACE_DIR/$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (缺失)"
        missing=$((missing + 1))
    fi
done

echo ""

# 行数统计
echo "📊 行数统计:"
echo "----------------------------------------"
echo "文件                    实际行数    推荐范围    状态"
echo "----------------------------------------"

# 推荐行数范围
declare -A ranges
ranges=(
    ["IDENTITY.md"]="20-60"
    ["SOUL.md"]="100-200"
    ["AGENTS.md"]="100-250"
    ["TOOLS.md"]="50-100"
    ["HEARTBEAT.md"]="50-100"
    ["USER.md"]="50-150"
    ["MEMORY.md"]="<200"
)

for file in "${files[@]}"; do
    if [ -f "$WORKSPACE_DIR/$file" ]; then
        lines=$(wc -l < "$WORKSPACE_DIR/$file")
        range="${ranges[$file]}"
        
        # 检查是否在范围内
        status="✅"
        if [[ "$range" == *"-"* ]]; then
            min=$(echo "$range" | cut -d'-' -f1)
            max=$(echo "$range" | cut -d'-' -f2)
            if [ "$lines" -lt "$min" ] || [ "$lines" -gt "$max" ]; then
                status="⚠️"
            fi
        elif [[ "$range" == "<"* ]]; then
            limit=$(echo "$range" | tr -d '<')
            if [ "$lines" -ge "$limit" ]; then
                status="⚠️"
            fi
        fi
        
        printf "%-20s %6d      %-10s  %s\n" "$file" "$lines" "$range" "$status"
    else
        printf "%-20s %6s      %-10s  ❌\n" "$file" "N/A" "${ranges[$file]}"
    fi
done

echo ""

# 检查必须章节
echo "📋 必须章节检查:"
echo "----------------------------------------"

# 检查SOUL.md
if [ -f "$WORKSPACE_DIR/SOUL.md" ]; then
    echo "SOUL.md:"
    if grep -q "主动性原则" "$WORKSPACE_DIR/SOUL.md"; then
        echo "  ✅ 主动性原则"
    else
        echo "  ❌ 缺少: 主动性原则"
    fi
    
    if grep -q "客观性原则" "$WORKSPACE_DIR/SOUL.md"; then
        echo "  ✅ 客观性原则"
    else
        echo "  ❌ 缺少: 客观性原则"
    fi
else
    echo "SOUL.md: ❌ 文件不存在"
fi

echo ""

# 检查AGENTS.md
if [ -f "$WORKSPACE_DIR/AGENTS.md" ]; then
    echo "AGENTS.md:"
    if grep -q "量化判断标准" "$WORKSPACE_DIR/AGENTS.md"; then
        echo "  ✅ 量化判断标准"
    else
        echo "  ❌ 缺少: 量化判断标准"
    fi
    
    if grep -q "记忆检索规则" "$WORKSPACE_DIR/AGENTS.md"; then
        echo "  ✅ 记忆检索规则"
    else
        echo "  ❌ 缺少: 记忆检索规则"
    fi
else
    echo "AGENTS.md: ❌ 文件不存在"
fi

echo ""

# 检查版本号
echo "🔖 版本号检查:"
echo "----------------------------------------"

for file in "${files[@]}"; do
    if [ -f "$WORKSPACE_DIR/$file" ]; then
        version=$(grep -E "版本:|Version:" "$WORKSPACE_DIR/$file" | head -1)
        if [ -n "$version" ]; then
            echo "✅ $file: $version"
        else
            echo "⚠️  $file: 未找到版本号"
        fi
    fi
done

echo ""

# 总结
echo "========================================"
echo "📈 检查总结"
echo "========================================"

if [ $missing -eq 0 ]; then
    echo "✅ 所有配置文件都存在"
else
    echo "❌ 有 $missing 个配置文件缺失"
fi

echo ""
echo "下一步建议:"
echo "1. 检查行数是否在推荐范围内"
echo "2. 确保所有必须章节都已包含"
echo "3. 确认版本号格式统一"
echo "4. 运行自评计算总分"
echo ""
echo "详细优化指南: ~/.openclaw/skills/agent-config-optimizer/SKILL.md"
echo "========================================"
