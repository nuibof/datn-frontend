<template>
  <div class="space-y-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
    <!-- Banner -->
    <div class="relative w-full" data-carousel="slide" data-carousel-autoplay="true" data-carousel-interval="3000">
      <div class="relative overflow-hidden aspect-[16/6] md:aspect-[16/5] rounded-lg">
        <div class="hidden duration-500 ease-in-out" data-carousel-item="active">
          <img src="https://placehold.co/1600x400?text=ZenAI+Slide+1" class="block w-full h-full object-cover" />
        </div>
        <div class="hidden duration-500 ease-in-out" data-carousel-item>
          <img src="https://placehold.co/1600x400?text=ZenAI+Slide+2" class="block w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Title -->
    <h1 class="text-4xl font-bold text-center">
      Chào mừng đến với <span class="text-blue-600 dark:text-yellow-300">ZenAI Hotel</span>
    </h1>
    <p class="text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
      Trải nghiệm dịch vụ lưu trú đẳng cấp, tiện nghi và thông minh.
    </p>
    <div class="text-center mt-4">
      <router-link to="/booking" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">
        Đặt phòng ngay
      </router-link>
    </div>

    <!-- Danh sách phòng -->
    <section class="py-10 px-4 md:px-10">
      <h2 class="text-2xl font-bold mb-6">Danh sách phòng</h2>
      <div v-if="rooms.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
            v-for="room in rooms"
            :key="room.roomNumber"
            class="relative bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden group transition hover:shadow-md"
        >

          <div
              class="relative group cursor-zoom-in"
              @click="toggleZoom(`${IMG_URL}${room.imageUrl}`, room.roomNumber)"
          >
            <img
                :src="`${IMG_URL}${room.imageUrl}`"
                :alt="`Phòng ${room.roomNumber}`"
                class="w-full h-40 object-cover rounded-lg cursor-zoom-in transition-transform hover:scale-105"
                @click="(e) => handleImageClick(`${IMG_URL}${room.imageUrl}`, e)"
            />

          </div>

          <!-- Nội dung -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
                Phòng {{ room.roomNumber }}
              </h3>
              <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                {{ room.type }}
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-300 mb-1">
              Giá gốc: <span class="line-through">{{ formatPrice(room.originalPrice) }}</span>
            </p>
            <p class="text-lg font-bold text-green-600 dark:text-green-400">
              {{ formatPrice(room.price) }}
            </p>
            <p v-if="room.promotion" class="text-sm text-yellow-500 mt-1">🎉 {{ room.promotion }}</p>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 dark:text-gray-300">Không có dữ liệu phòng.</p>

      <!-- ảnh phóng to ra với animation -->
      <div
          v-if="zoomedImage"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          @click="closeZoom"
      ></div>

      <img
          v-if="zoomedImage"
          :src="zoomedImage"
          :style="zoomStyle"
          class="object-cover rounded-lg shadow-2xl cursor-zoom-out"
          @click.stop
      />





    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllRooms } from '@/apis/roomApi'
import { IMG_URL } from '@/apis/api'

const rooms = ref([])
const zoomedImage = ref(null)
const zoomStyle = ref({})
const isZooming = ref(false)

function registerImageRef(key, el) {
  if (el) imageRefs.value[key] = el
}


function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

onMounted(() => {
  import('flowbite').then(({ initCarousels }) => initCarousels())
  getAllRooms().then(res => {
    rooms.value = res.data
  })
})

function handleImageClick(url, event) {
  const rect = event.target.getBoundingClientRect()

  zoomedImage.value = url
  zoomStyle.value = {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    position: 'fixed',
    zIndex: 9999,
    transform: 'scale(1.5)',
    transition: 'transform 0.1s ease, opacity 0.1s ease',
  }

  // Trigger animation next tick
  nextTick(() => {
    isZooming.value = true
    zoomStyle.value.transform = 'scale(2)'
  })
}

function closeZoom() {
  isZooming.value = false
  setTimeout(() => {
    zoomedImage.value = null
  }, 300) // same as transition duration
}
</script>

<style scoped>
.zoom-pop-enter-active, .zoom-pop-leave-active {
  transition: all 0.3s ease;
}
.zoom-pop-enter-from, .zoom-pop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.zoom-pop-enter-to, .zoom-pop-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
