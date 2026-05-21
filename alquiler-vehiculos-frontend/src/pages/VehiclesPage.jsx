import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import Navbar from '../components/Navbar'
import VehicleFilters from '../components/VehicleFilters'
import VehicleGrid from '../components/VehicleGrid'
import { useVehicles } from '../hooks/useVehicles'

const VehiclesPage = () => {
  const { filteredVehicles, filters, setFilters, loading, error, refreshVehicles } = useVehicles()

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container page-section">
        <div className="page-heading">
          <span className="eyebrow">Catálogo conectado al backend</span>
          <h1>Vehículos disponibles para alquiler</h1>
          <p>Consulta la flota, filtra por estado y revisa el detalle de cada vehículo antes de solicitarlo.</p>
        </div>

        <VehicleFilters filters={filters} onChange={setFilters} />

        {loading ? <LoadingSpinner label="Cargando vehículos desde el microservicio..." /> : null}
        {error ? <ErrorMessage message={error} onRetry={refreshVehicles} /> : null}

        {!loading && !error && filteredVehicles.length === 0 ? (
          <div className="feedback-state empty-state">
            <strong>No hay vehículos para mostrar</strong>
            <p>Prueba otros filtros o verifica que el backend tenga información registrada.</p>
          </div>
        ) : null}

        {!loading && !error && filteredVehicles.length > 0 ? <VehicleGrid vehicles={filteredVehicles} /> : null}
      </main>
      <Footer />
    </div>
  )
}

export default VehiclesPage
