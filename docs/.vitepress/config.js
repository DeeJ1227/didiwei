import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "迪迪薇的恋爱时光~", // 👈 左上角的标题在这里改
  description: "耀薇可爱捏",
  
  // 禁用深色模式切换开关
  appearance: false,

  head: [
    ['script', { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@300;400;500&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }]
  ],
  
  themeConfig: {
    // 导航栏设为空数组，右侧就什么都没有了
    nav: [
      { text: '首页', link: '/' },
      { text: '💌 恋爱留言', link: '/messages' },
      { text: '✨ 愿望清单', link: '/wishes' },
      { text: '🗺️ 我们的足迹', link: '/footprints' },
      { text: '🌹 玫瑰相册', link: '/roses' },
      // 👇 新增这一行
      { text: '🎙️ 录音回忆', link: '/records' } 
    ],
  }
})