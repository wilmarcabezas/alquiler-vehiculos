import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  cancelRentalRequest,
  confirmRentalRequest,
  createVehicle,
  getRentalRequests,
  getVehicles,
  updateVehicleStatus,
} from '../api'

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

const formatDate = (value) => {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(`${value}T00:00:00`))
}

const formatDateTime = (value) => {
  if (!value) return 'Sin registro'
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

const Admin = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [vehicleForm, setVehicleForm] = useState({ marca: '', modelo: '', placa: '', estado: 'DISPONIBLE', anio: '', tipo: '' })
  const [vehicleMessage, setVehicleMessage] = useState({ type: '', text: '' })
  const [submittingVehicle, setSubmittingVehicle] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [estado, setEstado] = useState('DISPONIBLE')
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })
  const [requests, setRequests] = useState([])
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [requestsError, setRequestsError] = useState('')
  const [actionState, setActionState] = useState({ id: null, type: '' })
  const [requestMessage, setRequestMessage] = useState({ type: '', text: '' })

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

  const loadRequests = useCallback(async () => {
    setRequestsLoading(true)
    setRequestsError('')

    try {
      const data = await getRentalRequests()
      setRequests([...data].sort((first, second) => second.id - first.id))
    } catch (err) {
      setRequestsError(err.message)
    } finally {
      setRequestsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshVehicles()
    loadRequests()
  }, [refreshVehicles, loadRequests])

  const selectedVehicle = vehicles.find((vehicle) => String(vehicle.id) === String(selectedId))
  const vehiclesById = useMemo(
    () => vehicles.reduce((acc, vehicle) => ({ ...acc, [String(vehicle.id)]: vehicle }), {}),
    [vehicles],
  )

  const handleVehicleSubmit = async (event) => {
    event.preventDefault()
    setSubmittingVehicle(true)
    setVehicleMessage({ type: '', text: '' })

    try {
      const newVehicle = await createVehicle(vehicleForm)
      setVehicleMessage({ type: 'success', text: `Vehiculo ${newVehicle.marca} ${newVehicle.modelo} registrado correctamente.` })
      setVehicleForm({ marca: '', modelo: '', placa: '', estado: 'DISPONIBLE', anio: '', tipo: '' })
      refreshVehicles()
    } catch (err) {
      setVehicleMessage({ type: 'error', text: err.message })
    } finally {
      setSubmittingVehicle(false)
    }
  }

  const handleStatusSubmit = async (event) => {
    event.preventDefault()

    if (!selectedId) {
      setStatusMessage({ type: 'error', text: 'Selecciona un vehiculo para actualizar su estado.' })
      return
    }

    try {
      await updateVehicleStatus(selectedId, estado)
      setStatusMessage({ type: 'success', text: 'Estado actualizado correctamente.' })
      refreshVehicles()
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message })
    }
  }

  const handleRequestAction = async (requestId, action) => {
    setActionState({ id: requestId, type: action })
    setRequestMessage({ type: '', text: '' })

    try {
      const updated = action === 'confirmar' ? await confirmRentalRequest(requestId) : await cancelRentalRequest(requestId)
      setRequests((current) => current.map((request) => (request.id === updated.id ? updated : request)))
      setRequestMessage({
        type: 'success',
        text: action === 'confirmar' ? 'Solicitud confirmada correctamente.' : 'Solicitud cancelada correctamente.',
      })
      refreshVehicles()
    } catch (err) {
      setRequestMessage({ type: 'error', text: err.message })
    } finally {
      setActionState({ id: null, type: '' })
    }
  }

  return (
    <main className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">Panel administrativo</span>
        <h1>Gestion de altas y estados de la flota</h1>
        <p>Registra vehiculos nuevos y administra su disponibilidad utilizando APIs REST del backend existente.</p>
      </div>

      {loading ? <Loading label="Sincronizando vehiculos para administracion..." /> : null}
      {error ? <ErrorBox message={error} onRetry={refreshVehicles} /> : null}

      {!loading && !error ? (
        <>
          <div className="admin-grid">
            <form className="form-card glass-card" onSubmit={handleVehicleSubmit}>
              <div className="section-title">
                <h3>Registrar nuevo vehiculo</h3>
                <p>Alta administrativa conectada al microservicio de vehiculos.</p>
              </div>
              <div className="form-grid">
                {[
                  ['marca', 'Marca', 'text'],
                  ['modelo', 'Modelo', 'text'],
                  ['placa', 'Placa', 'text'],
                  ['anio', 'Anio', 'number'],
                  ['tipo', 'Tipo', 'text'],
                ].map(([name, label, type]) => (
                  <div className="field-group" key={name}>
                    <label>{label}</label>
                    <input
                      name={name}
                      type={type}
                      value={vehicleForm[name]}
                      onChange={(event) => setVehicleForm((current) => ({ ...current, [name]: event.target.value }))}
                    />
                  </div>
                ))}
                <div className="field-group">
                  <label>Estado</label>
                  <select
                    name="estado"
                    value={vehicleForm.estado}
                    onChange={(event) => setVehicleForm((current) => ({ ...current, estado: event.target.value }))}
                  >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="NO_DISPONIBLE">Alquilado</option>
                  </select>
                </div>
              </div>
              {vehicleMessage.text ? <p className={`inline-message ${vehicleMessage.type}`}>{vehicleMessage.text}</p> : null}
              <button type="submit" className="btn btn-primary" disabled={submittingVehicle}>
                {submittingVehicle ? 'Guardando...' : 'Crear vehiculo'}
              </button>
            </form>

            <form className="form-card glass-card" onSubmit={handleStatusSubmit}>
              <div className="section-title">
                <h3>Actualizar estado del vehiculo</h3>
                <p>Control alineado con el backend actual: disponible o alquilado.</p>
              </div>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="vehicle">Vehiculo</label>
                  <select id="vehicle" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
                    <option value="">Selecciona un vehiculo</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>{vehicle.marca} {vehicle.modelo} - {vehicle.placa}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="estado-vehiculo">Nuevo estado</label>
                  <select id="estado-vehiculo" value={estado} onChange={(event) => setEstado(event.target.value)}>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="NO_DISPONIBLE">Alquilado</option>
                  </select>
                </div>
              </div>
              {selectedVehicle ? (
                <div className="selected-vehicle-preview">
                  <span>Estado actual:</span>
                  <StatusBadge status={selectedVehicle.estado} />
                </div>
              ) : null}
              {statusMessage.text ? <p className={`inline-message ${statusMessage.type}`}>{statusMessage.text}</p> : null}
              <button type="submit" className="btn btn-secondary">Actualizar estado</button>
            </form>
          </div>

          <section className="admin-requests-section glass-card">
            <div className="section-title admin-requests-header">
              <div>
                <h3>Solicitudes de alquiler</h3>
                <p>Consulta las solicitudes registradas y confirma o cancela su flujo operativo desde el Gateway.</p>
              </div>
              <button type="button" className="btn btn-secondary" onClick={loadRequests} disabled={requestsLoading}>
                {requestsLoading ? 'Actualizando...' : 'Actualizar listado'}
              </button>
            </div>

            {requestMessage.text ? <p className={`inline-message ${requestMessage.type}`}>{requestMessage.text}</p> : null}
            {requestsLoading ? <Loading label="Cargando solicitudes de alquiler..." /> : null}
            {requestsError ? <ErrorBox message={requestsError} onRetry={loadRequests} /> : null}

            {!requestsLoading && !requestsError && requests.length === 0 ? (
              <div className="feedback-state empty-state">
                <h3>No hay solicitudes registradas</h3>
                <p>Cuando un cliente complete el formulario de alquiler, aparecera en esta seccion administrativa.</p>
              </div>
            ) : null}

            {!requestsLoading && !requestsError && requests.length > 0 ? (
              <div className="rental-requests-list">
                {requests.map((request) => {
                  const status = request.estadoSolicitud || 'DESCONOCIDO'
                  const vehicle = vehiclesById[String(request.vehiculoId)]
                  const vehicleLabel = vehicle ? `${vehicle.marca} ${vehicle.modelo} - ${vehicle.placa}` : `Vehiculo #${request.vehiculoId}`
                  const isConfirming = actionState.id === request.id && actionState.type === 'confirmar'
                  const isCancelling = actionState.id === request.id && actionState.type === 'cancelar'
                  const isBusy = actionState.id === request.id

                  return (
                    <article className="rental-request-card" key={request.id}>
                      <div className="rental-request-main">
                        <div>
                          <span className="eyebrow">Solicitud #{request.id}</span>
                          <h4>{request.nombreCliente}</h4>
                          <p>{request.documentoCliente}</p>
                        </div>
                        <StatusBadge status={status} />
                      </div>
                      <div className="request-detail-grid">
                        <div><span>Vehiculo</span><strong>{vehicleLabel}</strong></div>
                        <div><span>Periodo</span><strong>{formatDate(request.fechaInicio)} - {formatDate(request.fechaFin)}</strong></div>
                        <div><span>Registro</span><strong>{formatDateTime(request.createdAt)}</strong></div>
                      </div>
                      <div className="request-actions">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleRequestAction(request.id, 'confirmar')}
                          disabled={status !== 'PENDIENTE' || isBusy}
                        >
                          {isConfirming ? 'Confirmando...' : 'Confirmar'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleRequestAction(request.id, 'cancelar')}
                          disabled={status === 'CANCELADA' || isBusy}
                        >
                          {isCancelling ? 'Cancelando...' : 'Cancelar'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : null}
          </section>
        </>
      ) : null}
    </main>
  )
}

export default Admin
