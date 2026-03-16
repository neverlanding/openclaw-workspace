const docx = require('docx');
const fs = require('fs');

const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Header, Footer, PageNumber, BorderStyle, Table, TableCell, TableRow, WidthType, convertInchesToTwip } = docx;

// 读取markdown文件
const mdContent = fs.readFileSync('/home/gary/.openclaw/workspace/ai-agent-papers-review.md', 'utf-8');

// 解析markdown
function parseMarkdown(content) {
    const lines = content.split('\n');
    const elements = [];
    
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        
        // 跳过空行
        if (line.trim() === '') {
            i++;
            continue;
        }
        
        // 标题
        if (line.startsWith('# ')) {
            elements.push({ type: 'heading1', text: line.substring(2).trim() });
            i++;
            continue;
        }
        if (line.startsWith('## ')) {
            elements.push({ type: 'heading2', text: line.substring(3).trim() });
            i++;
            continue;
        }
        if (line.startsWith('### ')) {
            elements.push({ type: 'heading3', text: line.substring(4).trim() });
            i++;
            continue;
        }
        
        // 分隔线
        if (line.trim() === '---') {
            elements.push({ type: 'separator' });
            i++;
            continue;
        }
        
        // 无序列表
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const items = [];
            while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
                items.push(lines[i].trim().substring(2).trim());
                i++;
            }
            elements.push({ type: 'bulletList', items });
            continue;
        }
        
        // 有序列表
        if (/^\s*\d+\.\s/.test(line)) {
            const items = [];
            while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
                items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
                i++;
            }
            elements.push({ type: 'numberedList', items });
            continue;
        }
        
        // 引用块
        if (line.startsWith('> ')) {
            const text = line.substring(2).trim();
            elements.push({ type: 'quote', text });
            i++;
            continue;
        }
        
        // 粗体文本 **text**
        if (line.includes('**')) {
            elements.push({ type: 'paragraph', text: line, hasFormatting: true });
            i++;
            continue;
        }
        
        // 普通段落
        elements.push({ type: 'paragraph', text: line });
        i++;
    }
    
    return elements;
}

// 解析行内格式（粗体、斜体）
function parseInlineFormatting(text) {
    const children = [];
    let remaining = text;
    
    // 处理粗体 **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            children.push(new TextRun({ text: text.substring(lastIndex, match.index) }));
        }
        children.push(new TextRun({ text: match[1], bold: true }));
        lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
        children.push(new TextRun({ text: text.substring(lastIndex) }));
    }
    
    if (children.length === 0) {
        children.push(new TextRun({ text }));
    }
    
    return children;
}

// 创建文档
async function createDocument() {
    const elements = parseMarkdown(mdContent);
    
    const docChildren = [];
    
    elements.forEach(el => {
        switch (el.type) {
            case 'heading1':
                docChildren.push(new Paragraph({
                    text: el.text,
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                }));
                break;
                
            case 'heading2':
                docChildren.push(new Paragraph({
                    text: el.text,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 150 }
                }));
                break;
                
            case 'heading3':
                docChildren.push(new Paragraph({
                    text: el.text,
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                }));
                break;
                
            case 'paragraph':
                if (el.hasFormatting) {
                    docChildren.push(new Paragraph({
                        children: parseInlineFormatting(el.text),
                        spacing: { before: 100, after: 100 }
                    }));
                } else {
                    docChildren.push(new Paragraph({
                        text: el.text,
                        spacing: { before: 100, after: 100 }
                    }));
                }
                break;
                
            case 'bulletList':
                el.items.forEach(item => {
                    docChildren.push(new Paragraph({
                        text: '• ' + item,
                        spacing: { before: 50, after: 50 },
                        indent: { left: 360 }
                    }));
                });
                break;
                
            case 'numberedList':
                el.items.forEach((item, idx) => {
                    docChildren.push(new Paragraph({
                        text: `${idx + 1}. ${item}`,
                        spacing: { before: 50, after: 50 },
                        indent: { left: 360 }
                    }));
                });
                break;
                
            case 'separator':
                docChildren.push(new Paragraph({
                    border: {
                        bottom: {
                            color: '999999',
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: 6
                        }
                    },
                    spacing: { before: 200, after: 200 }
                }));
                break;
                
            case 'quote':
                docChildren.push(new Paragraph({
                    children: parseInlineFormatting(el.text),
                    spacing: { before: 100, after: 100 },
                    indent: { left: 720 },
                    border: {
                        left: {
                            color: 'CCCCCC',
                            space: 4,
                            style: BorderStyle.SINGLE,
                            size: 24
                        }
                    }
                }));
                break;
        }
    });
    
    const doc = new Document({
        title: 'AI Agent研究综述：2024-2025年度进展',
        author: 'AI Agent Research Review',
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: convertInchesToTwip(1),
                        right: convertInchesToTwip(1),
                        bottom: convertInchesToTwip(1),
                        left: convertInchesToTwip(1)
                    }
                }
            },
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            text: 'AI Agent研究综述',
                            alignment: AlignmentType.CENTER,
                            border: {
                                bottom: {
                                    color: '999999',
                                    space: 1,
                                    style: BorderStyle.SINGLE,
                                    size: 6
                                }
                            }
                        })
                    ]
                })
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    children: ['第 ', PageNumber.CURRENT, ' 页']
                                })
                            ]
                        })
                    ]
                })
            },
            children: docChildren
        }]
    });
    
    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync('/home/gary/.openclaw/workspace/ai-agent-papers-review.docx', buffer);
    console.log('文档已生成: /home/gary/.openclaw/workspace/ai-agent-papers-review.docx');
}

createDocument().catch(console.error);
