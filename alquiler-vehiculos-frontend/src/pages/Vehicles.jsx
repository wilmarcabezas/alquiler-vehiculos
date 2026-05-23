import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVehicles } from '../api'

const StatusBadge = ({ status }) => {
  const normalized = status?.toUpperCase?.() || 'DESCONOCIDO'
  return <span className={`status-badge status-${normalized.toLowerCase()}`}>{normalized.replaceAll('_', ' ')}</span>
}

const Loading = ({ label = 'Cargando informacion...' }) => (
  <div className="feedback-state">
    <div className="spinner" aria-hidden="true"></div>
    <p>{label}</p>
  </div>
)

const ErrorBox = ({ message, onRetry }) => (
  <div className="feedback-state error-state">
    <strong>Ocurrio un problema</strong>
    <p>{message}</p>
    {onRetry ? <button type="button" className="btn btn-primary" onClick={onRetry}>Reintentar</button> : null}
  </div>
)

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [filters, setFilters] = useState({ search: '', estado: 'TODOS', sort: 'default' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshVehicles = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      setVehicles(await getVehicles())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshVehicles()
  }, [refreshVehicles])

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles]
    const term = filters.search.trim().toLowerCase()

    if (term) {
      result = result.filter((vehicle) =>
        [vehicle.marca, vehicle.modelo, vehicle.placa, vehicle.tipo]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term)),
      )
    }

    if (filters.estado !== 'TODOS') result = result.filter((vehicle) => vehicle.estado === filters.estado)
    if (filters.sort === 'price-asc') result.sort((a, b) => (a.precio || 0) - (b.precio || 0))
    if (filters.sort === 'price-desc') result.sort((a, b) => (b.precio || 0) - (a.precio || 0))
    return result
  }, [vehicles, filters])

  return (
    <main className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">Catalogo conectado al backend</span>
        <h1>Vehiculos disponibles para alquiler</h1>
        <p>Consulta la flota, filtra por estado y revisa el detalle de cada vehiculo antes de solicitarlo.</p>
      </div>

      <section className="filters-panel glass-card">
        <div className="field-group">
          <label htmlFor="search">Buscar por marca, modelo o placa</label>
          <input
            id="search"
            type="search"
            placeholder="Ej. Toyota, Corolla, ABC123"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          />
        </div>
        <div className="field-group">
          <label htmlFor="status">Estado</label>
          <select id="status" value={filters.estado} onChange={(event) => setFilters({ ...filters, estado: event.target.value })}>
            <option value="TODOS">Todos</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="NO_DISPONIBLE">Alquilado</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="sort">Ordenar</label>
          <select id="sort" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
            <option value="default">Por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </section>

      {loading ? <Loading label="Cargando vehiculos desde el microservicio..." /> : null}
      {error ? <ErrorBox message={error} onRetry={refreshVehicles} /> : null}
      {!loading && !error && filteredVehicles.length === 0 ? (
        <div className="feedback-state empty-state">
          <strong>No hay vehiculos para mostrar</strong>
          <p>Prueba otros filtros o verifica que el backend tenga informacion registrada.</p>
        </div>
      ) : null}

      {!loading && !error && filteredVehicles.length > 0 ? (
        <section className="vehicle-grid">
          {filteredVehicles.map((vehicle) => (
            <article className="vehicle-card glass-card" key={vehicle.id}>
              <img src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-image" />
              <div className="vehicle-card-body">
                <div className="vehicle-card-header">
                  <div>
                    <p className="vehicle-type">{vehicle.tipo}</p>
                    <h3>{vehicle.marca} {vehicle.modelo}</h3>
                  </div>
                  <StatusBadge status={vehicle.estado} />
                </div>
                <ul className="vehicle-meta">
                  <li>Placa: {vehicle.placa}</li>
                  <li>Anio: {vehicle.anio || 'No informado'}</li>
                </ul>
                <div className="vehicle-card-footer">
                  <strong>${Number(vehicle.precio || 0).toLocaleString('es-CO')} / dia</strong>
                  <Link to={`/vehiculos/${vehicle.id}`} className="btn btn-ghost">Ver detalle</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  )
}

export default Vehicles
