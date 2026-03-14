<script setup>
import { useData, useRoute } from 'vitepress'
import { computed, watchEffect } from 'vue'

const { frontmatter } = useData()
const route = useRoute()

const isMessage = computed(() => route.path.includes('/messages/posts/'))

// 👇 新增：判断当前文章是否为迪迪发布
const isBoy = computed(() => frontmatter.value.author === '迪迪')

const formattedDate = computed(() => {
  if (!frontmatter.value.date) return ''
  const d = new Date(frontmatter.value.date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

// 👇 核心逻辑：根据是不是迪迪，给整个网页打上不同的信纸标签
watchEffect(() => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('letter-theme', 'letter-theme-boy')
    if (isMessage.value) {
      document.documentElement.classList.add(isBoy.value ? 'letter-theme-boy' : 'letter-theme')
    }
  }
})
</script>

<template>
  <div v-if="isMessage" class="max-w-3xl mx-auto mb-4">
    <div class="text-center border-b pb-8 pt-4" :class="isBoy ? 'border-blue-100/60' : 'border-pink-100/60'">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-wide">
        {{ frontmatter.title }}
      </h1>
      
      <div class="flex justify-center items-center gap-4 text-sm font-mono text-gray-400">
        <span>{{ formattedDate }}</span>
        <span class="px-4 py-1.5 rounded-full font-bold shadow-sm"
              :class="isBoy ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'">
          To: {{ isBoy ? '耀薇' : '迪迪' }}
        </span>
      </div>
    </div>
  </div>
</template>