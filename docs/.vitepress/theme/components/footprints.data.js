import { createContentLoader } from 'vitepress'
export default createContentLoader('footprints/data/*.md', {
  transform(rawData) {
    return rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
})