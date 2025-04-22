// src/stores/useThemeStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    function toggle() {
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

    function init() {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') {
            isDark.value = true
            document.documentElement.classList.add('dark')
        }
    }

    return { isDark, toggle, init }
})
