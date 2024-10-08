import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const searchFlights = (params: any) => api.get('/flights/search', { params })
export const searchHotels = (params: any) => api.get('/hotels/search', { params })
export const searchPackages = (params: any) => api.get('/packages/search', { params })
export const searchCars = (params: any) => api.get('/cars/search', {params})
export const bookFlight = (flightId: string, data: any) => api.post(`/flights/${flightId}/book`, data)
export const bookHotel = (hotelId: string, data: any) => api.post(`/hotels/${hotelId}/book`, data)
export const bookPackage = (packageId: string, data: any) => api.post(`/packages/${packageId}/book`, data)
export const getUserProfile = () => api.get('/profile')
export const updateUserProfile = (data: any) => api.put('/profile', data)
export const getUserPreferences = () => api.get('/profile/preferences')
export const updateUserPreferences = (data: any) => api.put('/profile/preferences', data)

export default api