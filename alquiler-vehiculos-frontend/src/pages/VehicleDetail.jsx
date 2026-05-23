import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createRentalRequest, getVehicleById } from '../api'

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

const todayMin = () => new Date().toISOString().slice(0, 10)

const RentalForm = ({ vehicle, onSuccess }) => {
  const initialState = useMemo(
    () => ({ nombre: '', documento: '', correo: '', telefono: '', fechaInicio: '', fechaFin: '', vehiculoId: vehicle?.id }),
    [vehicle?.id],
  )
  const minDate = todayMin()
  const [formData, setFormData] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (['nombre', 'documento', 'correo', 'telefono', 'fechaInicio', 'fechaFin'].some((field) => !formData[field])) {
      setFeedback({ type: 'error', message: 'Completa todos los campos obligatorios para registrar la solicitud.' })
      return
    }

    setSubmitting(true)
    setFeedback({ type: '', message: '' })

    try {
      await createRentalRequest({ ...formData, vehiculoId: vehicle.id })
      setFeedback({ type: 'success', message: 'Solicitud registrada correctamente. El backend proceso la operacion.' })
      setFormData(initialState)
      onSuccess?.()
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="form-card glass-card" onSubmit={handleSubmit}>
      <div className="section-title">
        <h3>Solicitar alquiler</h3>
        <p>Este formulario se conecta con el microservicio de operaciones ya existente.</p>
      </div>
      <div className="form-grid">
        {[
          ['nombre', 'Nombre', 'text'],
          ['documento', 'Documento', 'text'],
          ['correo', 'Correo', 'email'],
          ['telefono', 'Telefono', 'text'],
          ['fechaInicio', 'Fecha de inicio', 'date'],
          ['fechaFin', 'Fecha de devolucion', 'date'],
        ].map(([name, label, type]) => (
          <div className="field-group" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              min={type === 'date' ? (name === 'fechaFin' ? formData.fechaInicio || minDate : minDate) : undefined}
              value={formData[name]}
              onChange={(event) => setFormData((current) => ({ ...current, [name]: event.target.value }))}
            />
          </div>
        ))}
      </div>
      {feedback.message ? <p className={`inline-message ${feedback.type}`}>{feedback.message}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Enviando solicitud...' : 'Registrar solicitud'}
      </button>
    </form>
  )
}

const VehicleDetail = () => {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshVehicle = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError('')

    try {
      setVehicle(await getVehicleById(id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshVehicle()
  }, [refreshVehicle])

  return (
    <main className="container page-section">
      {loading ? <Loading label="Cargando detalle del vehiculo..." /> : null}
      {error ? <ErrorBox message={error} onRetry={refreshVehicle} /> : null}

      {!loading && !error && vehicle ? (
        <div className="vehicle-detail-layout">
          <section className="vehicle-detail-card glass-card">
            <img src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-detail-image" />
            <div className="vehicle-detail-copy">
              <div className="page-heading compact">
                <span className="eyebrow">Detalle del vehiculo</span>
                <h1>{vehicle.marca} {vehicle.modelo}</h1>
              </div>
              <StatusBadge status={vehicle.estado} />
              <div className="detail-grid">
                <div><strong>Marca</strong><span>{vehicle.marca}</span></div>
                <div><strong>Modelo</strong><span>{vehicle.modelo}</span></div>
                <div><strong>Anio</strong><span>{vehicle.anio || 'No informado'}</span></div>
                <div><strong>Precio</strong><span>${Number(vehicle.precio || 0).toLocaleString('es-CO')} / dia</span></div>
                <div><strong>Tipo</strong><span>{vehicle.tipo}</span></div>
                <div><strong>Placa</strong><span>{vehicle.placa}</span></div>
              </div>
              <p className="vehicle-description">{vehicle.descripcion}</p>
            </div>
          </section>
          <RentalForm vehicle={vehicle} onSuccess={refreshVehicle} />
        </div>
      ) : null}
    </main>
  )
}

export default VehicleDetail
