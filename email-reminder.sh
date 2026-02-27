#!/bin/bash
# 定时邮件提醒脚本

EMAIL="wgyx2000@163.com"
EMAIL_PASSWORD="ZJYcw9LzRAT7FcpT"

echo "=== 设置邮件提醒 ==="
echo ""
echo "请选择提醒类型:"
echo ""
echo "1. 一次性提醒 (几分钟后)"
echo "   用法: ./email-reminder.sh 5 '提醒内容'"
echo ""
echo "2. 定时提醒 (每天/每周)"
echo "   用法: 添加到crontab"
echo ""
echo "3. 测试邮件发送"
echo "   用法: ./email-reminder.sh test"
echo ""

# 测试发送
if [ "$1" == "test" ]; then
    echo "发送测试邮件..."
    
    python3 << EOF
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465
SMTP_USER = "$EMAIL"
SMTP_PASSWORD = "$EMAIL_PASSWORD"

msg = MIMEMultipart()
msg['From'] = Header(SMTP_USER)
msg['To'] = Header(SMTP_USER)
msg['Subject'] = Header("⏰ OpenClaw邮件提醒测试", 'utf-8')

body = """
这是一封测试邮件！

如果您收到这封邮件，说明邮件提醒功能已配置成功。

时间: $(date)
来源: OpenClaw Assistant
"""

msg.attach(MIMEText(body, 'plain', 'utf-8'))

try:
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, SMTP_USER, msg.as_string())
    print("✅ 测试邮件发送成功！")
except Exception as e:
    print(f"❌ 发送失败: {e}")
EOF
    exit 0
fi

# 一次性提醒
if [ -n "$1" ] && [ -n "$2" ]; then
    MINUTES=$1
    MESSAGE=$2
    
    echo "设置 $MINUTES 分钟后发送提醒..."
    echo "提醒内容: $MESSAGE"
    
    # 使用at或后台sleep
    (
        sleep $(($MINUTES * 60))
        
        python3 << EOF
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465
SMTP_USER = "$EMAIL"
SMTP_PASSWORD = "$EMAIL_PASSWORD"

msg = MIMEMultipart()
msg['From'] = Header(SMTP_USER)
msg['To'] = Header(SMTP_USER)
msg['Subject'] = Header("⏰ OpenClaw定时提醒", 'utf-8')

body = """
您设置的提醒时间到了！

提醒内容: $MESSAGE
设置时间: $(date -d '-$MINUTES minutes')
提醒时间: $(date)

---
OpenClaw Assistant
"""

msg.attach(MIMEText(body, 'plain', 'utf-8'))

try:
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, SMTP_USER, msg.as_string())
    print("✅ 提醒邮件已发送")
except Exception as e:
    print(f"❌ 发送失败: {e}")
EOF
    ) &
    
    echo "✅ 提醒已设置，$MINUTES 分钟后会发送邮件到 $EMAIL"
    echo "后台任务PID: $!"
fi
