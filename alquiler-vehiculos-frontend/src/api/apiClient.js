import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const getApiErrorMessage = (error, fallbackMessage = 'Ocurrió un error al procesar la solicitud.') =>
  error?.apiMessage ||
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallbackMessage

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiMessage = getApiErrorMessage(error)

    if (error instanceof Error) {
      error.apiMessage = apiMessage
      error.status = error.response?.status
      error.data = error.response?.data
      return Promise.reject(error)
    }

    return Promise.reject(new Error(apiMessage))
  },
)

export default apiClient
