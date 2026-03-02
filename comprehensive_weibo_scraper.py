#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微博热搜综合爬虫脚本
结合多种方法获取微博热搜数据
"""

import urllib.request
import urllib.parse
import json
import re
import time
from datetime import datetime
import subprocess
import sys


class ComprehensiveWeiboScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://s.weibo.com/',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
        }

    def http_request(self, url):
        """
        发送HTTP请求，带重试机制和编码处理
        """
        req = urllib.request.Request(url, headers=self.headers)
        for attempt in range(3):  # 尝试3次
            try:
                response = urllib.request.urlopen(req, timeout=15)
                content = response.read()
                
                # 尝试多种编码方式
                for encoding in ['utf-8', 'gbk', 'gb2312', 'latin-1']:
                    try:
                        return content.decode(encoding)
                    except UnicodeDecodeError:
                        continue
                        
                # 如果所有编码都失败，使用错误忽略
                return content.decode('utf-8', errors='ignore')
                
            except Exception as e:
                print(f"请求失败 (尝试 {attempt + 1}/3): {str(e)}")
                if attempt < 2:  # 不是最后一次尝试
                    time.sleep(2)  # 等待2秒后重试
                else:
                    return None

    def method1_api_request(self):
        """
        方法1: 使用微博API端点
        """
        print("尝试方法1: 使用微博API...")
        
        urls = [
            "https://m.weibo.cn/api/container/getIndex?containerid=106003%2Btype%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot",
            "https://m.weibo.cn/api/container/getIndex?containerid=106003type=25&filter_type=realtimehot&ignore_gazette=1&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1616046282%26from%3D1110006030%26static_page%3Dhttps%253A%252F%252Fpay.sc.weibo.com%252Faj%252Fpay%252Fpindex%252Fcharge%252Fextend%252Findex.php%253Fproduct_id%253D10000033%2526parent%253D10000001%2526skin%253D10000002%2526product_name%253D%2525E9%2525B9%252585%2525E9%2525B8%2525A3%2525E6%25258E%252592%2525E8%2525A1%25258C%2525E6%2525A6%25259C%2526product_desc%253D%2525E9%2525B9%252585%2525E9%2525B8%2525A3%2525E6%25258E%252592%2525E8%2525A1%25258C%2525E6%2525A6%25259C%2526product_amount%253D0%2526order_id%253D",
        ]
        
        for url in urls:
            response_text = self.http_request(url)
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
                                    if title:  # 只添加有标题的项目
                                        hot_search_item['title'] = title
                                        
                                        # 提取排名
                                        rank = item.get('rank', len(hot_searches) + 1)
                                        hot_search_item['rank'] = rank
                                        
                                        # 提取链接
                                        scheme = item.get('scheme', '')
                                        hot_search_item['link'] = scheme
                                        
                                        # 提取描述信息
                                        desc = item.get('desc', '')
                                        hot_search_item['desc'] = desc
                                        
                                        hot_searches.append(hot_search_item)
                        
                        if hot_searches:
                            print(f"方法1成功，获取到 {len(hot_searches)} 条数据")
                            return hot_searches
                            
                except json.JSONDecodeError:
                    continue
                except Exception as e:
                    print(f"解析API响应时出错: {str(e)}")
                    continue
        
        print("方法1失败")
        return None

    def method2_web_scraping(self):
        """
        方法2: 直接网页抓取
        """
        print("尝试方法2: 直接网页抓取...")
        
        url = "https://s.weibo.com/top/summary"
        response_text = self.http_request(url)
        
        if not response_text:
            print("方法2失败：无法获取网页内容")
            return None
        
        try:
            # 尝试多种正则表达式来匹配热搜数据
            # 方式1: 尝试匹配JSON数据块
            script_pattern = r'<script[^>]*>.*?window\.pageConfig\s*=\s*(.*?)\s*</script>'
            json_match = re.search(script_pattern, response_text, re.DOTALL)
            
            if json_match:
                json_str = json_match.group(1).strip().rstrip(';')
                # 尝试修复不完整的JSON
                if not json_str.startswith('{') and not json_str.startswith('['):
                    # 查找真正的JSON开始位置
                    start_pos = json_str.find('{')
                    if start_pos == -1:
                        start_pos = json_str.find('[')
                    if start_pos != -1:
                        json_str = json_str[start_pos:]
                
                try:
                    data = json.loads(json_str)
                    print("方法2成功，从页面找到了JSON数据")
                    # 这里需要根据实际数据结构进行解析
                    return self._parse_json_data(data)
                except:
                    pass
            
            # 方式2: 使用正则表达式提取链接和文本
            # 匹配热搜项的模式
            patterns = [
                r'<a[^>]*href="([^"]*)"[^>]*title="([^"]*)"[^>]*>',
                r'<a[^>]*title="([^"]*)"[^>]*href="([^"]*)"[^>]*>',
                r'<td class="td-02">[^<]*<a[^>]+>([^<]+)</a>',
                r'data-v-[a-z0-9]+="[^"]*">([^<]*)</span>',  # Vue.js应用可能使用的模式
            ]
            
            for pattern in patterns:
                matches = re.findall(pattern, response_text)
                if matches:
                    hot_searches = []
                    for i, match in enumerate(matches[:20], 1):
                        if isinstance(match, tuple):
                            if len(match) >= 2:
                                link, title = match[0], match[1]
                            else:
                                title = match[0]
                                link = ""
                        else:
                            title = match
                            link = ""
                        
                        if title.strip():  # 确保标题不为空
                            hot_searches.append({
                                'rank': i,
                                'title': title.strip(),
                                'link': link if link.startswith('http') else f"https://s.weibo.com{link}"
                            })
                    
                    if hot_searches:
                        print(f"方法2成功，通过正则表达式获取到 {len(hot_searches)} 条数据")
                        return hot_searches
            
            print("方法2失败：无法从网页提取有效数据")
            return None
            
        except Exception as e:
            print(f"方法2处理网页时出错: {str(e)}")
            return None

    def _parse_json_data(self, data):
        """
        解析从页面获取的JSON数据
        """
        # 根据可能的数据结构进行解析
        hot_searches = []
        
        # 如果是对象，尝试查找包含热搜数据的字段
        if isinstance(data, dict):
            # 搜索常见的键名
            keys_to_try = ['data', 'result', 'list', 'items', 'hot_list']
            for key in keys_to_try:
                if key in data:
                    result = self._parse_json_data(data[key])
                    if result:
                        return result
        
        # 如果是数组，直接解析每个元素
        elif isinstance(data, list):
            for i, item in enumerate(data[:20], 1):
                if isinstance(item, dict):
                    title = item.get('title') or item.get('name') or item.get('word') or item.get('keyword')
                    if title:
                        hot_searches.append({
                            'rank': i,
                            'title': title,
                            'link': item.get('link', ''),
                            'desc': item.get('desc', '')
                        })
        
        return hot_searches if hot_searches else None

    def method3_alternative_source(self):
        """
        方法3: 使用替代数据源
        """
        print("尝试方法3: 使用替代数据源...")
        
        # 尝试一些公开的微博热搜API（如果有）
        # 注意：这些通常是第三方服务，稳定性和准确性无法保证
        alt_sources = [
            # 这里可以添加一些公开的API端点（如果存在）
        ]
        
        for source in alt_sources:
            response_text = self.http_request(source)
            if response_text:
                try:
                    data = json.loads(response_text)
                    # 解析数据...
                    print("方法3成功")
                    return self._parse_json_data(data)
                except:
                    continue
        
        print("方法3失败")
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
        
        for item in hot_searches[:20]:  # 只显示前20条
            rank = item.get('rank', '')
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
        运行爬虫，按优先级尝试不同方法
        """
        print("开始获取微博热搜数据...")
        print("正在尝试多种方法以绕过访问限制...")
        
        methods = [
            self.method1_api_request,
            self.method2_web_scraping,
            self.method3_alternative_source
        ]
        
        for method in methods:
            result = method()
            if result:
                report = self.format_report(result)
                print(report)
                
                # 保存结果到文件
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"comprehensive_weibo_hot_search_{timestamp}.txt"
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(report)
                print(f"\n数据已保存到: {filename}")
                
                return result
        
        print("所有方法都未能成功获取数据")
        print("可能的原因:")
        print("- 微博更改了API接口或页面结构")
        print("- 当前IP被限制访问")
        print("- 网络连接问题")
        print("- 需要更复杂的反反爬虫措施（如代理、浏览器自动化等）")
        
        return None


def main():
    scraper = ComprehensiveWeiboScraper()
    result = scraper.run()


if __name__ == "__main__":
    main()