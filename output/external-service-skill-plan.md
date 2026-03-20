# 外网服务部署技能方案

## 可选方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|:---|:---|:---|:---:|
| **ngrok** | 最流行、文档全、有免费版 | 免费版域名随机、有流量限制 | ⭐⭐⭐⭐⭐ |
| **Cloudflare Tunnel** | 完全免费、域名固定、安全 | 需要 Cloudflare 账号、配置稍复杂 | ⭐⭐⭐⭐ |
| **frp** | 开源免费、性能高 | 需要自己搭建服务器 | ⭐⭐⭐ |
| **localtunnel** | Node.js 生态、简单易用 | 稳定性一般、功能简单 | ⭐⭐⭐ |

---

## 推荐方案：ngrok

### 安装方式
```bash
# npm 全局安装
npm install -g ngrok

# 或者下载二进制
# https://ngrok.com/download
```

### 使用方式
```bash
# 1. 注册账号获取 authtoken（免费）
# 2. 配置 authtoken
ngrok config add-authtoken YOUR_TOKEN

# 3. 启动隧道（将本地端口暴露到外网）
ngrok http 8080

# 输出示例：
# Forwarding  https://abc123.ngrok-free.app -> http://localhost:8080
```

### 适用场景
- 临时分享本地生成的网页/PPT
- 演示文稿给外部人员查看
- 测试 webhook

---

## 备选方案：Cloudflare Tunnel

### 安装方式
```bash
# 下载 cloudflared
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
```

### 使用方式
```bash
# 登录 Cloudflare
cloudflared tunnel login

# 创建隧道
cloudflared tunnel create my-tunnel

# 运行隧道
cloudflared tunnel run my-tunnel
```

### 优点
- 完全免费
- 可以绑定自己的域名
- 不需要公网 IP

---

## 实施建议

**短期（今天）**：
1. 安装 ngrok，注册免费账号
2. 测试将局域网服务暴露到外网
3. 更新方案搭子技能，支持生成外网链接

**长期**：
1. 如果常用，考虑升级到 ngrok 付费版（固定域名）
2. 或者配置 Cloudflare Tunnel（完全免费+固定域名）

---

## 需要组长确认

1. **是否安装 ngrok 作为通用技能？**
2. **是否需要我帮你注册 ngrok 账号并配置？**
3. **还是优先使用 Cloudflare Tunnel？**（如果你有 Cloudflare 账号）
