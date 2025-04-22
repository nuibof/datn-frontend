<template>
  <header
      v-bind="$attrs"
  class="fixed top-0 left-0 right-0 z-50
  bg-white/90 dark:bg-slate-900/80 backdrop-blur-md
  shadow-md border-b border-slate-200 dark:border-slate-700
  hover:border-blue-400 dark:hover:border-yellow-300
  transition-colors duration-300 py-4 px-6 flex items-center justify-between"
  >
    <!-- Logo -->
    <router-link to="/" class="text-xl font-bold tracking-wide">ZenAI Hotel</router-link>

    <!-- Nút mở menu trên mobile -->
    <button
        class="md:hidden text-slate-800 dark:text-white z-50 transition-transform duration-300"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ 'rotate-45': mobileMenuOpen }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>



    <!-- Menu Desktop -->
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
      <router-link
          to="/"
          class="relative hover:underline underline-offset-4 decoration-blue-400 dark:decoration-yellow-300"
          :class="activeRoute('/')"
      >Trang chủ</router-link>

      <router-link
          to="/rooms"
          class="relative hover:underline underline-offset-4 decoration-blue-400 dark:decoration-yellow-300"
          :class="activeRoute('/rooms')"
      >Phòng</router-link>

      <router-link
          to="/about"
          class="relative hover:underline underline-offset-4 decoration-blue-400 dark:decoration-yellow-300"
          :class="activeRoute('/about')"
      >Giới thiệu</router-link>

      <router-link
          to="/booking"
          class="relative hover:underline underline-offset-4 decoration-blue-400 dark:decoration-yellow-300"
          :class="activeRoute('/booking')"
      >Đặt phòng</router-link>
    </nav>

    <!-- Dropdown tài khoản -->
    <div class="account relative flex items-center gap-4">
      <button @click="toggleDropdown"
              class="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-yellow-400">
        Xin chào, <span class="font-semibold">Tên Khách Hàng!</span>
        <User class="w-5 h-5" />
      </button>

      <!-- Dropdown -->
      <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="dropdownOpen"
             class="absolute top-full right-0 mt-2 w-52 rounded-md shadow-lg z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600">
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
            <!-- Đổi theme -->
            <li class="px-4 pt-3 pb-2 border-t border-gray-200 dark:border-slate-600">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium opacity-80">Chế độ tối</span>
                <button
                    @click="toggleTheme"
                    class="relative w-10 h-5 bg-gray-300 dark:bg-slate-600 rounded-full transition-colors duration-300"
                >
                  <span
                      class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300"
                      :class="{ 'translate-x-5': theme.isDark }"
                  />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>

  <!-- Menu mobile -->
  <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
  >
    <div
        v-if="mobileMenuOpen"
        class="fixed top-[60px] left-0 w-full bg-white dark:bg-slate-800 px-6 py-4 shadow md:hidden z-40"
    >
      <nav class="flex flex-col gap-4 text-sm font-medium">
        <router-link to="/" @click="mobileMenuOpen = false">Trang chủ</router-link>
        <router-link to="/rooms" @click="mobileMenuOpen = false">Phòng</router-link>
        <router-link to="/about" @click="mobileMenuOpen = false">Giới thiệu</router-link>
        <router-link to="/booking" @click="mobileMenuOpen = false">Đặt phòng</router-link>
      </nav>
    </div>
  </transition>


</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { User, Lock, LogOut } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/useThemeStore'

defineOptions({ inheritAttrs: false }) // 👈 để hỗ trợ truyền class từ ngoài

const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)
const theme = useThemeStore()
const route = useRoute()

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function toggleTheme() {
  theme.toggle()
  dropdownOpen.value = false // tắt dropdown sau khi đổi theme
}

function activeRoute(path) {
  return route.path.startsWith(path)
      ? 'underline font-semibold text-blue-600 dark:text-yellow-300'
      : ''
}

function handleClickOutside(e) {
  if (!e.target.closest('.account')) dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
