import { useMemo, useState } from 'react'
import { createRentalRequest } from '../api/rentalService'

/** Formulario para registrar solicitudes de alquiler hacia operaciones-service. */
const RentalForm = ({ vehicle, onSuccess }) => {
  const initialState = useMemo(
    () => ({
      nombre: '',
      documento: '',
      correo: '',
      telefono: '',
      fechaInicio: '',
      fechaFin: '',
      vehiculoId: vehicle?.id,
    }),
    [vehicle?.id],
  )

  const [formData, setFormData] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const requiredFields = ['nombre', 'documento', 'correo', 'telefono', 'fechaInicio', 'fechaFin']
    const hasEmpty = requiredFields.some((field) => !formData[field])

    if (hasEmpty) {
      setFeedback({ type: 'error', message: 'Completa todos los campos obligatorios para registrar la solicitud.' })
      return
    }

    setSubmitting(true)
    setFeedback({ type: '', message: '' })

    try {
      await createRentalRequest({ ...formData, vehiculoId: vehicle.id })
      setFeedback({ type: 'success', message: 'Solicitud registrada correctamente. El backend procesó la operación.' })
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
        <div className="field-group">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="field-group">
          <label htmlFor="documento">Documento</label>
          <input id="documento" name="documento" value={formData.documento} onChange={handleChange} />
        </div>
        <div className="field-group">
          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="field-group">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="field-group">
          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <input id="fechaInicio" name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleChange} />
        </div>
        <div className="field-group">
          <label htmlFor="fechaFin">Fecha de devolución</label>
          <input id="fechaFin" name="fechaFin" type="date" value={formData.fechaFin} onChange={handleChange} />
        </div>
      </div>

      {feedback.message ? <p className={`inline-message ${feedback.type}`}>{feedback.message}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Enviando solicitud...' : 'Registrar solicitud'}
      </button>
    </form>
  )
}

export default RentalForm
