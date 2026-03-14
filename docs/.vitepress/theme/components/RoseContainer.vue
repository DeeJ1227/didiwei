<script setup>
import { ref, onMounted } from 'vue'

// 🪄 Vite 魔法：在网页启动时，自动扫描这个文件夹下的所有图片文件！
// 不管你是本地拷贝进来的，还是通过后台上传的，只要在这个文件夹里，全都能抓到！
const imageModules = import.meta.glob('/public/images/roses/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG}', { eager: true })

const iframeRef = ref(null)

onMounted(() => {
  // 把扫描到的文件路径，转换成网页能用的正确链接 (去掉 /public 前缀)
  const imageUrls = Object.keys(imageModules).map(path => path.replace('/public', ''))

  if (iframeRef.value) {
    iframeRef.value.onload = () => {
      // 把所有图片链接一键投喂给 3D 沙盒
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