import { useCallback, useEffect, useMemo, useState } from 'react'
import { getVehicles } from '../api/vehicleService'

/**
 * Custom hook para consultar, filtrar y refrescar la lista de vehículos.
 */
export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [filters, setFilters] = useState({ search: '', estado: 'TODOS', sort: 'default' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getVehicles()
      setVehicles(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carga inicial necesaria al montar el catálogo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVehicles()
  }, [fetchVehicles])

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles]

    if (filters.search.trim()) {
      const term = filters.search.toLowerCase()
      result = result.filter((vehicle) =>
        [vehicle.marca, vehicle.modelo, vehicle.placa, vehicle.tipo]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term)),
      )
    }

    if (filters.estado !== 'TODOS') {
      result = result.filter((vehicle) => vehicle.estado === filters.estado)
    }

    if (filters.sort === 'price-asc') {
      result.sort((a, b) => (a.precio || 0) - (b.precio || 0))
    }

    if (filters.sort === 'price-desc') {
      result.sort((a, b) => (b.precio || 0) - (a.precio || 0))
    }

    return result
  }, [vehicles, filters])

  return {
    vehicles,
    filteredVehicles,
    filters,
    setFilters,
    loading,
    error,
    refreshVehicles: fetchVehicles,
  }
}
