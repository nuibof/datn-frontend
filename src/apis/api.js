// src/api/api.js
import axios from 'axios'

export const IMG_URL = 'http://192.168.100.239:8080/uploads/'
const BASE_URL = 'http://192.168.100.239:8080/api'

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
