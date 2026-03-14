<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()
const route = useRoute()

const isMessage = computed(() => route.path.includes('/messages/posts/'))
const coverImage = computed(() => frontmatter.value.image || frontmatter.value.cover)

const formattedDate = computed(() => {
  if (!frontmatter.value.date) return ''
  const d = new Date(frontmatter.value.date)
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
})
</script>

<template>
  <div v-if="isMessage && coverImage" class="mt-16 mb-8 flex justify-center">
    
    <div class="bg-white p-4 pb-16 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-gray-100 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 w-[90%] sm:w-[450px] relative">
      
      <div class="w-full bg-[#1a1a1a] border border-gray-200/50 shadow-inner p-1">
        <img :src="coverImage" class="w-full h-auto block opacity-95" alt="Polaroid Memory" />
      </div>

      <div class="absolute bottom-5 left-0 right-0 text-center">
        <span class="font-mono text-gray-400 text-sm tracking-widest">{{ formattedDate }}</span>
      </div>
      
    </div>
    
  </div>
</template>