<script setup>
import { ref, onMounted } from 'vue'
import { data as roses } from './roses.data.js'

const iframeRef = ref(null)

onMounted(() => {
  // 👇 核心修改：将所有相册里的多张照片全部提取并合并成一个大数组
  const imageUrls = roses.flatMap(item => item.frontmatter.gallery || []).filter(Boolean)
  
  if (iframeRef.value) {
    iframeRef.value.onload = () => {
      iframeRef.value.contentWindow.postMessage({ type: 'CMS_PHOTOS', photos: imageUrls }, '*')
    }
  }
})
</script>



<template>
  <div class="fixed inset-0 z-[9999] bg-black">
    
    <iframe ref="iframeRef" src="/rose-album.html" class="w-full h-full border-none outline-none"></iframe>
    
    <a href="/" class="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-pink-700 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all z-[10000]">
      <i class="fas fa-arrow-left mr-2"></i> 返回主页
    </a>
    
  </div>
</template>