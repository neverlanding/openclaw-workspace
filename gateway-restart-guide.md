# Gateway强制重启操作指南

**时间**: 2026-03-02 13:15
**目标**: 强制重启Gateway使planner独立工作空间生效

---

## 执行状态

之前的重启命令仍在后台执行中。

---

## 建议的手动操作步骤

如果自动重启未生效，请手动执行：

### 步骤1: 登录服务器
```bash
ssh gary@your-server
```

### 步骤2: 强制停止Gateway
```bash
# 查找并停止Gateway进程
pkill -f "openclaw.*gateway"

# 或者使用systemd
systemctl --user stop openclaw-gateway
```

### 步骤3: 验证已停止
```bash
ps aux | grep openclaw | grep -v grep
# 应该没有输出
```

### 步骤4: 启动Gateway
```bash
# 方法1: 使用openclaw命令
openclaw gateway start

# 方法2: 使用systemd
systemctl --user start openclaw-gateway

# 方法3: 直接启动
/usr/bin/node /home/gary/.npm-global/lib/node_modules/openclaw/dist/index.js gateway --port 18789 &
```

### 步骤5: 验证启动成功
```bash
openclaw gateway status
```

应该显示:
- Runtime: running
- Listening: 127.0.0.1:18789

---

## 重启后测试

### 测试1: 检查planner会话
```bash
ls -la ~/.openclaw/workspace-planner/*.jsonl
```
应该有新的jsonl文件生成

### 测试2: 飞书测试
```
@01方案搭子 你是谁
```
应该回复: "我是方案搭子 📝"

---

## 如果仍然失败

**备选方案B: 单飞书入口 + 子Agent调用**

架构调整:
- 只保留搭子总管一个飞书机器人
- @搭子总管 后，内部调用方案搭子子Agent
- 这是OpenClaw推荐的多Agent架构

---

**当前状态**: 等待Gateway重启完成
**预计时间**: 2-5分钟
