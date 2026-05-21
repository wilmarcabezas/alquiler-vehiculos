import { useState } from 'react'
import { updateVehicleStatus } from '../api/vehicleService'
import StatusBadge from './StatusBadge'

/** Control administrativo para actualizar el estado de vehículos existentes. */
const VehicleStatusControl = ({ vehicles, onStatusUpdated }) => {
  const [selectedId, setSelectedId] = useState('')
  const [estado, setEstado] = useState('DISPONIBLE')
  const [message, setMessage] = useState({ type: '', text: '' })

  const selectedVehicle = vehicles.find((vehicle) => String(vehicle.id) === String(selectedId))

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedId) {
      setMessage({ type: 'error', text: 'Selecciona un vehículo para actualizar su estado.' })
      return
    }

    try {
      await updateVehicleStatus(selectedId, estado)
      setMessage({ type: 'success', text: 'Estado actualizado correctamente.' })
      onStatusUpdated?.()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  return (
    <form className="form-card glass-card" onSubmit={handleSubmit}>
      <div className="section-title">
        <h3>Actualizar estado del vehículo</h3>
        <p>Control alineado con el backend actual: disponible o alquilado.</p>
      </div>

      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="vehicle">Vehículo</label>
          <select id="vehicle" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            <option value="">Selecciona un vehículo</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.marca} {vehicle.modelo} - {vehicle.placa}
              </option>
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

      {message.text ? <p className={`inline-message ${message.type}`}>{message.text}</p> : null}

      <button type="submit" className="btn btn-secondary">
        Actualizar estado
      </button>
    </form>
  )
}

export default VehicleStatusControl
