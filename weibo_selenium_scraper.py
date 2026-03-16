#!/usr/bin/env python3
"""
微博热搜获取脚本 (使用Selenium)
此脚本使用浏览器自动化来获取微博热搜数据，绕过访问限制
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.chrome.options import Options as ChromeOptions
import time
import json
from datetime import datetime

def setup_driver():
    """
    设置浏览器驱动
    """
    try:
        # 尝试使用Chrome
        options = ChromeOptions()
        options.add_argument('--headless')  # 无头模式
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        
        driver = webdriver.Chrome(options=options)
        print("成功初始化Chrome驱动")
        return driver
    except:
        try:
            # 如果Chrome不可用，尝试Firefox
            options = Options()
            options.add_argument('--headless')  # 无头模式
            options.add_argument('--width=1920')
            options.add_argument('--height=1080')
            
            driver = webdriver.Firefox(options=options)
            print("成功初始化Firefox驱动")
            return driver
        except Exception as e:
            print(f"无法初始化浏览器驱动: {e}")
            return None

def get_weibo_hot_search():
    """
    使用Selenium获取微博热搜数据
    """
    driver = setup_driver()
    if not driver:
        print("无法启动浏览器，将尝试其他方法")
        return None
    
    try:
        print(f"正在访问微博热搜页面...")
        
        # 访问微博热搜页面
        driver.get("https://s.weibo.com/top/realtimehot")
        
        # 等待页面加载
        time.sleep(5)
        
        # 检查当前URL是否为登录页面
        current_url = driver.current_url
        if 'passport.weibo.com' in current_url or 'visitor' in current_url:
            print("检测到访问限制，需要通过访客验证")
            
            # 尝试寻找访客验证按钮
            try:
                # 查找"立即验证"或类似按钮
                verify_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "a[action-type='feed_list_media_toSmallVideo']"))
                )
                verify_button.click()
                print("点击了验证按钮")
                
                # 再次等待页面加载
                time.sleep(5)
            except:
                print("未找到验证按钮，尝试其他方法")
        
        # 获取页面标题确认是否成功
        title = driver.title
        print(f"页面标题: {title}")
        
        # 尝试查找热搜列表元素
        hot_list_elements = driver.find_elements(By.CSS_SELECTOR, ".list-item")
        
        if len(hot_list_elements) > 0:
            print(f"找到 {len(hot_list_elements)} 个热搜项目")
            
            hot_searches = []
            for i, element in enumerate(hot_list_elements[:10]):  # 只取前10个
                try:
                    # 提取热搜标题
                    title_element = element.find_element(By.CSS_SELECTOR, "a")
                    title_text = title_element.text
                    
                    # 提取热度指数（如果有）
                    hot_index = "未知"
                    try:
                        index_element = element.find_element(By.CSS_SELECTOR, ".hot")
                        hot_index = index_element.text
                    except:
                        pass
                    
                    hot_searches.append({
                        "rank": i+1,
                        "title": title_text,
                        "hot_index": hot_index
                    })
                    
                    if i < 10:  # 只打印前10个
                        print(f"{i+1}. {title_text} ({hot_index})")
                
                except Exception as e:
                    print(f"提取第{i+1}个热搜项时出错: {e}")
                    continue
            
            return hot_searches
        else:
            # 尝试其他可能的选择器
            print("尝试其他选择器...")
            all_links = driver.find_elements(By.TAG_NAME, "a")
            print(f"页面上的链接数量: {len(all_links)}")
            
            # 查找可能的热搜链接
            hot_links = []
            for link in all_links:
                href = link.get_attribute("href")
                text = link.text
                if text and len(text) > 1 and "weibo.com" in str(href):
                    hot_links.append({"text": text, "href": href})
            
            print(f"找到 {len(hot_links[:10])} 个可能的热搜链接")
            for i, link in enumerate(hot_links[:10]):
                print(f"{i+1}. {link['text']}")
            
            return hot_links[:10]
    
    except Exception as e:
        print(f"获取热搜数据时出错: {e}")
        return None
    
    finally:
        driver.quit()

def main():
    print(f"开始获取微博热搜数据 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    result = get_weibo_hot_search()
    
    if result:
        print("\n=== 微博热搜报告 ===")
        for item in result:
            if isinstance(item, dict) and "title" in item:
                print(f"{item['rank']}. {item['title']} ({item['hot_index']})")
            elif isinstance(item, dict) and "text" in item:
                print(f"- {item['text']}")
        print("==================")
    else:
        print("未能获取到热搜数据")
        
        # 提供备选方案
        print("\n备选方案:")
        print("1. 使用微博官方API（需要开发者账号）")
        print("2. 查找第三方微博热搜API")
        print("3. 手动访问微博并复制热搜内容")

if __name__ == "__main__":
    main()