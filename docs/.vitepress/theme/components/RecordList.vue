<script setup>
import { computed, ref } from 'vue' // 👈 追加引入 ref
import { data as rawRecords } from './records.data.js'

const records = computed(() => {
  return rawRecords.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
})

// 👇 新增：记录哪些正文被展开了
const expandedText = ref(new Set())
const toggleText = (url) => {
  if (expandedText.value.has(url)) expandedText.value.delete(url)
  else expandedText.value.add(url)
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div v-for="record in records" :key="record.url" 
           class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        
        <div v-if="record.frontmatter.image" class="w-full h-48 relative bg-gray-50 border-b border-gray-100">
          <img :src="record.frontmatter.image" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-microphone-alt mr-2" :class="record.frontmatter.author === '迪迪' ? 'text-blue-500' : 'text-pink-500'"></i> 
              {{ record.frontmatter.title }}
            </h3>
            <p v-if="record.frontmatter.subtitle" class="text-sm text-gray-500 mt-2">
              {{ record.frontmatter.subtitle }}
            </p>
          </div>
          
          <div v-if="record.frontmatter.audio" class="w-full mt-4 bg-gray-50 rounded-full p-1 shadow-inner">
            <audio controls class="w-full h-10 outline-none custom-audio" controlsList="nodownload">
              <source :src="record.frontmatter.audio" type="audio/mpeg">
            </audio>
          </div>
          
          <div class="mt-5 text-right">
            <span class="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              {{ new Date(record.frontmatter.date).toLocaleDateString().replace(/\//g, '.') }}
            </span>
          </div>

          <div v-if="record.html" class="mt-6 border-t border-gray-50 pt-4">
            <button @click="toggleText(record.url)" class="text-sm font-medium transition-colors flex items-center"
                    :class="record.frontmatter.author === '迪迪' ? 'text-blue-500 hover:text-blue-600' : 'text-pink-500 hover:text-pink-600'">
              <i class="fas mr-1 transition-transform duration-300" :class="expandedText.has(record.url) ? 'fa-book-open' : 'fa-book'"></i>
              <span>{{ expandedText.has(record.url) ? '收起正文' : '阅读正文' }}</span>
            </button>
            <div v-show="expandedText.has(record.url)" class="mt-4 text-gray-600 text-sm leading-loose p-4 rounded-xl shadow-inner" 
                 :class="record.frontmatter.author === '迪迪' ? 'bg-blue-50/30' : 'bg-pink-50/30'" v-html="record.html"></div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 稍微美化一下原生音频播放器，使其更贴合网页风格 */
.custom-audio::-webkit-media-controls-enclosure {
  background-color: #f9fafb; /* Tailwind gray-50 */
  border-radius: 9999px;
}
</style>