<script setup>
import { useData, useRoute } from 'vitepress'
import { computed, watchEffect } from 'vue'

const { frontmatter } = useData()
const route = useRoute()

// 智能判断：只有当我们在看“秘密信箱”的具体文章时，才应用信纸效果
const isMessage = computed(() => route.path.includes('/messages/posts/'))

// 把机器日期变成好看的中文日期
const formattedDate = computed(() => {
  if (!frontmatter.value.date) return ''
  const d = new Date(frontmatter.value.date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

// 核心黑科技：如果当前是信件页，自动给整个网页打上 "letter-theme" 的标记
watchEffect(() => {
  if (typeof window !== 'undefined') {
    if (isMessage.value) {
      document.documentElement.classList.add('letter-theme')
    } else {
      document.documentElement.classList.remove('letter-theme')
    }
  }
})
</script>

<template>
  <div v-if="isMessage" class="max-w-3xl mx-auto mb-4">
    <div class="text-center border-b border-pink-100/60 pb-8 pt-4">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-wide">
        {{ frontmatter.title }}
      </h1>
      
      <div class="flex justify-center items-center gap-4 text-sm font-mono text-gray-400">
        <span>{{ formattedDate }}</span>
        <span class="bg-pink-50 text-pink-500 px-4 py-1.5 rounded-full font-bold shadow-sm">
          To: 耀薇
        </span>
      </div>
    </div>
  </div>
</template>