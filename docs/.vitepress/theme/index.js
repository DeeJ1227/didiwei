import DefaultTheme from 'vitepress/theme'
import { h } from 'vue' // 👇 新增：引入 Vue 的渲染函数
import './style.css'
import HomeHero from './components/HomeHero.vue' 
import MemoryCard from './components/MemoryCard.vue' 
import CityCard from './components/CityCard.vue' 
import WishItem from './components/WishItem.vue' 
import MessageList from './components/MessageList.vue'
import WishList from './components/WishList.vue'
import FootprintList from './components/FootprintList.vue'
import LetterFooter from './components/LetterFooter.vue'
import LetterHeader from './components/LetterHeader.vue'
import RoseContainer from './components/RoseContainer.vue'
import RecordList from './components/RecordList.vue'

export default {
  extends: DefaultTheme,
  
  // 👇 核心修改：使用 VitePress 的插槽功能，把抬头固定在正文最上方
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(LetterHeader),
      'doc-after': () => h(LetterFooter) // 👈 让拍立得出现在文章最末尾
    })
  },

  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('MemoryCard', MemoryCard)
    app.component('CityCard', CityCard)
    app.component('WishItem', WishItem)
    app.component('MessageList', MessageList)
    app.component('WishList', WishList)
    app.component('FootprintList', FootprintList)
    app.component('RoseContainer', RoseContainer)
    app.component('RecordList', RecordList)
  }
}