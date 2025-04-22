<template>
  <header
      class="fixed top-0 left-0 right-0
         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
         transition-colors duration-1000
         shadow-md px-4 py-3 flex items-center justify-between z-50"
  >

  <!-- Left: Toggle + Logo -->
    <div class="flex items-center space-x-3">
      <!-- Nút luôn hiển thị trên mọi device -->
      <!-- props: visible từ cha truyền vào -->
      <button
          @click="$emit('toggleSidebar')"
          class="transition-transform duration-600 ease-in-out
         text-slate-800 dark:text-white
         hover:scale-110 hover:text-blue-600 dark:hover:text-yellow-300"
          :class="{
    'rotate-45 text-blue-600 dark:text-yellow-300': visible
  }"
      >
        <Menu class="w-6 h-6" />
      </button>







    </div>

    <div class="logo hidden md:flex items-center">
      <router-link to="/">
        <span
            class="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
        >
          ZenAI Hotel
        </span>
      </router-link>
    </div>

    <!-- Right: Account Dropdown -->
    <div class="relative" @click="toggleDropdown">
      <button class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400">

      Xin chào, <span class="font-semibold">Tên Nhân Viên</span>
        <User class="w-5 h-5" />
      </button>

      <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
      >
        <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-md shadow-lg z-50"
        >
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li class="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
              <User class="w-4 h-4" />
              <span>Thông tin tài khoản</span>
            </li>
            <li class="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
              <Lock class="w-4 h-4" />
              <span>Đổi mật khẩu</span>
            </li>
            <li class="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer">
              <LogOut class="w-4 h-4" />
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      </transition>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Menu, User, Lock, LogOut } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/useThemeStore'
defineProps({
  visible: Boolean
})
// Auto đóng khi click ra ngoài
function handleClickOutside(event) {
  if (!event.target.closest('.account')) {
    dropdownOpen.value = false
  }
}

const dropdownOpen = ref(false)
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

const theme = useThemeStore()
onMounted(() => theme.init())
</script>
<style>
.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 3s ease infinite alternate;
  -moz-animation: animatedgradient 3s ease infinite alternate;
  animation: animatedgradient 3s ease infinite alternate;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

