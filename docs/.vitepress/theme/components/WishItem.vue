<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,    // 愿望内容
  done: Boolean,    // 是否完成 (true/false)
  img: String       // 证据图片路径 (可选)
})

const isOpen = ref(false)

// 只有当有图片时，点击才会有反应
const toggle = () => {
  if (props.img) {
    isOpen.value = !isOpen.value
  }
}
</script>

<template>
  <div 
    class="border-b border-gray-100 py-4 transition-colors"
    :class="{ 'cursor-pointer hover:bg-gray-50': img }"
    @click="toggle"
  >
    <div class="flex items-center px-2">
      
      <div class="mr-4 text-2xl">
        <i v-if="done" class="fas fa-check-circle text-emerald-400"></i>
        <i v-else class="far fa-circle text-gray-300"></i>
      </div>

      <div class="flex-grow text-gray-700 font-medium text-lg">
        {{ label }}
      </div>

      <div v-if="img" class="text-gray-300 text-sm transition-transform duration-300" :class="{ 'rotate-180': isOpen }">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <div v-if="img" 
         class="overflow-hidden transition-all duration-500 ease-in-out"
         :style="{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }"
    >
      <div class="mt-4 px-2">
        <img :src="img" class="rounded-xl shadow-md w-full max-w-md object-cover border border-gray-100" />
      </div>
    </div>

  </div>
</template>