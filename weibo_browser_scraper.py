#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微博热搜爬虫脚本（浏览器自动化版）
使用selenium控制真实浏览器以绕过反爬机制
"""

import time
import json
from datetime import datetime
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class WeiboHotSearchBrowserAutomation:
    def __init__(self):
        self.driver = None
        self.setup_driver()

    def setup_driver(self):
        """设置浏览器驱动"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # 无头模式
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            print("浏览器驱动初始化成功")
        except Exception as e:
            print(f"浏览器驱动初始化失败: {str(e)}")
            print("请确保已安装Chrome浏览器和chromedriver")
            # 如果selenium不可用，则提供替代方案
            self.driver = None

    def get_hot_search_with_browser(self):
        """使用浏览器获取热搜数据"""
        if not self.driver:
            return None

        try:
            print("正在打开微博热搜页面...")
            # 访问微博热搜页面
            self.driver.get("https://s.weibo.com/top/summary")
            
            # 等待页面加载
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "rank-list"))
            )
            
            # 等待一会儿让动态内容加载
            time.sleep(3)
            
            # 尝试获取热搜列表
            hot_items = self.driver.find_elements(By.CSS_SELECTOR, ".rank-list li")
            
            hot_searches = []
            for i, item in enumerate(hot_items, 1):
                try:
                    # 获取热搜标题
                    title_elem = item.find_element(By.CSS_SELECTOR, "a")
                    title = title_elem.text.strip()
                    
                    # 获取链接
                    link = title_elem.get_attribute("href")
                    
                    # 获取热度信息（如果有）
                    hot_icon = item.find_elements(By.CSS_SELECTOR, ".hot-icon")
                    hot_level = "普通" if not hot_icon else "热"
                    
                    hot_searches.append({
                        'rank': i,
                        'title': title,
                        'link': link,
                        'hot_level': hot_level
                    })
                    
                    if len(hot_searches) >= 20:  # 只获取前20个
                        break
                        
                except NoSuchElementException:
                    continue
            
            return hot_searches if hot_searches else None
            
        except TimeoutException:
            print("页面加载超时")
            return None
        except Exception as e:
            print(f"获取热搜数据时出错: {str(e)}")
            return None

    def format_report(self, hot_searches):
        """格式化报告"""
        if not hot_searches:
            return "未能获取到微博热搜数据"
        
        report = []
        report.append("=" * 60)
        report.append("微博实时热搜榜")
        report.append(f"更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("=" * 60)
        
        for item in hot_searches[:20]:  # 只显示前20条
            rank = item.get('rank', '')
            title = item.get('title', 'N/A')
            link = item.get('link', '')
            hot_level = item.get('hot_level', '')
            
            # 添加排名样式
            if rank == 1:
                rank_str = f"🏆 {rank:2d}"
            elif rank == 2:
                rank_str = f"🥈 {rank:2d}"
            elif rank == 3:
                rank_str = f"🥉 {rank:2d}"
            else:
                rank_str = f"  {rank:2d}"
                
            hot_indicator = f" ({hot_level})" if hot_level != "普通" and hot_level else ""
            report.append(f"{rank_str}. {title}{hot_indicator}")
            if link:
                report.append(f"     链接: {link}")
            report.append("")
        
        report.append("=" * 60)
        report.append(f"共获取 {len(hot_searches)} 条热搜信息")
        report.append("=" * 60)
        
        return "\n".join(report)

    def close(self):
        """关闭浏览器"""
        if self.driver:
            self.driver.quit()

    def run(self):
        """运行爬虫"""
        print("开始获取微博热搜数据...")
        
        hot_searches = self.get_hot_search_with_browser()
        
        if hot_searches:
            report = self.format_report(hot_searches)
            print(report)
            
            # 保存结果到文件
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"weibo_hot_search_browser_{timestamp}.txt"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(report)
            print(f"\n数据已保存到: {filename}")
            
            return hot_searches
        else:
            print("未能获取到微博热搜数据")
            return None


def main():
    scraper = WeiboHotSearchBrowserAutomation()
    try:
        result = scraper.run()
    finally:
        scraper.close()


if __name__ == "__main__":
    main()