#!/bin/bash
# OpenClaw 完整配置导出脚本
# 生成一键恢复所需的完整配置包

set -e

# 配置
SOURCE_DIR="/home/gary/.openclaw"
TARGET_DIR="/home/gary/.openclaw/workspace-boss/openclaw-full-config"
DATE=$(date +%Y%m%d_%H%M%S)

# 颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARNING:${NC} $1"
}

# 脱敏函数
sanitize_file() {
    local input_file="$1"
    local output_file="$2"
    
    # 创建目录
    mkdir -p "$(dirname "$output_file")"
    
    # 复制文件
    cp "$input_file" "$output_file"
    
    # 脱敏处理
    # GitHub Token
    sed -i 's/ghp_[a-zA-Z0-9]*/[GITHUB_TOKEN]/g' "$output_file" 2>/dev/null || true
    # OpenAI API Key
    sed -i 's/sk-[a-zA-Z0-9]*/[OPENAI_API_KEY]/g' "$output_file" 2>/dev/null || true
    # Tavily API Key
    sed -i 's/tvly-[a-zA-Z0-9]*/[TAVILY_API_KEY]/g' "$output_file" 2>/dev/null || true
    # Feishu App Secret
    sed -i 's/"appSecret": "[^"]*"/"appSecret": "[FEISHU_APP_SECRET]"/g' "$output_file" 2>/dev/null || true
    # Feishu App ID (可选脱敏)
    # sed -i 's/cli_[a-z0-9]*/[FEISHU_APP_ID]/g' "$output_file" 2>/dev/null || true
    
    log "  ✅ 已脱敏: $(basename "$output_file")"
}

