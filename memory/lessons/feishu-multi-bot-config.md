# 教训记录: 飞书多机器人配置

**时间**: 2026-03-02
**来源**: 飞书多机器人配置修复
**类型**: 系统配置
**严重度**: 🔴 高

## 问题描述

配置多个飞书机器人时出现多个致命错误，导致消息路由混乱。

## 关键错误

### 1. Binding accountId 不匹配
- **错误**: binding中使用 `"accountId": "0"` 但实际定义是 `"accountId": "main"`
- **后果**: 消息路由失败
- **修复**: 确保binding.accountId完全匹配channels定义

### 2. .openclaw 文件类型错误
- **错误**: `.openclaw`被创建为0字节文件而非目录
- **后果**: `ENOTDIR`错误，Agent无法启动会话
- **修复**: `rm .openclaw && mkdir .openclaw`

## 预防措施

1. 创建新工作空间时，确保 `.openclaw/` 是目录
2. 修改openclaw.json后，双重检查accountId匹配
3. 配置完成后必须重启Gateway
4. 逐个测试每个Agent的响应

## 相关文件

- ~/.openclaw/openclaw.json
- ~/.openclaw/workspace-*/.openclaw/

## 参考

- 修复详情: MEMORY.md
