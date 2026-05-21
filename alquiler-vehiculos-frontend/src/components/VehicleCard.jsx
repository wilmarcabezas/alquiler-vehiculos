import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

/** Tarjeta visual de cada vehículo dentro del grid. */
const VehicleCard = ({ vehicle }) => {
  return (
    <article className="vehicle-card glass-card">
      <img src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-image" />

      <div className="vehicle-card-body">
        <div className="vehicle-card-header">
          <div>
            <p className="vehicle-type">{vehicle.tipo}</p>
            <h3>
              {vehicle.marca} {vehicle.modelo}
            </h3>
          </div>
          <StatusBadge status={vehicle.estado} />
        </div>

        <ul className="vehicle-meta">
          <li>Placa: {vehicle.placa}</li>
          <li>Año: {vehicle.anio || 'No informado'}</li>
        </ul>

        <div className="vehicle-card-footer">
          <strong>${Number(vehicle.precio || 0).toLocaleString('es-CO')} / día</strong>
          <Link to={`/vehiculos/${vehicle.id}`} className="btn btn-ghost">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default VehicleCard
