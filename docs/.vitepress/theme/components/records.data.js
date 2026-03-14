import { createContentLoader } from 'vitepress'
export default createContentLoader('records/data/*.md', { render: true })