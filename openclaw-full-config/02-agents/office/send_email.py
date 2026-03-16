#!/usr/bin/env python3
"""
OpenClaw邮件发送工具
支持163邮箱SMTP发送
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
import sys
import os

# 邮件配置
SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465  # SSL端口
SMTP_USER = "wgyx2000@163.com"  # 你的163邮箱
# 注意：需要使用163邮箱授权码，不是登录密码
# 获取方式：登录163邮箱 -> 设置 -> POP3/SMTP/IMAP -> 开启SMTP并获取授权码

# 请在这里填写你的163邮箱授权码
# 获取方式：
# 1. 登录 https://mail.163.com
# 2. 点击"设置" -> "POP3/SMTP/IMAP"
# 3. 开启SMTP服务
# 4. 获取授权码（不是邮箱密码！）
SMTP_PASSWORD = os.getenv("EMAIL_PASSWORD", "")  # 从环境变量读取，或在这里填写

def send_email(to_email, subject, body, from_email=None):
    """
    发送邮件
    
    参数:
        to_email: 收件人邮箱
        subject: 邮件主题
        body: 邮件内容
        from_email: 发件人邮箱（默认使用配置）
    """
    if not from_email:
        from_email = SMTP_USER
    
    if not SMTP_PASSWORD:
        print("❌ 错误: 未配置邮箱授权码")
        print("请设置环境变量: export EMAIL_PASSWORD='你的授权码'")
        print("或在脚本中填写SMTP_PASSWORD")
        return False
    
    try:
        # 创建邮件
        msg = MIMEMultipart()
        msg['From'] = Header(from_email)
        msg['To'] = Header(to_email)
        msg['Subject'] = Header(subject, 'utf-8')
        
        # 添加邮件正文
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        
        # 连接SMTP服务器并发送
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(from_email, to_email, msg.as_string())
        
        print(f"✅ 邮件发送成功!")
        print(f"   收件人: {to_email}")
        print(f"   主题: {subject}")
        return True
        
    except Exception as e:
        print(f"❌ 邮件发送失败: {e}")
        return False

def main():
    """命令行入口"""
    if len(sys.argv) < 4:
        print("用法: python3 send_email.py <收件人> <主题> <内容文件>")
        print("示例: python3 send_email.py wgyx2000@163.com '测试' email.txt")
        sys.exit(1)
    
    to_email = sys.argv[1]
    subject = sys.argv[2]
    content_file = sys.argv[3]
    
    if not os.path.exists(content_file):
        print(f"❌ 文件不存在: {content_file}")
        sys.exit(1)
    
    with open(content_file, 'r', encoding='utf-8') as f:
        body = f.read()
    
    success = send_email(to_email, subject, body)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
