# 微博热搜自动化获取工具

这个工具集用于定期获取微博热搜信息，并生成易于阅读的报告。

## 包含的文件

1. `simple_weibo_scraper.py` - 主要的微博热搜爬虫脚本（使用Python标准库）
2. `fetch_weibo_hot_search.sh` - 执行脚本
3. `weibo_cron_config.txt` - Cron任务配置示例
4. `requirements.txt` - Python依赖库清单（如需使用完整版）

## 安装依赖

如果要使用功能更完整的版本，需要安装以下Python库：

```bash
pip3 install requests beautifulsoup4
```

对于Ubuntu/Debian系统：
```bash
sudo apt update
sudo apt install python3-pip
pip3 install requests beautifulsoup4
```

## 使用方法

### 1. 直接运行脚本

```bash
python3 simple_weibo_scraper.py
```

### 2. 使用shell脚本运行

```bash
./fetch_weibo_hot_search.sh
```

### 3. 设置定时任务（Cron）

编辑crontab：
```bash
crontab -e
```

然后复制粘贴`weibo_cron_config.txt`中的内容到crontab中，并根据需要取消注释合适的行。

## 脚本功能

- 自动获取微博实时热搜数据
- 绕过部分反爬虫机制
- 格式化输出易读的报告
- 保存历史数据到文件
- 记录操作日志

## 输出文件

- 每次运行会生成类似 `weibo_hot_search_simple_YYYYMMDD_HHMMSS.txt` 的报告文件
- 日志记录在 `weibo_scraping.log` 文件中
- 历史数据保存在 `weibo_results` 目录中

## 注意事项

1. 频繁请求可能触发反爬虫机制，建议合理设置请求间隔
2. 微博可能会更改API接口或页面结构，脚本可能需要相应调整
3. 遵守微博的使用条款和robots.txt协议
4. 请勿用于商业用途，仅供学习和个人使用

## 法律声明

此工具仅供学习和技术研究使用，请遵守相关法律法规，不得用于任何违法活动。