import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  cancelRentalRequest,
  confirmRentalRequest,
  getRentalRequests,
} from '../api/rentalService'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import StatusBadge from './StatusBadge'

const formatDate = (value) => {
  if (!value) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(`${value}T00:00:00`))
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

/** Sección administrativa para listar, confirmar y cancelar solicitudes de alquiler. */
const AdminRentalRequests = ({ vehicles = [], onRequestsChanged }) => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionState, setActionState] = useState({ id: null, type: '' })
  const [message, setMessage] = useState({ type: '', text: '' })

  const vehiclesById = useMemo(
    () =>
      vehicles.reduce((accumulator, vehicle) => {
        accumulator[String(vehicle.id)] = vehicle
        return accumulator
      }, {}),
    [vehicles],
  )

  const loadRequests = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getRentalRequests()
      const orderedRequests = [...data].sort((first, second) => second.id - first.id)
      setRequests(orderedRequests)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carga inicial necesaria al montar la sección administrativa de solicitudes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRequests()
  }, [loadRequests])

  const handleAction = async (requestId, action) => {
    setActionState({ id: requestId, type: action })
    setMessage({ type: '', text: '' })

    try {
      const updatedRequest =
        action === 'confirmar' ? await confirmRentalRequest(requestId) : await cancelRentalRequest(requestId)

      setRequests((currentRequests) =>
        currentRequests.map((request) => (request.id === updatedRequest.id ? updatedRequest : request)),
      )
      setMessage({
        type: 'success',
        text: action === 'confirmar' ? 'Solicitud confirmada correctamente.' : 'Solicitud cancelada correctamente.',
      })
      onRequestsChanged?.()
    } catch (actionError) {
      setMessage({ type: 'error', text: actionError.message })
    } finally {
      setActionState({ id: null, type: '' })
    }
  }

  return (
    <section className="admin-requests-section glass-card">
      <div className="section-title admin-requests-header">
        <div>
          <h3>Solicitudes de alquiler</h3>
          <p>Consulta las solicitudes registradas y confirma o cancela su flujo operativo desde el Gateway.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={loadRequests} disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar listado'}
        </button>
      </div>

      {message.text ? <p className={`inline-message ${message.type}`}>{message.text}</p> : null}

      {loading ? <LoadingSpinner label="Cargando solicitudes de alquiler..." /> : null}
      {error ? <ErrorMessage message={error} onRetry={loadRequests} /> : null}

      {!loading && !error && requests.length === 0 ? (
        <div className="feedback-state empty-state">
          <h3>No hay solicitudes registradas</h3>
          <p>Cuando un cliente complete el formulario de alquiler, aparecerá en esta sección administrativa.</p>
        </div>
      ) : null}

      {!loading && !error && requests.length > 0 ? (
        <div className="rental-requests-list">
          {requests.map((request) => {
            const status = request.estadoSolicitud || 'DESCONOCIDO'
            const canConfirm = status === 'PENDIENTE'
            const canCancel = status !== 'CANCELADA'
            const vehicle = vehiclesById[String(request.vehiculoId)]
            const vehicleLabel = vehicle
              ? `${vehicle.marca} ${vehicle.modelo} · ${vehicle.placa}`
              : `Vehículo #${request.vehiculoId}`
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
                  <div>
                    <span>Vehículo</span>
                    <strong>{vehicleLabel}</strong>
                  </div>
                  <div>
                    <span>Periodo</span>
                    <strong>
                      {formatDate(request.fechaInicio)} - {formatDate(request.fechaFin)}
                    </strong>
                  </div>
                  <div>
                    <span>Registro</span>
                    <strong>{formatDateTime(request.createdAt)}</strong>
                  </div>
                </div>

                <div className="request-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAction(request.id, 'confirmar')}
                    disabled={!canConfirm || isBusy}
                  >
                    {isConfirming ? 'Confirmando...' : 'Confirmar'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleAction(request.id, 'cancelar')}
                    disabled={!canCancel || isBusy}
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
  )
}

export default AdminRentalRequests
