import apiClient, { getApiErrorMessage } from './apiClient'

const handleApiError = (error, fallbackMessage) => {
  throw new Error(getApiErrorMessage(error, fallbackMessage))
}

export const createRentalRequest = async (payload) => {
  try {
    const requestBody = {
      vehiculoId: Number(payload.vehiculoId),
      nombreCliente: payload.nombre,
      documentoCliente: payload.documento,
      fechaInicio: payload.fechaInicio,
      fechaFin: payload.fechaFin,
    }

    const { data } = await apiClient.post('/operaciones/solicitudes', requestBody)
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
