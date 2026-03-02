#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微博热搜爬虫脚本（简化版）
使用urllib和re库，不依赖第三方库
"""

import urllib.request
import urllib.parse
import json
import re
import time
from datetime import datetime


class SimpleWeiboHotSearchScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://s.weibo.com/',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }

    def http_request(self, url):
        """
        发送HTTP请求
        """
        req = urllib.request.Request(url, headers=self.headers)
        try:
            response = urllib.request.urlopen(req, timeout=10)
            # 尝试多种编码方式
            content = response.read()
            try:
                return content.decode('utf-8')
            except UnicodeDecodeError:
                # 如果UTF-8解码失败，尝试其他编码
                try:
                    return content.decode('gbk')
                except UnicodeDecodeError:
                    return content.decode('latin-1')
        except Exception as e:
            print(f"请求失败: {str(e)}")
            return None

    def get_hot_search_data(self):
        """
        获取微博热搜数据
        """
        # 尝试使用微博API接口
        api_url = "https://m.weibo.cn/api/container/getIndex?containerid=106003%2Btype%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot"
        
        response_text = self.http_request(api_url)
        if not response_text:
            return None
            
        try:
            data = json.loads(response_text)
            
            if data.get('ok') == 1:
                cards = data['data']['cards']
                
                hot_searches = []
                for card in cards:
                    if card['card_type'] == 'feed':
                        for item in card['card_group']:
                            hot_search_item = {}
                            
                            # 提取标题
                            title = item.get('raw_title', '')
                            hot_search_item['title'] = title
                            
                            # 提取排名
                            rank = item.get('rank', len(hot_searches) + 1)
                            hot_search_item['rank'] = rank
                            
                            # 提取链接
                            scheme = item.get('scheme', '')
                            hot_search_item['link'] = scheme
                            
                            # 提取热度指标
                            if 'desc' in item:
                                hot_search_item['desc'] = item['desc']
                            else:
                                hot_search_item['desc'] = ''
                            
                            hot_searches.append(hot_search_item)
                
                return hot_searches
            else:
                print("API返回错误或无数据")
                return None
                
        except json.JSONDecodeError:
            print("响应不是有效的JSON格式")
            return None
        except KeyError as e:
            print(f"解析数据时缺少键: {str(e)}")
            return None
        except Exception as e:
            print(f"解析数据时发生错误: {str(e)}")
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
            desc = item.get('desc', '')
            
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
            if desc:
                report.append(f"     {desc}")
            if link:
                report.append(f"     链接: {link}")
            report.append("")
        
        report.append("=" * 60)
        report.append(f"共获取 {len(hot_searches)} 条热搜信息")
        report.append("=" * 60)
        
        return "\n".join(report)

    def run(self):
        """
        运行爬虫
        """
        print("正在获取微博热搜数据...")
        
        hot_searches = self.get_hot_search_data()
        
        if hot_searches:
            report = self.format_report(hot_searches)
            print(report)
            return hot_searches
        else:
            print("未能获取到微博热搜数据")
            # 尝试另一个API端点
            print("\n尝试使用备用API端点...")
            return self.try_alternative_api()

    def try_alternative_api(self):
        """
        尝试使用备用API
        """
        # 尝试微博移动端API
        mobile_api = "https://m.weibo.cn/api/container/getIndex?containerid=106003%2Btype%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot"
        response_text = self.http_request(mobile_api)
        
        if response_text:
            try:
                data = json.loads(response_text)
                
                if data.get('ok') == 1:
                    cards = data['data'].get('cards', [])
                    
                    hot_searches = []
                    for card in cards:
                        if card.get('card_type') == 'feed':
                            for item in card.get('card_group', []):
                                hot_search_item = {}
                                
                                # 提取标题
                                title = item.get('raw_title', '')
                                hot_search_item['title'] = title
                                
                                # 提取排名
                                rank = item.get('rank', len(hot_searches) + 1)
                                hot_search_item['rank'] = rank
                                
                                # 提取链接
                                scheme = item.get('scheme', '')
                                hot_search_item['link'] = scheme
                                
                                # 提取描述信息
                                if 'desc' in item:
                                    hot_search_item['desc'] = item['desc']
                                else:
                                    hot_search_item['desc'] = ''
                                
                                # 添加热度等级
                                if 'icon_desc' in item:
                                    hot_search_item['icon_desc'] = item['icon_desc']
                                else:
                                    hot_search_item['icon_desc'] = ''
                                
                                hot_searches.append(hot_search_item)
                    
                    if hot_searches:
                        return hot_searches
                        
            except json.JSONDecodeError:
                print("响应不是有效的JSON格式")
            except KeyError as e:
                print(f"解析数据时缺少键: {str(e)}")
            except Exception as e:
                print(f"解析备用API数据时发生错误: {str(e)}")
        
        # 最后尝试从网页提取
        return self.scrape_from_webpage()

    def scrape_from_webpage(self):
        """
        从网页抓取热搜（最基础的方式）
        """
        print("尝试从网页获取热搜信息...")
        url = "https://s.weibo.com/top/summary"
        response_text = self.http_request(url)
        
        if not response_text:
            return None
            
        # 使用正则表达式简单提取
        # 寻找包含热搜关键词的文本片段
        pattern = r'"word":"([^"]+)"'
        matches = re.findall(pattern, response_text)
        
        if matches:
            hot_searches = []
            for i, word in enumerate(matches[:20], 1):
                hot_searches.append({
                    'rank': i,
                    'title': word,
                    'link': f"https://s.weibo.com/weibo?q={urllib.parse.quote(word.encode('utf-8'))}",
                })
            return hot_searches
        else:
            # 再次尝试不同的模式
            pattern2 = r'<a[^>]*title="([^"]+)"[^>]*>'
            matches2 = re.findall(pattern2, response_text)
            if matches2:
                hot_searches = []
                for i, word in enumerate(matches2[:20], 1):
                    hot_searches.append({
                        'rank': i,
                        'title': word,
                        'link': f"https://s.weibo.com/weibo?q={urllib.parse.quote(word.encode('utf-8'))}",
                    })
                return hot_searches
        
        print("所有方法都未能成功获取数据")
        return None


def main():
    scraper = SimpleWeiboHotSearchScraper()
    result = scraper.run()
    
    if result:
        # 保存结果到文件
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"weibo_hot_search_simple_{timestamp}.txt"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(scraper.format_report(result))
        print(f"\n数据已保存到: {filename}")


if __name__ == "__main__":
    main()