import { createRouter, createWebHistory } from 'vue-router'

import ClientLayout from "@/layouts/ClientLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Dashboard from '@/pages/admin/Dashboard.vue'
import Rooms from "@/pages/rooms.vue";
import Guests from "@/pages/admin/Guests.vue";
import AccountInfo from "@/pages/client/AccountInfo.vue";
import Booking from "@/pages/client/Booking.vue";
import adBooking from "@/pages/admin/Booking.vue";
import Login from "@/pages/client/Login.vue";

const routes = [
    // Client Routes
  {
    path : '/',
    component : ClientLayout,
    children:[
      { path: '' , component: Home },
      { path: 'about' , component: About },
      {path: 'rooms' , component: Rooms },
      { path: 'account/login' , component: Login },
      { path: 'account/info' , component: AccountInfo },
      {path : 'booking' , component: Booking },
    ]
  },
  // Admin Routes
  {
    path : '/admin',
    component : AdminLayout,
    children: [
      { path: 'home' , component: Home },
      { path: '', component: Dashboard },
      { path: 'about' , component: About },
      {path: 'rooms' , component: Rooms },
      { path: 'guests' , component: Guests },
      { path: 'account/info' , component: AccountInfo },
      {path : 'booking' , component: adBooking },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
