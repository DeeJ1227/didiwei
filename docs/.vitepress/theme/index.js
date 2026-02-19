import DefaultTheme from 'vitepress/theme'
import './style.css'
import HomeHero from './components/HomeHero.vue' 
import MemoryCard from './components/MemoryCard.vue' 
import CityCard from './components/CityCard.vue' 
import WishItem from './components/WishItem.vue' 
import MessageList from './components/MessageList.vue' // 1. 引入

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('MemoryCard', MemoryCard)
    app.component('CityCard', CityCard)
    app.component('WishItem', WishItem)
    app.component('MessageList', MessageList) // 2. 注册
  }
}