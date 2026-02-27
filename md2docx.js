const docx = require('docx');
const fs = require('fs');
const { Document, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType, AlignmentType, BorderStyle, convertInchesToTwip } = docx;

// 解析 Markdown 内容为结构化数据
function parseMarkdown(content) {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;
    
    while (i < lines.length) {
        const line = lines[i];
        
        // 跳过空行
        if (!line.trim()) {
            i++;
            continue;
        }
        
        // 处理分隔线
        if (line.trim() === '---') {
            elements.push({ type: 'separator' });
            i++;
            continue;
        }
        
        // 处理表格
        if (line.startsWith('|')) {
            const tableLines = [];
            while (i < lines.length && lines[i].startsWith('|')) {
                tableLines.push(lines[i]);
                i++;
            }
            elements.push(parseTable(tableLines));
            continue;
        }
        
        // 处理标题
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
        if (line.startsWith('#### ')) {
            elements.push({ type: 'heading4', text: line.substring(5).trim() });
            i++;
            continue;
        }
        
        // 处理列表项
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const listItems = [];
            while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
                const itemText = lines[i].trim().substring(2);
                listItems.push(parseInlineFormatting(itemText));
                i++;
            }
            elements.push({ type: 'bulletList', items: listItems });
            continue;
        }
        
        // 处理编号列表
        if (/^\s*\d+\.\s/.test(line)) {
            const listItems = [];
            while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
                const match = lines[i].match(/^\s*\d+\.\s(.*)$/);
                if (match) {
                    listItems.push(parseInlineFormatting(match[1]));
                }
                i++;
            }
            elements.push({ type: 'numberedList', items: listItems });
            continue;
        }
        
        // 处理代码块
        if (line.startsWith('```')) {
            const codeLines = [];
            const lang = line.substring(3).trim();
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            elements.push({ type: 'code', language: lang, content: codeLines.join('\n') });
            i++;
            continue;
        }
        
        // 处理普通段落（带内联格式）
        elements.push({ type: 'paragraph', content: parseInlineFormatting(line) });
        i++;
    }
    
    return elements;
}

// 解析表格
function parseTable(lines) {
    const rows = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // 跳过分隔行 (|---|---|)
        if (line.replace(/\|/g, '').replace(/[-\s]/g, '').length === 0) {
            continue;
        }
        const cells = line.split('|').filter(cell => cell.trim() !== '');
        rows.push(cells.map(cell => parseInlineFormatting(cell.trim())));
    }
    return { type: 'table', rows };
}

// 解析内联格式（粗体、斜体、代码等）
function parseInlineFormatting(text) {
    const parts = [];
    let current = '';
    let i = 0;
    
    while (i < text.length) {
        // 处理粗体 **text**
        if (text.substring(i, i + 2) === '**') {
            if (current) {
                parts.push({ text: current, bold: false, italic: false, code: false });
                current = '';
            }
            i += 2;
            const endIdx = text.indexOf('**', i);
            if (endIdx !== -1) {
                parts.push({ text: text.substring(i, endIdx), bold: true, italic: false, code: false });
                i = endIdx + 2;
            } else {
                current += '**';
            }
            continue;
        }
        
        // 处理斜体 *text* (但不在粗体内)
        if (text[i] === '*' && text[i + 1] !== '*') {
            if (current) {
                parts.push({ text: current, bold: false, italic: false, code: false });
                current = '';
            }
            i++;
            const endIdx = text.indexOf('*', i);
            if (endIdx !== -1) {
                parts.push({ text: text.substring(i, endIdx), bold: false, italic: true, code: false });
                i = endIdx + 1;
            } else {
                current += '*';
            }
            continue;
        }
        
        // 处理行内代码 `code`
        if (text[i] === '`') {
            if (current) {
                parts.push({ text: current, bold: false, italic: false, code: false });
                current = '';
            }
            i++;
            const endIdx = text.indexOf('`', i);
            if (endIdx !== -1) {
                parts.push({ text: text.substring(i, endIdx), bold: false, italic: false, code: true });
                i = endIdx + 1;
            } else {
                current += '`';
            }
            continue;
        }
        
        current += text[i];
        i++;
    }
    
    if (current) {
        parts.push({ text: current, bold: false, italic: false, code: false });
    }
    
    return parts;
}

