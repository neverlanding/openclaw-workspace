#!/bin/bash
# OpenClaw 配置环境变量注入脚本
# 用于在Docker/CI环境中动态注入API Key

set -e

CONFIG_FILE="${1:-$HOME/.openclaw/openclaw.json}"

echo "🔧 OpenClaw 配置环境变量注入工具"
echo "=================================="
echo "配置文件: $CONFIG_FILE"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ 配置文件不存在: $CONFIG_FILE"
    exit 1
fi

# 备份原配置
cp "$CONFIG_FILE" "$CONFIG_FILE.bak.$(date +%s)"

# 使用Python进行配置更新
python3 << PYTHON_SCRIPT
import json
import os
import sys

config_file = "$CONFIG_FILE"

with open(config_file, 'r') as f:
    config = json.load(f)

# 从环境变量读取并更新配置

# 1. 飞书机器人配置
feishu_env_map = {
    'FEISHU_MAIN_APPSECRET': ('main', 0),
    'FEISHU_PLANNER_APPSECRET': ('1', 1),
    'FEISHU_OFFICE_APPSECRET': ('2', 2),
    'FEISHU_WRITER_APPSECRET': ('3', 3),
    'FEISHU_NEWS_APPSECRET': ('4', 4),
    'FEISHU_READER_APPSECRET': ('5', 5),
    'FEISHU_FINANCE_APPSECRET': ('6', 6),
    'FEISHU_CODER_APPSECRET': ('7', 7),
}

if 'channels' in config and 'feishu' in config['channels']:
    accounts = config['channels']['feishu'].get('accounts', [])
    
    for env_var, (account_id, index) in feishu_env_map.items():
        value = os.environ.get(env_var)
        if value and index < len(accounts):
            accounts[index]['appSecret'] = value
            print(f"✅ 已注入 {env_var}")

# 2. Gateway Token
if 'OPENCLAW_GATEWAY_TOKEN' in os.environ:
    if 'gateway' not in config:
        config['gateway'] = {}
    if 'auth' not in config['gateway']:
        config['gateway']['auth'] = {}
    config['gateway']['auth']['token'] = os.environ['OPENCLAW_GATEWAY_TOKEN']
    print(f"✅ 已注入 OPENCLAW_GATEWAY_TOKEN")

# 3. 模型API Key
if 'KIMI_CODING_API_KEY' in os.environ:
    if 'auth' not in config:
        config['auth'] = {}
    if 'profiles' not in config['auth']:
        config['auth']['profiles'] = {}
    if 'kimi-coding:default' not in config['auth']['profiles']:
        config['auth']['profiles']['kimi-coding:default'] = {}
    config['auth']['profiles']['kimi-coding:default']['apiKey'] = os.environ['KIMI_CODING_API_KEY']
    print(f"✅ 已注入 KIMI_CODING_API_KEY")

if 'MOONSHOT_API_KEY' in os.environ:
    if 'auth' not in config:
        config['auth'] = {}
    if 'profiles' not in config['auth']:
        config['auth']['profiles'] = {}
    if 'moonshot:default' not in config['auth']['profiles']:
        config['auth']['profiles']['moonshot:default'] = {}
    config['auth']['profiles']['moonshot:default']['apiKey'] = os.environ['MOONSHOT_API_KEY']
    print(f"✅ 已注入 MOONSHOT_API_KEY")

# 4. 技能API Key
if 'NANO_BANANA_API_KEY' in os.environ:
    if 'skills' not in config:
        config['skills'] = {}
    if 'entries' not in config['skills']:
        config['skills']['entries'] = {}
    if 'nano-banana-pro' not in config['skills']['entries']:
        config['skills']['entries']['nano-banana-pro'] = {}
    config['skills']['entries']['nano-banana-pro']['apiKey'] = os.environ['NANO_BANANA_API_KEY']
    if 'env' not in config['skills']['entries']['nano-banana-pro']:
        config['skills']['entries']['nano-banana-pro']['env'] = {}
    config['skills']['entries']['nano-banana-pro']['env']['GEMINI_API_KEY'] = os.environ['NANO_BANANA_API_KEY']
    print(f"✅ 已注入 NANO_BANANA_API_KEY")

# 保存配置
with open(config_file, 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"\\n✅ 配置已更新: {config_file}")
PYTHON_SCRIPT

echo ""
echo "=================================="
echo "📝 支持的环境变量:"
echo ""
echo "飞书机器人 AppSecret:"
echo "  FEISHU_MAIN_APPSECRET     - 搭子总管"
echo "  FEISHU_PLANNER_APPSECRET  - 方案搭子"
echo "  FEISHU_OFFICE_APPSECRET   - 办公搭子"
echo "  FEISHU_WRITER_APPSECRET   - 公众号搭子"
echo "  FEISHU_NEWS_APPSECRET     - 新闻搭子"
echo "  FEISHU_READER_APPSECRET   - 读书搭子"
echo "  FEISHU_FINANCE_APPSECRET  - 理财搭子"
echo "  FEISHU_CODER_APPSECRET    - 代码搭子"
echo ""
echo "其他配置:"
echo "  OPENCLAW_GATEWAY_TOKEN    - Gateway Token"
echo "  KIMI_CODING_API_KEY       - Kimi Coding API Key"
echo "  MOONSHOT_API_KEY          - Moonshot API Key"
echo "  NANO_BANANA_API_KEY       - Nano Banana Pro API Key"
