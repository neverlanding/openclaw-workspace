#!/bin/bash
# 季度审查提醒脚本
# 用于提醒进行记忆系统季度审查

WORKSPACE="$HOME/.openclaw/workspace"
MEMORY_DIR="$WORKSPACE/memory"
REPORT_FILE="$MEMORY_DIR/projects/quarterly-review-$(date +%Y-Q%q).md"

# 获取当前季度
YEAR=$(date +%Y)
MONTH=$(date +%m)
if [ $MONTH -le 3 ]; then
    QUARTER=1
elif [ $MONTH -le 6 ]; then
    QUARTER=2
elif [ $MONTH -le 9 ]; then
    QUARTER=3
else
    QUARTER=4
fi

echo "=== 记忆系统季度审查提醒 ==="
echo "审查时间: $YEAR Q$QUARTER"
echo ""

# 检查需要验证的记忆
echo "📋 需要审查的项目:"
echo ""

# 1. 检查MEMORY.md中的待验证条目
echo "1. MEMORY.md 验证状态检查"
if grep -q "【待验证】" "$WORKSPACE/MEMORY.md" 2>/dev/null; then
    echo "   ⚠️ 发现待验证条目，请检查"
    grep -n "【待验证】" "$WORKSPACE/MEMORY.md"
else
    echo "   ✅ 无待验证条目"
fi
echo ""

# 2. 检查即将过期的记忆
echo "2. 有效期检查"
CURRENT_TIMESTAMP=$(date +%s)
THREE_MONTHS_AGO=$((CURRENT_TIMESTAMP - 7776000))  # 90天前

# 检查文件修改时间
find "$MEMORY_DIR" -name "*.md" -type f -mtime +90 2>/dev/null | while read file; do
    echo "   ⚠️ 文件超过90天未更新: $(basename $file)"
done
echo ""

# 3. 统计反馈记录
echo "3. 反馈统计"
FEEDBACK_COUNT=$(find "$MEMORY_DIR/feedback" -name "*.md" -type f 2>/dev/null | wc -l)
echo "   反馈记录数量: $FEEDBACK_COUNT"
echo ""

# 4. 生成审查报告
echo "4. 生成审查报告..."

cat > "$REPORT_FILE" << EOF
# 记忆系统季度审查报告

**审查时间**: $(date +%Y-%m-%d)  
**审查季度**: $YEAR Q$QUARTER  
**审查人**: AI助手

---

## 系统状态概览

### 记忆存储统计
- 反馈记录: $FEEDBACK_COUNT 条
- 验证记录: $(find "$MEMORY_DIR/verified" -name "*.md" -type f 2>/dev/null | wc -l) 条
- 信号捕获: $(find "$MEMORY_DIR/signals" -name "*.md" -type f 2>/dev/null | wc -l) 条

### 健康状况
- [ ] MEMORY.md 已更新
- [ ] 过期记忆已清理
- [ ] 验证状态已检查
- [ ] 反馈已回顾

## 审查发现

### 待处理问题

### 改进建议

### 成功经验

## 下季度计划

---

*报告生成时间: $(date)*
EOF

echo "   ✅ 报告已生成: $REPORT_FILE"
echo ""

echo "=== 审查提醒完成 ==="
echo "请查看报告并完成审查任务"
