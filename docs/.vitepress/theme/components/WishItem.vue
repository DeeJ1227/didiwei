<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,    
  done: Boolean,    
  img: String,      
  description: String 
})

const isOpen = ref(false)

const toggle = () => {
  if (props.img || props.description) {
    isOpen.value = !isOpen.value
  }
}
</script>

<template>
  <div 
    class="border-b border-gray-100 py-4 transition-colors"
    :class="{ 'cursor-pointer hover:bg-gray-50': img || description }"
    @click="toggle"
  >
    <div class="flex items-center px-2">
      
      <div class="mr-4 text-2xl shrink-0">
        <i v-if="done" class="fas fa-check-circle text-emerald-400"></i>
        <i v-else class="far fa-circle text-gray-300"></i>
      </div>

      <div class="flex-grow font-medium text-lg transition-colors" :class="done ? 'text-gray-400' : 'text-gray-700'">
        {{ label }}
      </div>

      <div v-if="img || description" class="text-gray-300 text-sm transition-transform duration-300 shrink-0 ml-4" :class="{ 'rotate-180': isOpen }">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <div v-if="img || description" 
         class="overflow-hidden transition-all duration-500 ease-in-out"
         :style="{ maxHeight: isOpen ? '1000px' : '0px', opacity: isOpen ? 1 : 0 }"
    >
      <div class="mt-4 px-2 flex flex-col gap-3">
        <img v-if="img" :src="img" class="rounded-xl shadow-md w-full max-w-md object-cover border border-gray-100" />
        
        <p v-if="description" class="italic text-gray-500 text-sm leading-relaxed max-w-md">
          "{{ description }}"
        </p>
      </div>
    </div>

  </div>
</template>