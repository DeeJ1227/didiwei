<script setup>
// 1. 引入刚才写的抓取脚本
import { data as posts } from './messages.data.js'

// 2. 一个小工具：把日期格式化成 "2023年10月1日"
const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">
    
    <div v-if="posts.length === 0" class="text-center text-gray-400 py-20">
      <div class="text-6xl mb-4">📭</div>
      <p>信箱是空的，快去后台写下第一封信吧！</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <a 
        v-for="post in posts" 
        :key="post.url" 
        :href="post.url"
        class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-pink-50"
      >
        <div v-if="post.frontmatter.cover" class="h-48 overflow-hidden relative">
          <img 
            :src="post.frontmatter.cover" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt="cover"
          />
          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div v-else class="h-32 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
            <i class="fas fa-envelope text-white/50 text-4xl"></i>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
            <span>{{ formatDate(post.frontmatter.date) }}</span>
            <span class="px-3 py-1 rounded-full text-sm font-bold shadow-sm"
                  :class="post.frontmatter.author === '迪迪' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'">
              To: {{ post.frontmatter.author === '迪迪' ? '耀薇' : '迪迪' }}
            </span>
          </div>
          
          <h2 class="text-2xl font-bold transition-colors"
              :class="post.frontmatter.author === '迪迪' ? 'hover:text-blue-500' : 'hover:text-pink-500'">
            {{ post.frontmatter.title }}
          </h2>
          
          <div class="mt-4 text-sm"
              :class="post.frontmatter.author === '迪迪' ? 'text-blue-500 hover:text-blue-600' : 'text-pink-500 hover:text-pink-600'">
            点击阅读全文...
          </div>
        </div>
      </a>
    </div>

  </div>
</template>