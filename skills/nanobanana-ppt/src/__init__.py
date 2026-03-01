"""
NanoBanana PPT Skills - 核心模块
"""
import os
from dotenv import load_dotenv
from google import genai

# 加载环境变量
load_dotenv()

class PPTGenerator:
    """PPT生成器类"""
    
    def __init__(self, api_key=None):
        """
        初始化PPT生成器
        
        Args:
            api_key: Google Gemini API Key，如果为None则从环境变量读取
        """
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY 未设置")
        
        self.client = genai.Client(api_key=self.api_key)
        self.output_dir = os.getenv('OUTPUT_DIR', './output')
        
        # 确保输出目录存在
        os.makedirs(self.output_dir, exist_ok=True)
    
    def generate_outline(self, topic, num_slides=5):
        """
        生成PPT大纲
        
        Args:
            topic: PPT主题
            num_slides: 幻灯片数量
            
        Returns:
            大纲文本
        """
        prompt = f"""请为"{topic}"生成一个包含{num_slides}页的PPT大纲。
要求：
1. 包含封面页
2. 每页包含标题和关键要点
3. 结构清晰，逻辑连贯
4. 使用Markdown格式输出
"""
        
        response = self.client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )
        
        return response.text
    
    def generate_slide_content(self, title, key_points):
        """
        生成单页幻灯片内容
        
        Args:
            title: 幻灯片标题
            key_points: 关键要点列表
            
        Returns:
            生成的内容
        """
        points_text = "\n".join([f"- {point}" for point in key_points])
        
        prompt = f"""请为以下幻灯片生成详细内容：

标题：{title}
关键要点：
{points_text}

要求：
1. 内容专业且易于理解
2. 适合PPT展示
3. 包含简短的说明文字
"""
        
        response = self.client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )
        
        return response.text
    
    def generate_image_prompt(self, slide_title, slide_content):
        """
        生成图片提示词
        
        Args:
            slide_title: 幻灯片标题
            slide_content: 幻灯片内容
            
        Returns:
            图片生成提示词
        """
        prompt = f"""请为以下PPT幻灯片生成一个适合AI绘图的中文提示词：

标题：{slide_title}
内容：{slide_content[:200]}...

要求：
1. 提示词简洁明了
2. 适合PPT配图风格
3. 只输出提示词，不要其他说明
"""
        
        response = self.client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )
        
        return response.text.strip()

# 便捷函数
def create_ppt(topic, num_slides=5, output_dir='./output'):
    """
    快速创建PPT
    
    Args:
        topic: PPT主题
        num_slides: 幻灯片数量
        output_dir: 输出目录
        
    Returns:
        PPT大纲
    """
    generator = PPTGenerator()
    outline = generator.generate_outline(topic, num_slides)
    return outline
