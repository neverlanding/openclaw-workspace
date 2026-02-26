# 设置网络访问权限

## 当前状态
- 已在配置中启用web工具
- 需要Brave Search API密钥才能进行网络搜索

## 获取Brave Search API密钥的步骤

1. 访问 https://brave.com/search/api/
2. 创建一个Brave Search API账户
3. 在仪表板中选择"Data for Search"计划（非"Data for AI"）
4. 生成一个新的API密钥
5. 将API密钥存储到系统中

## 存储API密钥的方法

### 方法1（推荐）：使用配置命令
```bash
openclaw configure --section web
```

### 方法2：环境变量
将以下内容添加到 ~/.openclaw/.env 文件：
```
BRAVE_API_KEY=your_api_key_here
```

## 替代方案

如果没有Brave Search API密钥，也可以考虑：

1. 使用Perplexity API（需要OPENROUTER_API_KEY或PERPLEXITY_API_KEY）
2. 手动提供微博热搜链接（如果有的话）
3. 使用浏览器自动化（需要配置Chrome扩展）

## 安全提醒
- API密钥应妥善保管，不要泄露
- 不要在公共场合分享包含API密钥的信息