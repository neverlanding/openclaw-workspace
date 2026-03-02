#!/usr/bin/env node
/**
 * 自然语言提醒解析器
 * 将中文时间描述转换为cron表达式
 */

const readline = require('readline');

/**
 * 解析自然语言时间为cron表达式
 * @param {string} input - 用户输入，如"明天9点半提醒我开会"
 * @returns {object} - {cron, message, error}
 */
function parseReminder(input) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    let targetDate = new Date(year, month, day, hour, minute);
    let message = '';
    let cronExpression = '';
    
    // 提取提醒内容（"提醒我"之后的部分）
    const contentMatch = input.match(/提醒[我你]?(.*)$/);
    if (contentMatch) {
        message = contentMatch[1].trim() || '提醒事项';
    }
    
    // ===== 相对时间解析 =====
    
    // X分钟后
    const minuteMatch = input.match(/(\d+)\s*分钟?后/);
    if (minuteMatch) {
        const minutes = parseInt(minuteMatch[1]);
        targetDate = new Date(now.getTime() + minutes * 60000);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // X小时后
    const hourMatch = input.match(/(\d+)\s*小时?后/);
    if (hourMatch) {
        const hours = parseInt(hourMatch[1]);
        targetDate = new Date(now.getTime() + hours * 3600000);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // 半小时后
    if (input.includes('半小时后')) {
        targetDate = new Date(now.getTime() + 30 * 60000);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // ===== 绝对日期解析 =====
    
    // 明天X点X分
    const tomorrowMatch = input.match(/明[天日](上午?|下午?|晚上?)?\s*(\d+)[点时](半|(\d+)分?)?/);
    if (tomorrowMatch) {
        const ampm = tomorrowMatch[1] || '';
        let targetHour = parseInt(tomorrowMatch[2]);
        let targetMinute = 0;
        
        // 处理半
        if (tomorrowMatch[3] === '半') {
            targetMinute = 30;
        } else if (tomorrowMatch[4]) {
            targetMinute = parseInt(tomorrowMatch[4]);
        }
        
        // 处理上午/下午
        if (ampm.includes('下午') || ampm.includes('晚上')) {
            if (targetHour < 12) targetHour += 12;
        }
        
        targetDate = new Date(year, month, day + 1, targetHour, targetMinute);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // 后天X点
    const afterTomorrowMatch = input.match(/后[天日](上午?|下午?|晚上?)?\s*(\d+)[点时](半|(\d+)分?)?/);
    if (afterTomorrowMatch) {
        const ampm = afterTomorrowMatch[1] || '';
        let targetHour = parseInt(afterTomorrowMatch[2]);
        let targetMinute = 0;
        
        if (afterTomorrowMatch[3] === '半') {
            targetMinute = 30;
        } else if (afterTomorrowMatch[4]) {
            targetMinute = parseInt(afterTomorrowMatch[4]);
        }
        
        if (ampm.includes('下午') || ampm.includes('晚上')) {
            if (targetHour < 12) targetHour += 12;
        }
        
        targetDate = new Date(year, month, day + 2, targetHour, targetMinute);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // 星期X
    const weekdays = ['日', '一', '二', '三', '四', '五', '六', '天'];
    const weekdayMatch = input.match(/下?个?星期([一二三四五六天日])(上午?|下午?|晚上?)?\s*(\d+)[点时](半|(\d+)分?)?/);
    if (weekdayMatch) {
        const targetWeekday = weekdays.indexOf(weekdayMatch[1]) % 7;
        const ampm = weekdayMatch[2] || '';
        let targetHour = parseInt(weekdayMatch[3]);
        let targetMinute = 0;
        
        if (weekdayMatch[4] === '半') {
            targetMinute = 30;
        } else if (weekdayMatch[5]) {
            targetMinute = parseInt(weekdayMatch[5]);
        }
        
        if (ampm.includes('下午') || ampm.includes('晚上')) {
            if (targetHour < 12) targetHour += 12;
        }
        
        // 计算目标日期
        const currentWeekday = now.getDay();
        let daysUntil = targetWeekday - currentWeekday;
        if (input.includes('下个') || daysUntil <= 0) {
            daysUntil += 7;
        }
        
        targetDate = new Date(year, month, day + daysUntil, targetHour, targetMinute);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // 今天X点
    const todayMatch = input.match(/今[天日](上午?|下午?|晚上?)?\s*(\d+)[点时](半|(\d+)分?)?/);
    if (todayMatch) {
        const ampm = todayMatch[1] || '';
        let targetHour = parseInt(todayMatch[2]);
        let targetMinute = 0;
        
        if (todayMatch[3] === '半') {
            targetMinute = 30;
        } else if (todayMatch[4]) {
            targetMinute = parseInt(todayMatch[4]);
        }
        
        if (ampm.includes('下午') || ampm.includes('晚上')) {
            if (targetHour < 12) targetHour += 12;
        }
        
        targetDate = new Date(year, month, day, targetHour, targetMinute);
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    // 特定时间格式：9点30分、9点半
    const timeOnlyMatch = input.match(/(上午?|下午?|晚上?)?\s*(\d+)[点时](半|(\d+)分?)?/);
    if (timeOnlyMatch) {
        const ampm = timeOnlyMatch[1] || '';
        let targetHour = parseInt(timeOnlyMatch[2]);
        let targetMinute = 0;
        
        if (timeOnlyMatch[3] === '半') {
            targetMinute = 30;
        } else if (timeOnlyMatch[4]) {
            targetMinute = parseInt(timeOnlyMatch[4]);
        }
        
        if (ampm.includes('下午') || ampm.includes('晚上')) {
            if (targetHour < 12) targetHour += 12;
        }
        
        targetDate = new Date(year, month, day, targetHour, targetMinute);
        // 如果设置的时间已经过去，默认明天
        if (targetDate < now) {
            targetDate = new Date(year, month, day + 1, targetHour, targetMinute);
        }
        cronExpression = formatCron(targetDate);
        return { cron: cronExpression, message, targetDate, error: null };
    }
    
    return { cron: null, message: null, targetDate: null, error: '无法解析时间，请使用格式如：明天9点半、3小时后、下周一早上8点' };
}

/**
 * 将日期转换为cron表达式（精确到分钟的一次性任务）
 * @param {Date} date - 目标日期
 * @returns {string} - cron表达式
 */
function formatCron(date) {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1; // cron使用1-12月
    
    // 格式: 分钟 小时 日 月 *
    return `${minute} ${hour} ${day} ${month} *`;
}

/**
 * 格式化日期为中文显示
 * @param {Date} date - 目标日期
 * @returns {string} - 格式化字符串
 */
function formatDateChinese(date) {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    return `${month}月${day}日 星期${weekday} ${hour}:${minute}`;
}

// 主函数
if (require.main === module) {
    const input = process.argv.slice(2).join(' ');
    
    if (!input) {
        console.log(JSON.stringify({ error: '请输入提醒内容，如：明天9点半提醒我开会' }));
        process.exit(1);
    }
    
    const result = parseReminder(input);
    
    if (result.error) {
        console.log(JSON.stringify({ error: result.error }));
        process.exit(1);
    }
    
    console.log(JSON.stringify({
        cron: result.cron,
        message: result.message,
        displayTime: formatDateChinese(result.targetDate),
        timestamp: result.targetDate.getTime()
    }));
}

module.exports = { parseReminder, formatCron, formatDateChinese };
