const PptxGenJS = require("pptxgenjs");
const ppt = new PptxGenJS();

// 设置元数据
ppt.title = "双报告展示";
ppt.author = "OpenClaw";
ppt.subject = "OpenClaw 数字员工报告 & AI 芯片行业报告";

// 定义颜色方案
const colors = {
  primary: "667EEA",
  secondary: "764BA2",
  accent: "F093FB",
  dark: "2D3748",
  light: "F7FAFC",
  white: "FFFFFF",
  gray: "718096"
};

// 定义幻灯片数据
const slides = [
  {
    type: 'title',
    title: '双报告展示',
    subtitle: 'OpenClaw 数字员工报告 & AI 芯片行业报告',
    footer: '2026 年 2 月'
  },
  {
    type: 'section',
    title: '第一部分',
    subtitle: 'OpenClaw 数字员工报告',
    icon: '🤖'
  },
  {
    type: 'content',
    title: 'OpenClaw 数字员工概述',
    points: [
      '基于 OpenClaw 框架的智能助手系统',
      '支持多模态交互：文本、语音、图像、浏览器控制',
      '集成 Feishu/飞书生态，实现企业级协作',
      '可扩展的技能系统，支持自定义功能',
      '本地化部署，保障数据安全与隐私'
    ],
    highlight: '让 AI 成为你的得力助手'
  },
  {
    type: 'content',
    title: '核心功能特性',
    points: [
      '📁 文件管理：读写编辑、目录浏览、批量操作',
      '🌐 网络能力：网页抓取、浏览器自动化、API 调用',
      '💬 消息通知：飞书、Discord、Telegram 等多平台',
      '🎨 多媒体：图片分析、语音合成、PPT 生成',
      '🔧 系统控制：进程管理、命令执行、定时任务'
    ],
    highlight: '全能型数字员工'
  },
  {
    type: 'content',
    title: '技术架构',
    points: [
      'Node.js 运行时，轻量高效',
      '模块化设计，插件式扩展',
      '支持子代理（Subagent）并行任务处理',
      '三层记忆系统：热记忆、温记忆、冷记忆',
      '安全沙箱机制，保护系统安全'
    ],
    highlight: '现代化、可扩展的架构设计'
  },
  {
    type: 'content',
    title: '应用场景',
    points: [
      '📊 数据分析与报告生成',
      '📧 邮件管理与自动回复',
      '📅 日程安排与会议提醒',
      '🔍 信息检索与知识整理',
      '💻 代码辅助与自动化开发',
      '📱 社交媒体管理与内容发布'
    ],
    highlight: '工作生活的智能助手'
  },
  {
    type: 'section',
    title: '第二部分',
    subtitle: 'AI 芯片行业报告',
    icon: '💻'
  },
  {
    type: 'content',
    title: 'AI 芯片市场概况',
    points: [
      '2025 年全球 AI 芯片市场规模：约 1500 亿美元',
      '预计 2030 年突破 4000 亿美元，CAGR 约 22%',
      '数据中心 GPU 占据最大市场份额（~60%）',
      '边缘 AI 芯片增长最快，年增速超 35%',
      '中国 AI 芯片市场增速高于全球平均水平'
    ],
    highlight: '高速增长的金赛道'
  },
  {
    type: 'content',
    title: '主要玩家与竞争格局',
    points: [
      '🥇 NVIDIA：GPU 霸主，市占率超 80%',
      '🥈 AMD：MI 系列加速追赶',
      '🥉 Intel：Gaudi 系列发力数据中心',
      'Google TPU：自用 + 云服务',
      '华为昇腾：国产替代主力',
      '寒武纪、壁仞等：中国初创力量'
    ],
    highlight: '一超多强，国产崛起'
  },
  {
    type: 'content',
    title: '技术发展趋势',
    points: [
      '🔹 大模型专用芯片：针对 Transformer 优化',
      '🔹 存算一体：突破冯·诺依曼瓶颈',
      '🔹 Chiplet 技术：模块化设计降低成本',
      '🔹 光子计算：下一代颠覆性技术',
      '🔹 量子 AI 芯片：长远布局方向',
      '🔹 低功耗边缘芯片：IoT 设备普及'
    ],
    highlight: '技术创新驱动产业升级'
  },
  {
    type: 'content',
    title: '产业链分析',
    points: [
      '上游：IP 核（ARM、Imagination）、EDA 工具（Synopsys、Cadence）',
      '中游：芯片设计（NVIDIA、AMD、华为）、制造（TSMC、SMIC）',
      '下游：服务器厂商、云服务商、终端设备商',
      '封装测试：日月光、长电科技、通富微电',
      '材料设备：光刻机、硅片、光刻胶'
    ],
    highlight: '完整的产业生态系统'
  },
  {
    type: 'content',
    title: '投资机会与风险',
    columns: [
      {
        title: '💰 投资机会',
        items: [
          'AI 大模型训练芯片',
          '边缘推理芯片',
          '自动驾驶芯片',
          '国产替代标的',
          '先进封装技术'
        ]
      },
      {
        title: '⚠️ 风险提示',
        items: [
          '技术迭代风险',
          '地缘政治风险',
          '行业周期波动',
          '人才竞争加剧',
          '估值过高风险'
        ]
      }
    ],
    highlight: '机遇与挑战并存'
  },
  {
    type: 'content',
    title: '未来展望',
    points: [
      '2026-2028：大模型芯片持续爆发',
      '2028-2030：边缘 AI 全面普及',
      '2030+：新型计算架构商业化',
      'AI 芯片将成为像 CPU 一样的基础设施',
      '软件生态与硬件同等重要',
      '可持续发展：能效比成为核心指标'
    ],
    highlight: 'AI 芯片，智能时代的引擎'
  },
  {
    type: 'title',
    title: '感谢观看',
    subtitle: 'Q & A',
    footer: '欢迎提问与交流'
  }
];

