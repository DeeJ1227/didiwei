<script setup>
import { ref } from 'vue'

defineProps({
  city: String,
  date: String,
  cover: String,
  secret: String,
  desc: String
})

const isFlipped = ref(false)
const toggleFlip = () => isFlipped.value = !isFlipped.value
</script>

<template>
  <div class="scene w-full max-w-4xl mx-auto h-96 cursor-pointer group perspective-1000" @click="toggleFlip">
    <div class="card relative w-full h-full transition-all duration-700 transform-style-3d shadow-xl rounded-2xl border border-gray-100"
         :class="{ 'rotate-y-180': isFlipped }">
      
      <div class="card-face absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white flex flex-col">
        
        <div class="h-[80%] w-full relative bg-white border-b border-gray-100">
             <img :src="cover" class="w-full h-full object-contain bg-white p-2" />
        </div>
        
        <div class="h-[20%] flex flex-col justify-center px-6 bg-white">
            <div class="flex items-center justify-between">
                <h3 class="text-gray-800 font-bold text-lg md:text-xl flex items-center">
                    <i class="fas fa-map-marker-alt text-pink-500 mr-2"></i>{{ city }}
                </h3>
                <span class="text-sm text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full">{{ date }}</span>
            </div>
            <p class="text-gray-500 text-sm mt-1 truncate">{{ desc }}</p>
        </div>
        
        <div class="absolute bottom-4 right-4 text-gray-300 animate-bounce">
            <i class="fas fa-hand-pointer"></i>
        </div>
      </div>

      <div class="card-face absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white border-2 border-pink-100">
        <div class="w-full h-[85%] relative bg-white">
            <img :src="secret" class="w-full h-full object-contain bg-white p-2" />
            
            <div class="absolute top-4 right-4 text-pink-500/80 text-4xl drop-shadow-sm">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        
        <div class="h-[15%] flex items-center justify-center bg-pink-50 text-pink-600 font-medium px-4 text-center">
            {{ desc }}
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
</style>