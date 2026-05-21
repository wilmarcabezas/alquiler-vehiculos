import { useState } from 'react'
import { createVehicle } from '../api/vehicleService'

/** Formulario administrativo para registrar vehículos nuevos. */
const AdminVehicleForm = ({ onVehicleCreated }) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    estado: 'DISPONIBLE',
    anio: '',
    tipo: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const newVehicle = await createVehicle(formData)
      setMessage({ type: 'success', text: `Vehículo ${newVehicle.marca} ${newVehicle.modelo} registrado correctamente.` })
      setFormData({ marca: '', modelo: '', placa: '', estado: 'DISPONIBLE', anio: '', tipo: '' })
      onVehicleCreated?.()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="form-card glass-card" onSubmit={handleSubmit}>
      <div className="section-title">
        <h3>Registrar nuevo vehículo</h3>
        <p>Alta administrativa conectada al microservicio de vehículos.</p>
      </div>

      <div className="form-grid">
        <div className="field-group"><label>Marca</label><input name="marca" value={formData.marca} onChange={handleChange} /></div>
        <div className="field-group"><label>Modelo</label><input name="modelo" value={formData.modelo} onChange={handleChange} /></div>
        <div className="field-group"><label>Placa</label><input name="placa" value={formData.placa} onChange={handleChange} /></div>
        <div className="field-group"><label>Año</label><input name="anio" type="number" value={formData.anio} onChange={handleChange} /></div>
        <div className="field-group"><label>Tipo</label><input name="tipo" value={formData.tipo} onChange={handleChange} /></div>
        <div className="field-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="DISPONIBLE">Disponible</option>
            <option value="NO_DISPONIBLE">Alquilado</option>
          </select>
        </div>
      </div>

      {message.text ? <p className={`inline-message ${message.type}`}>{message.text}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Guardando...' : 'Crear vehículo'}
      </button>
    </form>
  )
}

export default AdminVehicleForm
