#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微博热搜爬虫脚本
用于定期获取微博热搜信息并生成报告
"""

import requests
import json
import time
from bs4 import BeautifulSoup
import re
import csv
from datetime import datetime
import os


class WeiboHotSearchScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        # 微博热搜API接口
        self.api_url = "https://m.weibo.cn/api/container/getIndex?containerid=106003%2Btype%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot"
        self.hot_search_url = "https://s.weibo.com/top/summary"

    def get_hot_search_data(self):
        """
        获取微博热搜数据
        """
        try:
            response = requests.get(self.api_url, headers=self.headers)
            response.encoding = 'utf-8'
            
            if response.status_code == 200:
                data = response.json()
                
                if data['ok'] == 1:
                    cards = data['data']['cards']
                    
                    hot_searches = []
                    for card in cards:
                        if card['card_type'] == 'feed':
                            for item in card['card_group']:
                                hot_search_item = {}
                                
                                # 标题
                                title = item.get('raw_title', '')
                                hot_search_item['title'] = title
                                
                                # 排名
                                rank = item.get('rank', '')
                                hot_search_item['rank'] = rank
                                
                                # 热度值（如果有）
                                hot_score = item.get('hot_scheme', '')
                                hot_search_item['hot_score'] = hot_score
                                
                                # 链接
                                scheme = item.get('scheme', '')
                                hot_search_item['link'] = scheme
                                
                                # 是否是热门话题
                                is_topic = item.get('is_topic_plus', 0)
                                hot_search_item['is_topic'] = is_topic
                                
                                hot_searches.append(hot_search_item)
                    
                    return hot_searches
                else:
                    print("API返回错误:", data)
                    return None
            else:
                print(f"请求失败，状态码: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"获取数据时发生错误: {str(e)}")
            return None

    def get_hot_search_via_web(self):
        """
        通过网页获取微博热搜（备用方法）
        """
        try:
            response = requests.get(self.hot_search_url, headers=self.headers)
            response.encoding = 'utf-8'
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # 查找热搜列表
                items = soup.find_all('td', class_='td-02')
                
                hot_searches = []
                for i, item in enumerate(items, 1):
                    link_tag = item.find('a')
                    if link_tag:
                        title = link_tag.get_text().strip()
                        link = "https://s.weibo.com" + link_tag.get('href', '')
                        
                        hot_searches.append({
                            'rank': i,
                            'title': title,
                            'link': link
                        })
                
                return hot_searches
            else:
                print(f"网页请求失败，状态码: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"解析网页时发生错误: {str(e)}")
            return None

    def format_report(self, hot_searches):
        """
        格式化报告
        """
        if not hot_searches:
            return "未能获取到微博热搜数据"
        
        report = []
        report.append("=" * 60)
        report.append("微博实时热搜榜")
        report.append(f"更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("=" * 60)
        
        for i, item in enumerate(hot_searches[:20], 1):  # 只显示前20条
            rank = item.get('rank', i)
            title = item.get('title', 'N/A')
            link = item.get('link', '')
            
            # 添加排名样式
            if rank == 1:
                rank_str = f"🏆 {rank:2d}"
            elif rank == 2:
                rank_str = f"🥈 {rank:2d}"
            elif rank == 3:
                rank_str = f"🥉 {rank:2d}"
            else:
                rank_str = f"  {rank:2d}"
                
            report.append(f"{rank_str}. {title}")
            if link:
                report.append(f"     链接: {link}")
            report.append("")
        
        report.append("=" * 60)
        report.append(f"共获取 {len(hot_searches)} 条热搜信息")
        report.append("=" * 60)
        
        return "\n".join(report)

    def save_to_csv(self, hot_searches, filename=None):
        """
        保存数据到CSV文件
        """
        if not filename:
            filename = f"weibo_hot_search_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        with open(filename, 'w', newline='', encoding='utf-8-sig') as csvfile:
            fieldnames = ['rank', 'title', 'link', 'hot_score']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for item in hot_searches:
                writer.writerow(item)
        
        print(f"数据已保存到: {filename}")

    def run(self):
        """
        运行爬虫
        """
        print("正在获取微博热搜数据...")
        
        # 尝试使用API方式获取数据
        hot_searches = self.get_hot_search_data()
        
        # 如果API方式失败，尝试网页方式
        if not hot_searches:
            print("API方式失败，尝试网页解析方式...")
            hot_searches = self.get_hot_search_via_web()
        
        # 生成报告
        report = self.format_report(hot_searches)
        print(report)
        
        # 保存数据
        if hot_searches:
            self.save_to_csv(hot_searches)
        
        return hot_searches


def main():
    scraper = WeiboHotSearchScraper()
    scraper.run()


if __name__ == "__main__":
    main()