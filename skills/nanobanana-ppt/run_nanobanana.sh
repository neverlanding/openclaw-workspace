#!/bin/bash
# NanoBanana 启动脚本（使用用户级 pip）

export PATH="$HOME/.local/bin:$PATH"
export PYTHONPATH="$HOME/.local/lib/python3.12/site-packages:$PYTHONPATH"
export GEMINI_API_KEY="$(grep GEMINI_API_KEY .env | cut -d= -f2)"

cd "$(dirname "$0")"
python3 -c "
import sys
sys.path.insert(0, '$HOME/.local/lib/python3.12/site-packages')

from nanobanana import PPTGenerator

generator = PPTGenerator()
generator.create_ppt(
    topic='摩尔定律白板风格PPT',
    num_slides=1,
    output_dir='../../output'
)
print('✅ 生成完成')
"
