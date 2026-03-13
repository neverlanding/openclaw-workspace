#!/bin/bash
# 一键推送到 GitHub

echo "推送到 GitHub..."

# 检查仓库是否存在
if [ -d ".git" ]; then
    git add -A
    git commit -m "Update config: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
else
    git init
    git add -A
    git commit -m "Initial config backup: $(date '+%Y-%m-%d %H:%M:%S')"
    git branch -M main
    git remote add origin https://github.com/neverlanding/openclaw-workspace.git
    git push -u origin main
fi

echo "✓ 推送完成"
