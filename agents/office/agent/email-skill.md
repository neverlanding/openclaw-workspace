# 邮件发送技能 - 办公搭子专用

## 概述

本技能使用163邮箱SMTP服务发送邮件。

## 配置信息

- **SMTP服务器**: smtp.163.com
- **端口**: 465 (SSL)
- **发件邮箱**: wgyx2000@163.com
- **授权码**: ZJYcw9LzRAT7FcpT

## 使用方法

### 方法1: 使用现有脚本

```bash
cd ~/.openclaw/workspace/

# 创建邮件内容文件
echo "邮件正文内容" > /tmp/email_body.txt

# 发送邮件
EMAIL_PASSWORD='ZJYcw9LzRAT7FcpT' python3 send_email.py "收件人邮箱" "邮件主题" /tmp/email_body.txt
```

### 方法2: 直接Python代码

```python
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465
SMTP_USER = "wgyx2000@163.com"
SMTP_PASSWORD = "ZJYcw9LzRAT7FcpT"

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = Header(SMTP_USER)
    msg['To'] = Header(to_email)
    msg['Subject'] = Header(subject, 'utf-8')
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
    
    print(f"✅ 邮件已发送至: {to_email}")

# 使用示例
send_email("wanggeng@zetyun.com", "主题", "邮件内容")
```

## 注意事项

1. **授权码不是邮箱密码** - 是163邮箱SMTP专用的授权码
2. **每日发送限额** - 163邮箱对SMTP发送有限制，注意频率
3. **邮件内容** - 支持纯文本和HTML格式

## 调用时机

当用户需要：
- 发送通知邮件
- 发送日报/周报
- 发送重要提醒
- 发送文档附件

## 安全提醒

- 授权码请妥善保管
- 不要在公开场合暴露配置信息
- 建议通过环境变量传入敏感信息

---
*技能配置日期: 2026-02-28*
*移交者: 搭子总管*
