import apiClient, { getApiErrorMessage } from './apiClient'

const normalizeVehicle = (vehicle) => ({
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
    'Vehículo disponible para alquiler con seguimiento centralizado y disponibilidad consultada en tiempo real.',
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
    handleApiError(error, 'No fue posible consultar los vehículos.')
  }
}

export const getAvailableVehicles = async () => {
  try {
    const { data } = await apiClient.get('/vehiculos/buscar/estado/DISPONIBLE')
    return Array.isArray(data) ? data.map(normalizeVehicle) : []
  } catch (error) {
    handleApiError(error, 'No fue posible consultar los vehículos disponibles.')
  }
}

export const getVehicleById = async (id) => {
  try {
    const { data } = await apiClient.get(`/vehiculos/${id}`)
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible consultar el detalle del vehículo.')
  }
}

export const createVehicle = async (payload) => {
  try {
    const vehiclePayload = {
      marca: payload.marca,
      modelo: payload.modelo,
      placa: payload.placa,
      estado: payload.estado,
      anio: Number(payload.anio),
      tipo: payload.tipo,
    }

    const { data } = await apiClient.post('/vehiculos', vehiclePayload)
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible registrar el vehículo.')
  }
}

export const updateVehicleStatus = async (id, estado) => {
  try {
    const { data } = await apiClient.put(`/vehiculos/${id}/estado`, { estado })
    return normalizeVehicle(data)
  } catch (error) {
    handleApiError(error, 'No fue posible actualizar el estado del vehículo.')
  }
}

export default apiClient
