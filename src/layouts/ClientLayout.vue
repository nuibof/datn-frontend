<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-500">
    <!-- Navbar đơn giản cho khách -->
    <Header class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-yellow-300 transition-colors duration-300 py-4 px-6 flex items-center justify-between">
      </Header>

    <!-- Nội dung phía dưới header -->
    <main class="pt-[64px] px-4 md:px-10 py-6 flex-1">
      <router-view />
    </main>

    <!-- Footer đơn giản -->
    <footer class="text-sm text-center py-4">
      © 2025 ZenAI Hotel. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/stores/useThemeStore";
import Header from "@/components/client/Header.vue";


const theme = useThemeStore()


</script>


<style scoped>
/* Có thể thêm animation scroll, navbar sticky nếu cần sau */
</style>
