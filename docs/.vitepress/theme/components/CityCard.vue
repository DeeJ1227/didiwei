<script setup>
defineProps({
  name: String,   // 城市名 (如 平坝)
  cover: String,  // 封面图
  link: String,   // 跳转链接 (如 /footprints/pingba)
  count: String   // 照片数量 (如 3张照片)
})
</script>

<template>
  <a :href="link" class="group block relative w-full h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <img :src="cover" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
    
    <div class="absolute bottom-0 left-0 w-full p-6 text-white">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-3xl font-bold font-serif mb-1 tracking-wide">{{ name }}</h2>
          <div class="h-1 w-12 bg-pink-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
        </div>
        <span class="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
          <i class="fas fa-images mr-1"></i> {{ count }}
        </span>
      </div>
    </div>
  </a>
</template>