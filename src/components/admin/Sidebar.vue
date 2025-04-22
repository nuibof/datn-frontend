<template>
  <transition name="slide-fade">
    <aside
        class="fixed top-[3.0rem] left-0 h-[calc(100dvh-3.5rem)] w-64
         bg-white dark:bg-slate-800 text-slate-800 dark:text-white
         backdrop-blur-md shadow-2xl p-6 z-40 flex flex-col
         transform transition-transform duration-500 ease-in-out"
        :class="visible ? 'translate-x-0' : '-translate-x-full'"
    >

    <!-- Tổ hợp menu + nút theme -->
      <div class="flex flex-col justify-between flex-1">
        <!-- Menu -->
        <div class="space-y-6">
          <router-link to="/admin/home" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <Home class="w-6 h-6 " />
            <span>Trang chủ</span>
          </router-link>
          <router-link to="/admin/" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <Building2 class="w-6 h-6" />
            <span>Tổng quan</span>
          </router-link>

          <router-link to="/admin/about/" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <Info class="w-6 h-6" />
            <span>Giới thiệu</span>
          </router-link>
          <router-link to="/admin/rooms/" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <Bed class="w-6 h-6" />
            <span>Phòng</span>
          </router-link>
          <router-link to="/admin/guests/" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <User class="w-6 h-6" />
            <span>Khách hàng</span>
          </router-link>
          <router-link to="/admin/booking/" class="flex items-center gap-3 hover:text-yellow-300 cursor-pointer" @click="$emit('close')">
            <Calendar class="w-6 h-6" />
            <span>Đặt phòng</span>
          </router-link>
        </div>
        <!-- Toggle dark/light -->
        <div class="pt-6 mt-6 border-t border-slate-600">
          <button
              @click="toggleTheme"
              @mouseenter="hovering = true; randomEmoji()"
              @mouseleave="hovering = false"
              class="group flex items-center justify-between gap-3 text-sm
           transition-all duration-300 transform hover:scale-105
           text-slate-800 dark:text-sky-200 hover:text-yellow-500 dark:hover:text-yellow-300 w-full"
              :title="isDark ? 'Đang ở chế độ tối' : 'Đang ở chế độ sáng'"
          >
            <!-- Icon -->
            <span v-if="isDark" class="relative inline-block">
      <Sun
          class="w-5 h-5 rotate-0 text-yellow-400 transition-transform duration-500 drop-shadow-[0_0_6px_rgba(253,224,71,0.75)] group-hover:scale-110"
      />
      <span
          class="absolute -top-1 -left-1 text-yellow-300 text-xs animate-ping
               pointer-events-none select-none"
      >
        ✨
      </span>
    </span>
            <span v-else class="relative inline-block">
      <Moon
          class="w-5 h-5 rotate-180 text-blue-500 transition-transform duration-500 group-hover:scale-110"
      />
      <span
          class="absolute -top-1 -right-1 text-yellow-300 text-xs animate-ping
               pointer-events-none select-none"
      >
        ✨
      </span>
    </span>

            <!-- Text badge style -->
            <span class="flex flex-col items-start text-xs sm:text-sm">
      <span class="uppercase tracking-wide text-slate-500 dark:text-slate-400">
        CHẾ ĐỘ
      </span>
      <span
          class="px-2 py-0.5 rounded-md font-semibold
               text-yellow-600 dark:text-blue-300
               bg-yellow-100 dark:bg-slate-700
               transition-colors duration-300"
      >
        {{ isDark ? 'TỐI 🌙' : 'SÁNG ☀️' }}
      </span>
    </span>
          </button>
        </div>

      </div>
    </aside>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { Home, Info, Bed, User, Calendar, Sun, Moon, Building2 } from 'lucide-vue-next'

defineProps({
  visible: Boolean,
})
defineEmits(['close'])

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  const root = document.documentElement
  if (isDark.value) {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