// 创建文档元素
function createDocumentElements(elements) {
    const docElements = [];
    
    for (const elem of elements) {
        switch (elem.type) {
            case 'heading1':
                docElements.push(new Paragraph({
                    text: elem.text,
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                }));
                break;
                
            case 'heading2':
                docElements.push(new Paragraph({
                    text: elem.text,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 150 }
                }));
                break;
                
            case 'heading3':
                docElements.push(new Paragraph({
                    text: elem.text,
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 250, after: 100 }
                }));
                break;
                
            case 'heading4':
                docElements.push(new Paragraph({
                    text: elem.text,
                    heading: HeadingLevel.HEADING_4,
                    spacing: { before: 200, after: 100 }
                }));
                break;
                
            case 'paragraph':
                docElements.push(createFormattedParagraph(elem.content));
                break;
                
            case 'bulletList':
                for (const item of elem.items) {
                    docElements.push(new Paragraph({
                        children: createTextRuns(item),
                        bullet: { level: 0 },
                        spacing: { before: 60, after: 60 }
                    }));
                }
                break;
                
            case 'numberedList':
                for (let idx = 0; idx < elem.items.length; idx++) {
                    docElements.push(new Paragraph({
                        children: createTextRuns(elem.items[idx]),
                        numbering: { reference: 'my-numbering', level: 0 },
                        spacing: { before: 60, after: 60 }
                    }));
                }
                break;
                
            case 'table':
                docElements.push(createTable(elem.rows));
                break;
                
            case 'code':
                docElements.push(new Paragraph({
                    children: [new TextRun({
                        text: elem.content,
                        font: 'Courier New',
                        size: 20,
                        color: '333333'
                    })],
                    shading: { fill: 'F5F5F5' },
                    spacing: { before: 100, after: 100 },
                    indent: { left: 200 }
                }));
                break;
                
            case 'separator':
                docElements.push(new Paragraph({
                    border: {
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' }
                    },
                    spacing: { before: 200, after: 200 }
                }));
                break;
        }
    }
    
    return docElements;
}

// 创建格式化的段落
function createFormattedParagraph(parts) {
    return new Paragraph({
        children: createTextRuns(parts),
        spacing: { before: 100, after: 100 }
    });
}

// 创建 TextRun 数组
function createTextRuns(parts) {
    return parts.map(part => new TextRun({
        text: part.text,
        bold: part.bold,
        italics: part.italic,
        font: part.code ? 'Courier New' : undefined,
        size: part.code ? 20 : 24,
        color: part.code ? 'C7254E' : undefined
    }));
}

// 创建表格
function createTable(rows) {
    if (rows.length === 0) return new Paragraph({ text: '' });
    
    const tableRows = rows.map((row, rowIndex) => {
        return new TableRow({
            children: row.map(cell => new TableCell({
                children: [new Paragraph({
                    children: createTextRuns(cell),
                    spacing: { before: 60, after: 60 }
                })],
                shading: rowIndex === 0 ? { fill: 'F0F0F0' } : undefined,
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
                }
            }))
        });
    });
    
    return new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE }
    });
}

// 主转换函数
async function convertMarkdownToDocx(inputPath, outputPath) {
    const content = fs.readFileSync(inputPath, 'utf-8');
    const elements = parseMarkdown(content);
    const docElements = createDocumentElements(elements);
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: docElements
        }],
        numbering: {
            config: [{
                reference: 'my-numbering',
                levels: [{
                    level: 0,
                    format: 'decimal',
                    text: '%1.',
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 }
                        }
                    }
                }]
            }]
        }
    });
    
    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Usage: node md2docx.js <input.md> <output.docx>');
    process.exit(1);
}

convertMarkdownToDocx(args[0], args[1]).catch(console.error);
