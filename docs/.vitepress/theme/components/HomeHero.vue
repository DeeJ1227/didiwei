<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// === 💖 配置区：修改这里的日期 ===
const startDate = new Date("2024-06-18T00:00:00")
const boyName = "迪迪"
const girlName = "耀薇"
const boyAvatar = "/images/boy.jpg"
const girlAvatar = "/images/girl.jpg"
// =================================

const timerData = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timerInterval = null

const updateTimer = () => {
  const now = new Date()
  const difference = now - startDate

  if (difference > 0) {
    timerData.value.days = Math.floor(difference / (1000 * 60 * 60 * 24))
    timerData.value.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    timerData.value.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    timerData.value.seconds = Math.floor((difference % (1000 * 60)) / 1000)
  }
}

onMounted(() => {
  updateTimer()
  timerInterval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white -mt-[var(--vp-nav-height)]">
    
    <div class="relative w-full h-[60vh] min-h-[500px]">
        <div class="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000" 
             style="background-image: url('/images/bg_2.png');">
            <div class="absolute inset-0 bg-black/20"></div> </div>

        <div class="absolute inset-0 flex items-center justify-center z-10 px-4 pt-10">
            <div class="glass-panel rounded-[30px] p-6 md:p-10 w-full max-w-lg flex items-center justify-between animate-fade-in-up">
                <div class="flex flex-col items-center group">
                    <div class="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white transition-transform group-hover:scale-105">
                        <img :src="boyAvatar" class="w-full h-full object-cover">
                    </div>
                    <span class="mt-2 text-white font-bold drop-shadow-md tracking-wider">{{ boyName }}</span>
                </div>

                <div class="flex flex-col items-center justify-center mx-4">
                    <div class="heart-beat text-rose-500 text-3xl md:text-5xl drop-shadow-2xl filter">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>

                <div class="flex flex-col items-center group">
                    <div class="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white transition-transform group-hover:scale-105">
                        <img :src="girlAvatar" class="w-full h-full object-cover">
                    </div>
                    <span class="mt-2 text-white font-bold drop-shadow-md tracking-wider">{{ girlName }}</span>
                </div>
            </div>
        </div>

        <div class="custom-shape-divider-bottom z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill" fill="#FFFFFF"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill" fill="#FFFFFF"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill" fill="#FFFFFF"></path>
            </svg>
        </div>
    </div>

    <div class="grid-bg flex-grow w-full flex flex-col items-center justify-start pt-6 pb-20 px-4 relative z-30">
        
        <div class="text-center mb-12 animate-fade-in-up delay-100">
            <p class="text-pink-500 text-sm tracking-[0.2em] mb-2 font-medium uppercase">我们已经相爱了</p>
            <h1 class="font-serif text-3xl md:text-5xl font-bold text-gray-800 tracking-wide tabular-nums">
                {{ timerData.days }}<span class="text-lg md:text-2xl text-gray-400 mx-1 font-light">天</span>
                {{ timerData.hours }}<span class="text-lg md:text-2xl text-gray-400 mx-1 font-light">时</span>
                {{ timerData.minutes }}<span class="text-lg md:text-2xl text-gray-400 mx-1 font-light">分</span>
                {{ timerData.seconds }}<span class="text-lg md:text-2xl text-gray-400 mx-1 font-light">秒</span>
            </h1>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl px-2">
            
            <a href="/footprints" class="nav-card group bg-gradient-to-br from-white to-blue-50 border-blue-100 hover:border-blue-300">
                <div class="icon-box text-blue-500 bg-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <div class="mt-3 text-center">
                    <h3 class="text-gray-800 font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors">我们的足迹</h3>
                    <p class="text-gray-400 text-xs mt-1">走过的城市与风景</p>
                </div>
            </a>

            <a href="/gallery" class="nav-card group bg-gradient-to-br from-white to-purple-50 border-purple-100 hover:border-purple-300">
                <div class="icon-box text-purple-500 bg-white shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <i class="fas fa-images"></i>
                </div>
                <div class="mt-3 text-center">
                    <h3 class="text-gray-800 font-bold text-base md:text-lg group-hover:text-purple-600 transition-colors">时光相册</h3>
                    <p class="text-gray-400 text-xs mt-1">定格美好的瞬间</p>
                </div>
            </a>
            
            <a href="/wishes" class="nav-card group bg-gradient-to-br from-white to-amber-50 border-amber-100 hover:border-amber-300">
                <div class="icon-box text-amber-500 bg-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <div class="mt-3 text-center">
                    <h3 class="text-gray-800 font-bold text-base md:text-lg group-hover:text-amber-600 transition-colors">愿望清单</h3>
                    <p class="text-gray-400 text-xs mt-1">一起去完成的事</p>
                </div>
            </a>

            <a href="/messages" class="nav-card group bg-gradient-to-br from-white to-pink-50 border-pink-100 hover:border-pink-300">
                <div class="icon-box text-pink-500 bg-white shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <i class="fas fa-envelope-open-text"></i>
                </div>
                <div class="mt-3 text-center">
                    <h3 class="text-gray-800 font-bold text-base md:text-lg group-hover:text-pink-600 transition-colors">秘密留言</h3>
                    <p class="text-gray-400 text-xs mt-1">只写给你的情书</p>
                </div>
            </a>

        </div>
    </div>
  </div>
</template>

<style scoped>
/* 心跳动画 */
.heart-beat { animation: heartbeat 1.5s infinite; }
@keyframes heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
}

/* 入场动画 */
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
.delay-100 { animation-delay: 0.2s; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* 波浪分隔符 */
.custom-shape-divider-bottom {
    position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0; transform: rotate(180deg);
}
.custom-shape-divider-bottom svg { position: relative; display: block; width: calc(100% + 1.3px); height: 50px; }

/* 细方格背景 */
.grid-bg {
    background-size: 40px 40px;
    background-image:
        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-color: #fff;
}

/* 导航卡片 */
.nav-card {
    @apply rounded-2xl p-5 flex flex-col items-center justify-center border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-40;
}
.icon-box {
    @apply w-12 h-12 rounded-full flex items-center justify-center text-xl;
}
</style>