const fs = require('fs');
const path = require('path');

// 1. 定义照片和帖子的文件夹路径
const imgDir = path.join(__dirname, 'docs/public/images/footprints');
const mdDir = path.join(__dirname, 'docs/footprints/data');

console.log('🔍 开始扫描足迹照片...');

// 2. 获取所有已存在的 md 文件，提取用过的图片，防止重复生成
const existingMds = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
const usedImages = new Set();
existingMds.forEach(mdFile => {
    const content = fs.readFileSync(path.join(mdDir, mdFile), 'utf-8');
    // 用正则找出已经发布的图片链接
    const matches = content.match(/image(?:_front)?:\s*(.+)/g);
    if (matches) {
        matches.forEach(m => usedImages.add(m.split(':')[1].trim()));
    }
});

// 3. 扫描图片文件夹，并进行智能配对
const files = fs.readdirSync(imgDir);
const memoryMap = new Map();

files.forEach(file => {
    if (file.startsWith('.')) return; // 忽略隐藏文件
    
    const ext = path.extname(file);
    const nameWithoutExt = path.basename(file, ext);

    let key, isCover, city, event;

    // 识别是不是 -c 结尾的封面图
    if (nameWithoutExt.endsWith('-c')) {
        key = nameWithoutExt.slice(0, -2);
        isCover = true;
    } else {
        key = nameWithoutExt;
        isCover = false;
    }

    // 智能拆分城市名和事件
    const parts = key.split('-');
    if (parts.length >= 2) {
        city = parts[0];
        event = parts.slice(1).join('-'); // 处理事件名里也有横线的情况
    } else {
        city = "未分类城市";
        event = key;
    }

    // 如果是新的一组照片，先在 Map 里建个空档案
    if (!memoryMap.has(key)) {
        memoryMap.set(key, { city, event, front: '', back: '' });
    }

    // 将照片归档 (无论 jpg 还是 png 都能完美匹配)
    const imagePath = `/images/footprints/${file}`;
    if (isCover) {
        memoryMap.get(key).front = imagePath;
    } else {
        memoryMap.get(key).back = imagePath;
    }
});

// 4. 为每一组照片生成可以在后台编辑的 Markdown 帖子
let count = 0;
const dateStr = new Date().toISOString(); // 生成当前时间

memoryMap.forEach((data, key) => {
    // 安全检查：如果这组照片已经在后台发过了，就跳过
    if (usedImages.has(data.front) || usedImages.has(data.back)) {
        return;
    }

    // 构造我们要的 Markdown 格式，并自动填入城市和默认描述
    const mdContent = `---
city: ${data.city}
admin_subtitle: ${data.event}
date: ${dateStr}
description: 这是我们在${data.city}关于“${data.event}”的回忆。
image: ${data.back}
image_front: ${data.front}
---
`;

    // 生成随机但安全的文件名
    const safeFileName = `${new Date().getTime()}-${data.city}-${data.event}.md`.replace(/\s+/g, '');
    fs.writeFileSync(path.join(mdDir, safeFileName), mdContent.trim());
    count++;
    
    console.log(`✅ 成功生成新帖子: [${data.city}] ${data.event}`);
});

console.log(`\n🎉 自动化执行完毕！共生成了 ${count} 篇新足迹帖子。快去后台看看吧！`);