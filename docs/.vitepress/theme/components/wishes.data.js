import { createContentLoader } from 'vitepress'
export default createContentLoader('wishes/data/*.md', {
  transform(rawData) {
    return rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
})