# 主函数
main() {
    log "🚀 开始导出 OpenClaw 完整配置"
    log "=============================="
    
    # 清理旧导出
    if [ -d "$TARGET_DIR" ]; then
        log "🧹 清理旧配置..."
        rm -rf "$TARGET_DIR"
    fi
    
    mkdir -p "$TARGET_DIR"
    
    # 1. 导出 openclaw.json
    log "📄 导出主配置..."
    if [ -f "$SOURCE_DIR/openclaw.json" ]; then
        sanitize_file "$SOURCE_DIR/openclaw.json" "$TARGET_DIR/openclaw.json"
    else
        warn "未找到 openclaw.json"
    fi
    
    # 2. 导出 Agent 配置
    log "🤖 导出 Agent 配置..."
    mkdir -p "$TARGET_DIR/agents"
    
    for agent_dir in "$SOURCE_DIR"/agents/*/; do
        if [ -d "$agent_dir/agent" ]; then
            local agent_name=$(basename "$agent_dir")
            log "  📁 $agent_name..."
            
            # 复制 Agent 配置
            mkdir -p "$TARGET_DIR/agents/$agent_name"
            
            # 复制关键文件
            for file in AGENTS.md SOUL.md USER.md IDENTITY.md TOOLS.md MESSAGING.md; do
                if [ -f "$agent_dir/agent/$file" ]; then
                    sanitize_file "$agent_dir/agent/$file" "$TARGET_DIR/agents/$agent_name/$file"
                fi
            done
            
            # 复制配置目录
            if [ -d "$agent_dir/agent" ]; then
                cp -r "$agent_dir/agent/"* "$TARGET_DIR/agents/$agent_name/" 2>/dev/null || true
                # 再次脱敏所有 json 和 md 文件
                find "$TARGET_DIR/agents/$agent_name/" -type f \( -name "*.json" -o -name "*.md" \) -exec sed -i 's/ghp_[a-zA-Z0-9]*/[GITHUB_TOKEN]/g' {} \; 2>/dev/null || true
                find "$TARGET_DIR/agents/$agent_name/" -type f \( -name "*.json" -o -name "*.md" \) -exec sed -i 's/sk-[a-zA-Z0-9]*/[OPENAI_API_KEY]/g' {} \; 2>/dev/null || true
            fi
        fi
    done
    
    # 3. 导出技能
    log "🛠️  导出系统技能..."
    if [ -d "$SOURCE_DIR/skills" ]; then
        mkdir -p "$TARGET_DIR/skills"
        # 只导出技能配置，不导出大型依赖
        for skill_dir in "$SOURCE_DIR"/skills/*/; do
            if [ -f "$skill_dir/SKILL.md" ] || [ -f "$skill_dir/_meta.json" ]; then
                local skill_name=$(basename "$skill_dir")
                mkdir -p "$TARGET_DIR/skills/$skill_name"
                cp "$skill_dir"/*.md "$TARGET_DIR/skills/$skill_name/" 2>/dev/null || true
                cp "$skill_dir"/*.json "$TARGET_DIR/skills/$skill_name/" 2>/dev/null || true
                cp -r "$skill_dir/scripts" "$TARGET_DIR/skills/$skill_name/" 2>/dev/null || true
                log "  ✅ $skill_name"
            fi
        done
    fi
    
    # 4. 导出扩展
    log "🔌 导出扩展插件..."
    if [ -d "$SOURCE_DIR/extensions" ]; then
        mkdir -p "$TARGET_DIR/extensions"
        # 只复制配置，排除 node_modules
        for ext_dir in "$SOURCE_DIR"/extensions/*-openclaw*/; do
            if [ -d "$ext_dir" ]; then
                local ext_name=$(basename "$ext_dir")
                mkdir -p "$TARGET_DIR/extensions/$ext_name"
                find "$ext_dir" -maxdepth 2 -type f \( -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" \) -exec cp {} "$TARGET_DIR/extensions/$ext_name/" \; 2>/dev/null || true
                log "  ✅ $ext_name"
            fi
        done
    fi
    
    # 5. 导出记忆文件
    log "🧠 导出记忆文件..."
    if [ -d "$SOURCE_DIR/workspace-boss/memory" ]; then
        mkdir -p "$TARGET_DIR/memory"
        cp -r "$SOURCE_DIR/workspace-boss/memory/"* "$TARGET_DIR/memory/" 2>/dev/null || true
        log "  ✅ 记忆文件"
    fi
    
    # 6. 导出Session文件（完整备份）
    log "💾 导出Session文件..."
    mkdir -p "$TARGET_DIR/sessions"
    
    # 备份各agent的session
    for agent_session_dir in "$SOURCE_DIR"/agents/*/sessions/; do
        if [ -d "$agent_session_dir" ]; then
            local agent_name=$(basename "$(dirname "$agent_session_dir")")
            log "  📁 $agent_name sessions..."
            mkdir -p "$TARGET_DIR/sessions/$agent_name"
            
            # 复制.jsonl文件（session记录）
            find "$agent_session_dir" -name "*.jsonl" -exec cp {} "$TARGET_DIR/sessions/$agent_name/" \; 2>/dev/null || true
            
            # 复制.sqlite文件（session数据库）
            find "$agent_session_dir" -name "*.sqlite" -exec cp {} "$TARGET_DIR/sessions/$agent_name/" \; 2>/dev/null || true
            
            local session_count=$(ls -1 "$TARGET_DIR/sessions/$agent_name/" 2>/dev/null | wc -l)
            log "    ✅ $session_count 个session文件"
        fi
    done
    
    # 6. 创建恢复说明
    log "📝 创建恢复说明..."
    cat > "$TARGET_DIR/RESTORE.md" << 'EOF'
# OpenClaw 配置恢复指南

## 一键恢复

```bash
# 1. 克隆仓库
git clone https://github.com/neverlanding/openclaw-workspace.git
cd openclaw-workspace/openclaw-full-config

# 2. 执行恢复脚本（待创建）
./import-config.sh
```

## 手动恢复

### 1. 恢复主配置
```bash
cp openclaw.json ~/.openclaw/openclaw.json
```

### 2. 恢复 Agent 配置
```bash
cp -r agents/* ~/.openclaw/agents/
```

### 3. 恢复技能
```bash
cp -r skills/* ~/.openclaw/skills/
```

### 4. 恢复扩展
```bash
cp -r extensions/* ~/.openclaw/extensions/
```

### 5. 恢复记忆
```bash
cp -r memory/* ~/.openclaw/workspace-boss/memory/
```

## ⚠️ 注意事项

1. 替换占位符为真实值：
   - `[GITHUB_TOKEN]` → 你的 GitHub Token
   - `[OPENAI_API_KEY]` → 你的 OpenAI API Key
   - `[TAVILY_API_KEY]` → 你的 Tavily API Key
   - `[FEISHU_APP_SECRET]` → 你的飞书 App Secret

2. 重启 Gateway 生效
```bash
openclaw gateway restart
```
EOF
    
    # 7. 创建导出信息
    cat > "$TARGET_DIR/EXPORT_INFO.txt" << EOF
OpenClaw 完整配置导出
====================
导出时间: $(date)
导出版本: $DATE
来源主机: $(hostname)
导出用户: $(whoami)

包含内容:
- openclaw.json (脱敏)
- 8个 Agent 配置 (脱敏)
- 系统技能配置
- 扩展插件配置
- 记忆文件

恢复方法: 参见 RESTORE.md
EOF
    
    # 统计
    log "=============================="
    log "✅ 导出完成！"
    log "📂 位置: $TARGET_DIR"
    log "📊 大小: $(du -sh $TARGET_DIR | cut -f1)"
    log "📝 文件数: $(find $TARGET_DIR -type f | wc -l)"
    
    # 列出主要内容
    log "\n📋 主要内容:"
    [ -f "$TARGET_DIR/openclaw.json" ] && log "  ✅ openclaw.json"
    [ -d "$TARGET_DIR/agents" ] && log "  ✅ agents/ ($(ls -1 $TARGET_DIR/agents | wc -l)个Agent)"
    [ -d "$TARGET_DIR/skills" ] && log "  ✅ skills/ ($(ls -1 $TARGET_DIR/skills 2>/dev/null | wc -l)个技能)"
    [ -d "$TARGET_DIR/extensions" ] && log "  ✅ extensions/ ($(ls -1 $TARGET_DIR/extensions 2>/dev/null | wc -l)个扩展)"
    [ -d "$TARGET_DIR/memory" ] && log "  ✅ memory/"
    
    log "\n下一步: git add openclaw-full-config/ && git commit -m 'Add full config backup'"
}

# 执行
main "$@"
