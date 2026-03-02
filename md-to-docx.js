const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel, AlignmentType } = require("docx");
const fs = require("fs");

// 简单的 Markdown 解析器
function parseMarkdown(mdContent) {
    const lines = mdContent.split('\n');
    const elements = [];
    let i = 0;
    
    while (i < lines.length) {
        const line = lines[i];
        
        // 跳过空行
        if (line.trim() === '') {
            i++;
            continue;
        }
        
        // 水平线
        if (line.trim().startsWith('---')) {
            elements.push({ type: 'divider' });
            i++;
            continue;
        }
        
        // 标题
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = headingMatch[2];
            elements.push({ type: 'heading', level, text });
            i++;
            continue;
        }
        
        // 表格
        if (line.includes('|') && line.trim().startsWith('|')) {
            const tableRows = [];
            let j = i;
            
            while (j < lines.length && lines[j].includes('|') && lines[j].trim().startsWith('|')) {
                // 跳过分隔符行 (|---|---|)
                if (!lines[j].match(/^\|[\s\-:|]+\|$/)) {
                    const cells = lines[j].split('|').filter((cell, idx, arr) => {
                        // 过滤掉首尾空单元格
                        return !(idx === 0 || (idx === arr.length - 1));
                    }).map(cell => cell.trim());
                    if (cells.length > 0) {
                        tableRows.push(cells);
                    }
                }
                j++;
            }
            
            if (tableRows.length > 0) {
                elements.push({ type: 'table', rows: tableRows });
            }
            i = j;
            continue;
        }
        
        // 列表项
        const listMatch = line.match(/^[\-\*]\s+(.+)$/);
        if (listMatch) {
            const listItems = [];
            while (i < lines.length) {
                const listLine = lines[i];
                const match = listLine.match(/^[\-\*]\s+(.+)$/);
                if (match) {
                    listItems.push(match[1]);
                    i++;
                } else if (listLine.trim() === '') {
                    i++;
                    break;
                } else {
                    break;
                }
            }
            elements.push({ type: 'list', items: listItems });
            continue;
        }
        
        // 普通段落
        elements.push({ type: 'paragraph', text: line });
        i++;
    }
    
    return elements;
}

// 解析文本中的格式（粗体、斜体）
function parseTextRuns(text) {
    const runs = [];
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            runs.push(new TextRun({ text: text.substring(lastIndex, match.index) }));
        }
        
        if (match[1]) { // 粗体
            runs.push(new TextRun({ text: match[1], bold: true }));
        } else if (match[2]) { // 斜体
            runs.push(new TextRun({ text: match[2], italics: true }));
        }
        
        lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
        runs.push(new TextRun({ text: text.substring(lastIndex) }));
    }
    
    return runs.length > 0 ? runs : [new TextRun({ text })];
}

// 将 Markdown 元素转换为 docx 段落/表格
function convertElements(elements) {
    const children = [];
    
    for (const element of elements) {
        switch (element.type) {
            case 'heading':
                const headingLevel = {
                    1: HeadingLevel.HEADING_1,
                    2: HeadingLevel.HEADING_2,
                    3: HeadingLevel.HEADING_3,
                    4: HeadingLevel.HEADING_4,
                    5: HeadingLevel.HEADING_5,
                    6: HeadingLevel.HEADING_6
                }[element.level] || HeadingLevel.HEADING_2;
                
                children.push(new Paragraph({
                    heading: headingLevel,
                    children: parseTextRuns(element.text),
                    spacing: { before: 240, after: 120 }
                }));
                break;
                
            case 'paragraph':
                children.push(new Paragraph({
                    children: parseTextRuns(element.text),
                    spacing: { before: 120, after: 120 }
                }));
                break;
                
            case 'list':
                for (const item of element.items) {
                    children.push(new Paragraph({
                        children: [new TextRun({ text: "•  ", bold: true }), ...parseTextRuns(item)],
                        spacing: { before: 60, after: 60 },
                        indent: { left: 360 }
                    }));
                }
                break;
                
            case 'table':
                const tableRows = element.rows.map((row, rowIndex) => {
                    const isHeader = rowIndex === 0;
                    return new TableRow({
                        children: row.map(cellText => 
                            new TableCell({
                                children: [new Paragraph({
                                    children: parseTextRuns(cellText),
                                    alignment: AlignmentType.CENTER
                                })],
                                shading: isHeader ? { fill: "E8E8E8" } : undefined,
                                verticalAlign: "center"
                            })
                        )
                    });
                });
                
                children.push(new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE }
                }));
                children.push(new Paragraph({ spacing: { after: 200 } }));
                break;
                
            case 'divider':
                children.push(new Paragraph({
                    border: {
                        bottom: { color: "auto", space: 1, value: "single", size: 6 }
                    },
                    spacing: { before: 120, after: 120 }
                }));
                break;
        }
    }
    
    return children;
}

// 主转换函数
async function convertMarkdownToDocx(inputPath, outputPath) {
    console.log(`正在转换：${inputPath}`);
    
    const mdContent = fs.readFileSync(inputPath, 'utf-8');
    const elements = parseMarkdown(mdContent);
    const children = convertElements(elements);
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: children
        }]
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✓ 转换完成：${outputPath}`);
}

// 执行转换
async function main() {
    try {
        await convertMarkdownToDocx(
            '/home/gary/.openclaw/workspace/digital-employee-report.md',
            '/home/gary/.openclaw/workspace/digital-employee-report.docx'
        );
        
        await convertMarkdownToDocx(
            '/home/gary/.openclaw/workspace/ai_chip_report_2024.md',
            '/home/gary/.openclaw/workspace/ai_chip_report_2024.docx'
        );
        
        console.log('\n所有文件转换完成！');
    } catch (error) {
        console.error('转换失败:', error);
        process.exit(1);
    }
}

main();
