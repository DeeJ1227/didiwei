<script setup>
import { data as wishes } from './wishes.data.js'
import WishItem from './WishItem.vue' // 复用你之前的愿望条组件
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6">
    <div v-if="wishes.length === 0" class="text-center text-gray-400 py-10">清单还在准备中...</div>
    
    <WishItem 
      v-for="wish in wishes" 
      :key="wish.url"
      :label="wish.frontmatter.title" 
      :done="wish.frontmatter.done" 
      :img="wish.frontmatter.image"
      :description="wish.frontmatter.description"
      :author="wish.frontmatter.author"  />
  </div>
</template>