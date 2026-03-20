#!/bin/bash
# 创建 OpenClaw 配置部署包

set -e

PACKAGE_NAME="openclaw-config-package"
OUTPUT_DIR="${HOME}"
TEMP_DIR="/tmp/${PACKAGE_NAME}"

echo "=== 创建 OpenClaw 配置部署包 ==="
echo ""

# 清理临时目录
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"/config
mkdir -p "$TEMP_DIR"/workspace
mkdir -p "$TEMP_DIR"/scripts

# 1. 复制主配置
echo "📋 复制主配置..."
cp ~/.openclaw/openclaw.json "$TEMP_DIR"/config/ 2>/dev/null || echo "警告: openclaw.json 不存在"

# 2. 复制 Cron 配置
if [ -f ~/.openclaw/cron/jobs.json ]; then
    cp ~/.openclaw/cron/jobs.json "$TEMP_DIR"/config/
    echo "📅 复制 cron jobs"
fi

# 3. 复制所有 Workspace
echo "📁 复制 Workspaces..."
for ws in workspace-boss workspace-coder workspace-finance workspace-news workspace-office workspace-planner workspace-reader workspace-writer; do
    if [ -d ~/.openclaw/$ws ]; then
        cp -r ~/.openclaw/$ws "$TEMP_DIR"/workspace/
        echo "  ✓ $ws"
    fi
done

# 4. 复制脚本
cp ~/.openclaw/scripts/restore-config.sh "$TEMP_DIR"/scripts/ 2>/dev/null || true

# 5. 创建 README
cat > "$TEMP_DIR"/README.md << 'README_EOF'
# OpenClaw 完整配置包

## 使用方法

### 新环境部署
```bash
tar -xzf openclaw-config-package.tar.gz
cd openclaw-config-package
chmod +x scripts/*.sh
./scripts/install.sh
```

### 现有环境恢复
```bash
tar -xzf openclaw-config-package.tar.gz
cd openclaw-config-package
./scripts/restore.sh
```

## 包含内容
- 8个 Agent 完整配置（boss, coder, finance, news, office, planner, reader, writer）
- 头像、身份、人格配置
- 主配置文件
- Skills 配置

## 注意
部署后需要重新配置 API Keys！
README_EOF

# 6. 打包
echo ""
echo "📦 打包中..."
cd /tmp
tar czf "${OUTPUT_DIR}/${PACKAGE_NAME}-$(date +%Y%m%d).tar.gz" "$PACKAGE_NAME"

# 7. 生成校验和
cd "$OUTPUT_DIR"
sha256sum "${PACKAGE_NAME}-$(date +%Y%m%d).tar.gz" > "${PACKAGE_NAME}-$(date +%Y%m%d).sha256"

echo ""
echo "✅ 配置包创建完成!"
echo "📍 位置: ${OUTPUT_DIR}/${PACKAGE_NAME}-$(date +%Y%m%d).tar.gz"
echo "📋 校验和: ${OUTPUT_DIR}/${PACKAGE_NAME}-$(date +%Y%m%d).sha256"
echo ""
echo "文件大小: $(du -h "${OUTPUT_DIR}/${PACKAGE_NAME}-$(date +%Y%m%d).tar.gz" | cut -f1)"

# 清理
rm -rf "$TEMP_DIR"
