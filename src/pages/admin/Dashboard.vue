<template>
  <div class="p-6 space-y-6 text-slate-800 dark:text-white">
    <!-- Section: Thống kê nhanh -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center transition-colors duration-300">
        <p class="text-sm opacity-70">Tổng số phòng</p>
        <h2 class="text-2xl font-bold">50</h2>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center transition-colors duration-300">
        <p class="text-sm opacity-70">Phòng đang dùng</p>
        <h2 class="text-2xl font-bold text-red-500">12</h2>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center transition-colors duration-300">
        <p class="text-sm opacity-70">Khách hiện tại</p>
        <h2 class="text-2xl font-bold text-blue-500">24</h2>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center transition-colors duration-300">
        <p class="text-sm opacity-70">Doanh thu hôm nay</p>
        <h2 class="text-2xl font-bold text-green-600">12.500.000₫</h2>
      </div>
    </div>

    <!-- Section: Sơ đồ phòng giả -->
    <div>
      <h3 class="text-lg font-semibold mb-2">Sơ đồ phòng (giả lập)</h3>
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        <div v-for="room in 24" :key="room"
             :class="getRoomClass(room)"
             class="text-white text-center p-3 rounded font-semibold">
          {{ 100 + room }}
        </div>
      </div>
    </div>

    <!-- Section: Nhật ký hoạt động -->
    <div>
      <h3 class="text-lg font-semibold mb-2">Nhật ký hoạt động gần đây</h3>
      <ul class="text-sm opacity-80 space-y-1">
        <li>✔️ Nhận phòng: Khách A - Phòng 101</li>
        <li>🧹 Đang dọn: Phòng 102</li>
        <li>✔️ Đặt phòng: Khách B - Phòng 202</li>
        <li>⏳ Chưa trả: Phòng 305 - 2 đêm</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
function getRoomClass(room) {
  if (room % 5 === 0) return 'bg-yellow-400'
  if (room % 3 === 0) return 'bg-red-500'
  return 'bg-green-500'
}
</script>
