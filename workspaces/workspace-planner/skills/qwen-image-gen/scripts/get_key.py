#!/usr/bin/env python3
"""简单的 GUI 输入框，用于获取 API Key"""
import tkinter as tk
from tkinter import simpledialog

root = tk.Tk()
root.withdraw()  # 隐藏主窗口

api_key = simpledialog.askstring(
    "API Key 输入",
    "请粘贴完整的百炼 API Key (sk-开头):",
    parent=root
)

if api_key:
    print(f"API_KEY={api_key}")
else:
    print("未输入 API Key")
