// 这是一个数据加载器，专门用来读取 messages/posts 下的所有文章
import { createContentLoader } from 'vitepress'

export default createContentLoader('messages/posts/*.md', {
  includeSrc: false, // 我们只需要元数据（标题、封面等），不需要在列表中加载全部正文
  render: true,
  excerpt: true,
  transform(rawData) {
    // 按日期倒序排列（最新的在最上面）
    return rawData.sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    })
  }
})