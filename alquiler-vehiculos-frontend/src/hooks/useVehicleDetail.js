import { useCallback, useEffect, useState } from 'react'
import { getVehicleById } from '../api/vehicleService'

/**
 * Custom hook para consultar el detalle de un vehículo por ID.
 */
export const useVehicleDetail = (id) => {
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchVehicle = useCallback(async () => {
    if (!id) return

    setLoading(true)
    setError('')

    try {
      const data = await getVehicleById(id)
      setVehicle(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // Carga inicial necesaria al abrir el detalle del vehículo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVehicle()
  }, [fetchVehicle])

  return {
    vehicle,
    loading,
    error,
    refreshVehicle: fetchVehicle,
  }
}
