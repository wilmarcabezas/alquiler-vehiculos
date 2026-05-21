import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import Navbar from '../components/Navbar'
import RentalForm from '../components/RentalForm'
import StatusBadge from '../components/StatusBadge'
import { useVehicleDetail } from '../hooks/useVehicleDetail'

const VehicleDetailPage = () => {
  const { id } = useParams()
  const { vehicle, loading, error, refreshVehicle } = useVehicleDetail(id)

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container page-section">
        {loading ? <LoadingSpinner label="Cargando detalle del vehículo..." /> : null}
        {error ? <ErrorMessage message={error} onRetry={refreshVehicle} /> : null}

        {!loading && !error && vehicle ? (
          <div className="vehicle-detail-layout">
            <section className="vehicle-detail-card glass-card">
              <img src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-detail-image" />

              <div className="vehicle-detail-copy">
                <div className="page-heading compact">
                  <span className="eyebrow">Detalle del vehículo</span>
                  <h1>
                    {vehicle.marca} {vehicle.modelo}
                  </h1>
                </div>

                <StatusBadge status={vehicle.estado} />

                <div className="detail-grid">
                  <div><strong>Marca</strong><span>{vehicle.marca}</span></div>
                  <div><strong>Modelo</strong><span>{vehicle.modelo}</span></div>
                  <div><strong>Año</strong><span>{vehicle.anio || 'No informado'}</span></div>
                  <div><strong>Precio</strong><span>${Number(vehicle.precio || 0).toLocaleString('es-CO')} / día</span></div>
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
      <Footer />
    </div>
  )
}

export default VehicleDetailPage
