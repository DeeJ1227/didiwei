const fs = require('fs');
const path = require('path');

// 指向足迹的数据文件夹
const mdDir = path.join(__dirname, 'docs/footprints/data');

console.log('🔍 开始扫描足迹的旧文章...');

// 读取所有 md 文件
const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(mdDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 判断文章里是否已经有 author 字段了
    if (/^author:/m.test(content)) {
        // 如果有，统一替换为迪迪
        content = content.replace(/^author:.*$/m, 'author: 迪迪');
    } else {
        // 如果没有（旧数据），在最顶部的 --- 下方自动插入一行 author: 迪迪
        content = content.replace(/^---\r?\n/, '---\nauthor: 迪迪\n');
    }

    // 保存回文件
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
});

console.log(`\n🎉 魔法执行完毕！已成功为 ${updatedCount} 篇足迹盖上了【迪迪】的专属印记！`);