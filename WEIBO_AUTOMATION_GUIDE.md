# 微博热搜自动化获取完整解决方案

## 方案概述

由于微博实施了严格的反爬虫机制，我们提供了多种获取数据的方法：

1. **基础脚本** - `simple_weibo_scraper.py`: 使用Python标准库，适用于简单场景
2. **综合脚本** - `comprehensive_weibo_scraper.py`: 多种方法尝试，提高成功率
3. **浏览器自动化脚本** - `weibo_browser_scraper.py`: 使用Selenium模拟真实用户行为

## 安装和配置步骤

### 1. 基础环境准备

```bash
# 安装Python 3（如果尚未安装）
sudo apt update
sudo apt install python3 python3-pip

# 安装依赖库（可选，用于增强版功能）
pip3 install requests beautifulsoup4 selenium
```

### 2. 安装Chrome浏览器和WebDriver

```bash
# 安装Chrome浏览器
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt update
sudo apt install google-chrome-stable

# 安装ChromeDriver
CHROME_VERSION=$(google-chrome --version | grep -oP '\d+\.\d+\.\d+')
wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$(echo $CHROME_VERSION | cut -d. -f1)/chromedriver_linux64.zip"
sudo unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
```

### 3. 运行脚本

#### 基础版本（推荐首次尝试）
```bash
python3 simple_weibo_scraper.py
```

#### 综合版本（如果基础版本失败）
```bash
python3 comprehensive_weibo_scraper.py
```

#### 浏览器自动化版本（最可靠但需要额外设置）
```bash
python3 weibo_browser_scraper.py
```

## 配置定时任务

### 1. 编辑crontab
```bash
crontab -e
```

### 2. 添加以下任一行（选择一个频率）：

```bash
# 每30分钟执行一次（推荐）
*/30 * * * * cd /home/gary/.openclaw/workspace && /usr/bin/python3 comprehensive_weibo_scraper.py >> /home/gary/.openclaw/workspace/weibo_scraping.log 2>&1

# 每小时执行一次
0 * * * * cd /home/gary/.openclaw/workspace && /usr/bin/python3 comprehensive_weibo_scraper.py >> /home/gary/.openclaw/workspace/weibo_scraping.log 2>&1

# 每天上午8点到晚上10点每小时执行一次
0 8-22 * * * cd /home/gary/.openclaw/workspace && /usr/bin/python3 comprehensive_weibo_scraper.py >> /home/gary/.openclaw/workspace/weibo_scraping.log 2>&1
```

## 高级反反爬虫策略

如果上述方法仍然无法工作，您可以考虑以下高级策略：

1. **使用代理IP池**
   - 购买或搭建代理IP服务
   - 在脚本中随机切换IP地址

2. **模拟更真实的人类行为**
   - 添加随机延迟
   - 模拟鼠标移动和滚动
   - 使用不同User-Agent

3. **使用专门的爬虫服务**
   - 考虑使用第三方爬虫API服务
   - 如八爪鱼、集搜客等

## 数据输出格式

所有脚本都会生成如下格式的报告：

```
============================================================
微博实时热搜榜
更新时间: 2023-06-15 10:30:45
============================================================
🏆  1. 热门话题标题一
     链接: https://s.weibo.com/...
     
🥈  2. 热门话题标题二
     链接: https://s.weibo.com/...
     
  3. 普通热搜标题三
     链接: https://s.weibo.com/...
============================================================
共获取 20 条热搜信息
============================================================
```

## 故障排除

如果遇到问题，请检查：

1. 网络连接是否正常
2. 微博网站是否可以正常访问
3. API端点是否发生变化
4. 是否触发了反爬虫机制
5. 查看日志文件获取更多信息

## 合规性声明

请确保您的使用符合微博的使用条款和相关法律法规：

- 不要过于频繁地请求数据
- 不要用于商业目的
- 尊重网站的robots.txt文件
- 遵守相关的隐私和数据保护法规

## 维护和更新

由于网站结构可能会变化，建议：

- 定期检查脚本是否正常工作
- 关注微博API的变化
- 更新脚本以适应新的反爬虫措施