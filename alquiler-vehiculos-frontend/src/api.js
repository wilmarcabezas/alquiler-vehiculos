import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const getApiErrorMessage = (error, fallbackMessage = 'Ocurrio un error al procesar la solicitud.') => {
  const details = error?.response?.data?.details
  if (Array.isArray(details) && details.length > 0) {
    return details.join(' ')
  }

  return (
    error?.apiMessage ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  )
}

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

export const normalizeVehicle = (vehicle) => ({
  id: vehicle.id,
  marca: vehicle.marca || 'Sin marca',
  modelo: vehicle.modelo || 'Sin modelo',
  placa: vehicle.placa || 'Sin placa',
  estado: vehicle.estado || 'DESCONOCIDO',
  anio: vehicle.anio || null,
  tipo: vehicle.tipo || 'General',
  precio: vehicle.precio ?? 95000,
  descripcion:
    vehicle.descripcion ||
    'Vehiculo disponible para alquiler con seguimiento centralizado y disponibilidad consultada en tiempo real.',
  imagen:
    vehicle.imagen ||
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  createdAt: vehicle.createdAt,
  updatedAt: vehicle.updatedAt,
})

const handleApiError = (error, fallbackMessage) => {
  throw new Error(getApiErrorMessage(error, fallbackMessage))
}

export const getVehicles = async () => {
  try {
    const { data } = await apiClient.get('/vehiculos')
    return Array.isArray(data) ? data.map(normalizeVehicle) : []
  } catch (error) {
    handleApiError(error, 'No fue posible consultar los vehiculos.')
  }
}

export const getVehicleById = async (id) => {
  try {
    const { data } = await apiClient.get(`/vehiculos/${id}`)
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible consultar el detalle del vehiculo.')
  }
}

export const createVehicle = async (payload) => {
  try {
    const { data } = await apiClient.post('/vehiculos', {
      marca: payload.marca,
      modelo: payload.modelo,
      placa: payload.placa,
      estado: payload.estado,
      anio: Number(payload.anio),
      tipo: payload.tipo,
    })
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible registrar el vehiculo.')
  }
}

export const updateVehicleStatus = async (id, estado) => {
  try {
    const { data } = await apiClient.put(`/vehiculos/${id}/estado`, { estado })
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible actualizar el estado del vehiculo.')
  }
}

export const createRentalRequest = async (payload) => {
  try {
    const { data } = await apiClient.post('/operaciones/solicitudes', {
      vehiculoId: Number(payload.vehiculoId),
      nombreCliente: payload.nombre,
      documentoCliente: payload.documento,
      fechaInicio: payload.fechaInicio,
      fechaFin: payload.fechaFin,
    })
    return data
  } catch (error) {
    handleApiError(error, 'No fue posible registrar la solicitud de alquiler.')
  }
}

export const getRentalRequests = async () => {
  try {
    const { data } = await apiClient.get('/operaciones/solicitudes')
    return Array.isArray(data) ? data : []
  } catch (error) {
    handleApiError(error, 'No fue posible consultar las solicitudes registradas.')
  }
}

export const confirmRentalRequest = async (requestId) => {
  try {
    const { data } = await apiClient.post(`/operaciones/solicitudes/${requestId}/confirmar`)
    return data
  } catch (error) {
    handleApiError(error, 'No fue posible confirmar la solicitud de alquiler.')
  }
}

export const cancelRentalRequest = async (requestId) => {
  try {
    const { data } = await apiClient.post(`/operaciones/solicitudes/${requestId}/cancelar`)
    return data
  } catch (error) {
    handleApiError(error, 'No fue posible cancelar la solicitud de alquiler.')
  }
}

export default apiClient
