# Clash Verge VPN 使用说明

## 📁 安装位置
`/home/gary/.openclaw/workspace/clash-vpn/`

## 🚀 快速启动

```bash
cd /home/gary/.openclaw/workspace/clash-vpn
./start-clash.sh
```

## 📋 文件说明

| 文件 | 说明 |
|------|------|
| `clash-verge` | 主程序（8.2MB） |
| `start-clash.sh` | 启动脚本 |
| `subscription.yaml` | 订阅配置文件（已导入） |
| `config.yaml` | 基础配置文件 |
| `.config/clash-verge/` | 配置目录 |

## ⚙️ 配置信息

- **订阅地址：** http://xn.yyds007.top:11111/s/6d80522dbb62368e229d6dca495064b9
- **配置目录：** `/home/gary/.openclaw/workspace/clash-vpn/.config/clash-verge/`
- **日志位置：** `~/.config/clash-verge/logs/`

## 🖥️ 使用方法

1. **启动软件：**
   ```bash
   ./start-clash.sh
   ```

2. **系统代理设置：**
   - HTTP代理：`127.0.0.1:7890`
   - SOCKS5代理：`127.0.0.1:7891`

3. **Web控制面板：**
   - 地址：http://127.0.0.1:9090/ui
   - 可以在此切换节点、查看流量

## 🔧 常用命令

```bash
# 进入目录
cd /home/gary/.openclaw/workspace/clash-vpn

# 启动
./start-clash.sh

# 查看进程
ps aux | grep clash-verge

# 停止
pkill -f clash-verge
```

## 📝 更新订阅

如需更新订阅：
1. 访问订阅地址重新下载
2. 替换 `subscription.yaml` 文件
3. 重启Clash Verge

## 💡 提示

- 首次启动可能需要几秒钟加载配置
- 如果遇到权限问题，确保文件有执行权限：`chmod +x clash-verge`
- 可视化界面需要桌面环境支持（GUI）

---
*安装时间：2026-02-25*
*版本：Clash Verge Rev v1.5.10*
