<script setup>
import { ref, computed, reactive } from 'vue'
import { data as footprints } from './footprints.data.js'

// 核心逻辑：自动把足迹按“城市”进行分组
const groupedData = computed(() => {
  const groups = {}
  footprints.forEach(item => {
    const city = item.frontmatter.city || '未命名城市'
    if (!groups[city]) groups[city] = []
    groups[city].push(item)
  })
  return groups
})

// activeCity 为 null 时显示“城市文件夹”，有值时显示“该城市下的翻转照片”
const activeCity = ref(null)

// 用于追踪哪些卡片被翻转了
const flippedCards = reactive(new Set())

const toggleFlip = (url) => {
  if (flippedCards.has(url)) {
    flippedCards.delete(url)
  } else {
    flippedCards.add(url)
  }
}

const expandedText = ref(new Set())
const toggleText = (url) => {
  if (expandedText.value.has(url)) expandedText.value.delete(url)
  else expandedText.value.add(url)
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">

    <div v-if="!activeCity">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div 
          v-for="(items, city) in groupedData" :key="city"
          @click="activeCity = city"
          class="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <img :src="items[0].frontmatter.image_front" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
            <h3 class="text-white text-2xl font-bold border-b-4 border-pink-500 pb-1 inline-block">{{ city }}</h3>
            <div class="bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
              <i class="fas fa-image mr-1"></i> {{ items.length }}个瞬间
            </div>
          </div>
        </div>

        <div class="h-64 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
          <span class="text-4xl mb-2">+</span>
          <span>等待解锁下一站...</span>
        </div>

      </div>
    </div>

    <div v-else>
      <button 
        @click="activeCity = null; flippedCards.clear()"
        class="mb-6 flex items-center text-gray-500 hover:text-pink-500 transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
      >
        <span class="font-bold text-xl mr-2">←</span> 返回足迹地图
      </button>

      <div class="grid grid-cols-1 gap-12 pb-20 mt-8">
        
        <div 
          v-for="fp in groupedData[activeCity]" :key="fp.url" 
          class="scene w-full max-w-4xl mx-auto h-[450px] cursor-pointer group perspective-1000"
          @click="toggleFlip(fp.url)"
        >
          <div 
            class="card relative w-full h-full transition-all duration-700 transform-style-3d shadow-xl rounded-2xl border border-gray-100"
            :class="{ 'rotate-y-180': flippedCards.has(fp.url) }"
          >
            
            <div class="card-face absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white flex flex-col">
              
              <div class="h-[80%] w-full relative bg-white border-b border-gray-100">
                   <img :src="fp.frontmatter.image_front" class="w-full h-full object-contain bg-white p-2" />
              </div>
              
              <div class="h-[20%] flex flex-col justify-center px-6 bg-white">
                  <div class="flex items-center justify-between">
                      <h3 class="text-gray-800 font-bold text-lg md:text-xl flex items-center">
                          <i class="fas fa-map-marker-alt mr-2" :class="fp.frontmatter.author === '迪迪' ? 'text-blue-500' : 'text-pink-500'"></i>{{ fp.frontmatter.city }}
                      </h3>
                      <span class="text-sm text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full">
                        {{ new Date(fp.frontmatter.date).toLocaleDateString().replace(/\//g, '.') }}
                      </span>
                  </div>
              </div>
              
              <div v-if="fp.frontmatter.image" class="absolute bottom-4 right-4 text-gray-300 animate-bounce">
                  <i class="fas fa-hand-pointer"></i>
              </div>
            </div>

            <div 
              v-if="fp.frontmatter.image"
              class="card-face absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white border-2"
              :class="fp.frontmatter.author === '迪迪' ? 'border-blue-100' : 'border-pink-100'"
            >
              <div class="w-full h-full overflow-y-auto bg-white flex flex-col custom-scrollbar">
                
                <div class="w-full relative bg-white border-b shrink-0 transition-all duration-300" 
                     :class="[fp.html ? 'h-[280px]' : 'h-[80%]', fp.frontmatter.author === '迪迪' ? 'border-blue-50' : 'border-pink-50']">
                    <img :src="fp.frontmatter.image" class="w-full h-full object-contain bg-white p-2" />
                    <div class="absolute top-4 right-4 text-4xl drop-shadow-sm"
                         :class="fp.frontmatter.author === '迪迪' ? 'text-blue-500/80' : 'text-pink-500/80'">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                
                <div class="flex flex-col items-center cursor-auto" 
                     :class="[fp.html ? 'p-5 shrink-0 justify-start' : 'h-[20%] px-4 justify-center', fp.frontmatter.author === '迪迪' ? 'bg-blue-50/40' : 'bg-pink-50/40']" @click.stop>
                    
                    <div class="font-medium text-center" :class="[fp.html ? 'mb-3' : '', fp.frontmatter.author === '迪迪' ? 'text-blue-600' : 'text-pink-600']">
                        {{ fp.frontmatter.description }}
                    </div>
                    
                    <button v-if="fp.html" @click="toggleText(fp.url)" class="text-sm flex items-center transition-colors bg-white px-5 py-2 rounded-full shadow-sm border mb-2"
                            :class="fp.frontmatter.author === '迪迪' ? 'text-blue-500 hover:text-blue-600 border-blue-100' : 'text-pink-500 hover:text-pink-600 border-pink-100'">
                       <i class="fas mr-2 transition-transform duration-300" :class="expandedText.has(fp.url) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                       {{ expandedText.has(fp.url) ? '收起日记' : '展开日记' }}
                    </button>
                    
                    <div v-show="expandedText.has(fp.url)" class="mt-3 w-full bg-white p-5 rounded-xl shadow-inner border text-gray-600 text-sm leading-loose text-left" 
                         :class="fp.frontmatter.author === '迪迪' ? 'border-blue-50' : 'border-pink-50'" v-html="fp.html">
                    </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      
      <div class="text-center text-gray-300 text-sm">
        —— 我们的故事，未完待续 ——
      </div>
    </div>

  </div>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { 
  backface-visibility: hidden; 
  -webkit-backface-visibility: hidden; 
}
.rotate-y-180 { transform: rotateY(180deg); }

/* 自定义粉色迷你滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #fbcfe8; /* 浅粉色 */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

/* 取消手机端点击时的高亮闪烁 */
.scene { -webkit-tap-highlight-color: transparent; }
</style>