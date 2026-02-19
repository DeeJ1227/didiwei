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
    nav: []
  }
})