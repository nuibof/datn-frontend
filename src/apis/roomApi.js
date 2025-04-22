import api from './api'

export const getAllRooms = () => api.get('/rooms')

// Có thể thêm:
export const getRoomById = (id) => api.get(`/rooms/${id}`)
export const createRoom = (data) => api.post('/rooms', data)
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data)
export const deleteRoom = (id) => api.delete(`/rooms/${id}`)
