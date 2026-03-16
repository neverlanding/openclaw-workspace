from PIL import Image, ImageDraw, ImageFont
import os

# 创建白板背景
width, height = 1920, 1080
img = Image.new('RGB', (width, height), '#F5F5F0')
draw = ImageDraw.Draw(img)

# 添加轻微纹理（模拟白板）
for i in range(5000):
    x = os.urandom(4)[0] % width
    y = os.urandom(4)[0] % height
    draw.point((x, y), fill=(220, 220, 210))

# 尝试加载字体，如果没有则用默认
try:
    # 尝试找系统中文字体
    font_paths = [
        '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',
        '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    ]
    
    title_font = None
    for path in font_paths:
        if os.path.exists(path):
            title_font = ImageFont.truetype(path, 80)
            subtitle_font = ImageFont.truetype(path, 48)
            content_font = ImageFont.truetype(path, 42)
            formula_font = ImageFont.truetype(path, 56)
            small_font = ImageFont.truetype(path, 28)
            break
    
    if title_font is None:
        raise Exception("No font found")
        
except:
    # 使用默认字体
    title_font = ImageFont.load_default()
    subtitle_font = content_font = formula_font = small_font = title_font

# 绘制标题 - 黑色
draw.text((width//2, 120), "摩尔定律  Moore's Law", fill='#1a1a1a', font=title_font, anchor='mm')

# 绘制副标题 - 蓝色
draw.text((width//2, 190), "集成电路的指数增长", fill='#0066CC', font=subtitle_font, anchor='mm')

# 绘制核心内容 - 黑色
draw.text((150, 320), "每18-24个月", fill='#1a1a1a', font=content_font)
draw.text((150, 380), "集成电路上的晶体管数量翻倍", fill='#1a1a1a', font=content_font)

# 绘制公式 - 红色
draw.text((150, 480), "性能 ↑    成本 ↓", fill='#CC0000', font=formula_font)

# 绘制芯片简笔画 - 黑色
chip_x, chip_y = 1200, 300
draw.rectangle([chip_x, chip_y, chip_x+200, chip_y+200], outline='#1a1a1a', width=4)
# 内部网格
for i in range(4):
    draw.line([(chip_x+20+i*40, chip_y+20), (chip_x+20+i*40, chip_y+180)], fill='#1a1a1a', width=2)
    draw.line([(chip_x+20, chip_y+20+i*40), (chip_x+180, chip_y+20+i*40)], fill='#1a1a1a', width=2)

# 绘制指数曲线图
graph_x, graph_y = 1100, 550
# 坐标轴
draw.line([(graph_x, graph_y+150), (graph_x, graph_y+50)], fill='#1a1a1a', width=3)
draw.line([(graph_x, graph_y+150), (graph_x+300, graph_y+150)], fill='#1a1a1a', width=3)
# 指数曲线（红色）
points = []
for x in range(0, 301, 10):
    y = 150 - (x/60)**2 * 0.8
    points.append((graph_x+x, graph_y+int(y)))
if len(points) > 1:
    draw.line(points, fill='#CC0000', width=4)

# 标注年份
draw.text((graph_x, graph_y+170), "1971", fill='#1a1a1a', font=small_font)
draw.text((graph_x+260, graph_y+170), "2024", fill='#1a1a1a', font=small_font)

# 签名
draw.text((width-100, height-80), "Gordon Moore 1965", fill='#666666', font=small_font, anchor='rm')

# 保存
output_path = '/home/gary/.openclaw/workspace-boss/output/moores_law_whiteboard.png'
img.save(output_path, 'PNG')
print(f"✅ 图片已生成: {output_path}")
print(f"尺寸: {width}x{height}")
