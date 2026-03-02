const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

// 1. 白板背景
ctx.fillStyle = '#F5F5F0';
ctx.fillRect(0, 0, 1920, 1080);

// 2. 标题 - 黑色马克笔
ctx.font = 'bold 80px sans-serif';
ctx.fillStyle = '#1a1a1a';
ctx.textAlign = 'center';
ctx.fillText('摩尔定律  Moore\'s Law', 960, 120);

// 3. 副标题 - 蓝色
ctx.font = 'italic 48px sans-serif';
ctx.fillStyle = '#0066CC';
ctx.fillText('集成电路的指数增长', 960, 190);

// 4. 核心内容 - 黑色
ctx.font = 'bold 42px sans-serif';
ctx.fillStyle = '#1a1a1a';
ctx.textAlign = 'left';
ctx.fillText('每18-24个月', 150, 320);
ctx.fillText('集成电路上的晶体管数量翻倍', 150, 380);

// 5. 公式 - 红色
ctx.font = 'bold 56px sans-serif';
ctx.fillStyle = '#CC0000';
ctx.fillText('性能 ↑    成本 ↓', 150, 480);

// 6. 绘制芯片
ctx.strokeStyle = '#1a1a1a';
ctx.lineWidth = 4;
ctx.strokeRect(1100, 280, 200, 200);

// 7. 绘制曲线
ctx.strokeStyle = '#CC0000';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(1100, 650);
for(let x = 0; x < 300; x += 5) {
    const y = 650 - Math.pow(x / 30, 2) * 0.8;
    ctx.lineTo(1100 + x, y);
}
ctx.stroke();

// 8. 坐标轴
ctx.strokeStyle = '#1a1a1a';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(1100, 650);
ctx.lineTo(1100, 450);
ctx.lineTo(1450, 650);
ctx.stroke();

// 9. 标注
ctx.font = '24px sans-serif';
ctx.fillStyle = '#1a1a1a';
ctx.fillText('1971', 1100, 680);
ctx.fillText('2024', 1380, 680);

// 保存
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('moores_law_whiteboard.png', buffer);
console.log('✅ 已生成: moores_law_whiteboard.png');