// 生成标题幻灯片
function addTitleSlide(slideData) {
  const slide = ppt.addSlide();
  
  // 背景渐变
  slide.background = { color: colors.primary };
  
  // 主标题
  slide.addText(slideData.title, {
    x: "10%",
    y: "30%",
    w: "80%",
    h: "20%",
    fontSize: 54,
    color: colors.white,
    bold: true,
    align: "center",
    fontFace: "Microsoft YaHei"
  });
  
  // 副标题
  slide.addText(slideData.subtitle, {
    x: "10%",
    y: "52%",
    w: "80%",
    h: "15%",
    fontSize: 24,
    color: colors.light,
    align: "center",
    fontFace: "Microsoft YaHei"
  });
  
  // 底部
  if (slideData.footer) {
    slide.addText(slideData.footer, {
      x: "10%",
      y: "85%",
      w: "80%",
      h: "10%",
      fontSize: 16,
      color: colors.light,
      align: "center",
      fontFace: "Microsoft YaHei"
    });
  }
}

// 生成章节分隔幻灯片
function addSectionSlide(slideData) {
  const slide = ppt.addSlide();
  
  // 背景
  slide.background = { color: colors.secondary };
  
  // 章节编号
  const sectionNum = slideData.title.includes('一') ? '01' : '02';
  slide.addText(sectionNum, {
    x: "10%",
    y: "15%",
    w: "80%",
    h: "20%",
    fontSize: 80,
    color: "9F7AEA",
    bold: true,
    align: "center",
    fontFace: "Microsoft YaHei"
  });
  
  // 标题
  slide.addText(slideData.title, {
    x: "10%",
    y: "40%",
    w: "80%",
    h: "15%",
    fontSize: 42,
    color: colors.white,
    bold: true,
    align: "center",
    fontFace: "Microsoft YaHei"
  });
  
  // 副标题
  slide.addText(slideData.subtitle, {
    x: "10%",
    y: "58%",
    w: "80%",
    h: "15%",
    fontSize: 28,
    color: colors.light,
    align: "center",
    fontFace: "Microsoft YaHei"
  });
  
  // 图标
  if (slideData.icon) {
    slide.addText(slideData.icon, {
      x: "45%",
      y: "75%",
      w: "10%",
      h: "15%",
      fontSize: 48,
      align: "center"
    });
  }
}

// 生成内容幻灯片
function addContentSlide(slideData) {
  const slide = ppt.addSlide();
  
  // 背景
  slide.background = { color: colors.white };
  
  // 顶部装饰条
  slide.addShape(ppt.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: 0.3,
    fill: { color: colors.primary }
  });
  
  // 标题
  slide.addText(slideData.title, {
    x: "8%",
    y: "8%",
    w: "84%",
    h: "12%",
    fontSize: 32,
    color: colors.dark,
    bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  // 内容区域
  if (slideData.columns) {
    // 双栏布局
    const colWidth = "40%";
    const startY = "25%";
    
    slideData.columns.forEach((col, index) => {
      const xPos = index === 0 ? "8%" : "52%";
      
      // 栏目标题
      slide.addText(col.title, {
        x: xPos,
        y: startY,
        w: colWidth,
        h: "10%",
        fontSize: 20,
        color: colors.primary,
        bold: true,
        fontFace: "Microsoft YaHei"
      });
      
      // 栏目内容
      const itemsText = col.items.map(item => "• " + item).join("\n");
      slide.addText(itemsText, {
        x: xPos,
        y: "36%",
        w: colWidth,
        h: "45%",
        fontSize: 16,
        color: colors.dark,
        fontFace: "Microsoft YaHei",
        lineSpacing: 28
      });
    });
  } else if (slideData.points) {
    // 单栏列表
    const pointsText = slideData.points.map(point => "• " + point).join("\n");
    slide.addText(pointsText, {
      x: "8%",
      y: "25%",
      w: "84%",
      h: "50%",
      fontSize: 18,
      color: colors.dark,
      fontFace: "Microsoft YaHei",
      lineSpacing: 32
    });
  }
  
  // 高亮框
  if (slideData.highlight) {
    slide.addShape(ppt.ShapeType.rect, {
      x: "8%",
      y: "78%",
      w: "84%",
      h: "15%",
      fill: { color: "EDF2F7" },
      line: { color: colors.primary, width: 2 }
    });
    
    slide.addText(slideData.highlight, {
      x: "10%",
      y: "80%",
      w: "80%",
      h: "11%",
      fontSize: 18,
      color: colors.primary,
      bold: true,
      align: "center",
      fontFace: "Microsoft YaHei"
    });
  }
}

// 生成所有幻灯片
slides.forEach((slideData, index) => {
  console.log(`生成第 ${index + 1} 页: ${slideData.type} - ${slideData.title}`);
  
  switch (slideData.type) {
    case 'title':
      addTitleSlide(slideData);
      break;
    case 'section':
      addSectionSlide(slideData);
      break;
    case 'content':
      addContentSlide(slideData);
      break;
  }
});

// 保存文件
const outputPath = "/home/gary/.openclaw/workspace/report-presentation.pptx";
ppt.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PPT 文件已生成: ${outputPath}`);
    console.log(`📊 共 ${slides.length} 页幻灯片`);
  })
  .catch((err) => {
    console.error("❌ 生成失败:", err);
    process.exit(1);
  });
