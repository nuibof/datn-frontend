<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <!-- Header giữ nguyên -->
    <Header :visible="isSidebarOpen" @toggleSidebar="toggleSidebar" />

    <!-- Layout dưới header -->
    <div class="relative flex flex-1 transition-all duration-500">
      <!-- Sidebar trượt vào -->
      <Sidebar :visible="isSidebarOpen" @close="isSidebarOpen = false" />

      <!-- Main content -->
      <main
          class="flex-1 bg-white dark:bg-slate-900 transition-all duration-500 p-4 pt-14"
          :class="{ 'translate-x-64': isSidebarOpen }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/admin/Header.vue'
import Sidebar from './components/admin/Sidebar.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
