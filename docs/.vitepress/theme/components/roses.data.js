// import { createContentLoader } from 'vitepress'
// export default createContentLoader('roses/data/*.md')

import { createContentLoader } from 'vitepress'
// 👇 新增 includeSrc: true，用来抓取 markdown 里的原始文本
export default createContentLoader('roses/data/gallery.md', { includeSrc: true })