import AdminVehicleForm from '../components/AdminVehicleForm'
import AdminRentalRequests from '../components/AdminRentalRequests'
import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import Navbar from '../components/Navbar'
import VehicleStatusControl from '../components/VehicleStatusControl'
import { useVehicles } from '../hooks/useVehicles'

const AdminPage = () => {
  const { vehicles, loading, error, refreshVehicles } = useVehicles()

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container page-section">
        <div className="page-heading">
          <span className="eyebrow">Panel administrativo</span>
          <h1>Gestión de altas y estados de la flota</h1>
          <p>Registra vehículos nuevos y administra su disponibilidad utilizando APIs REST del backend existente.</p>
        </div>

        {loading ? <LoadingSpinner label="Sincronizando vehículos para administración..." /> : null}
        {error ? <ErrorMessage message={error} onRetry={refreshVehicles} /> : null}

        {!loading && !error ? (
          <>
            <div className="admin-grid">
              <AdminVehicleForm onVehicleCreated={refreshVehicles} />
              <VehicleStatusControl vehicles={vehicles} onStatusUpdated={refreshVehicles} />
            </div>
            <AdminRentalRequests vehicles={vehicles} onRequestsChanged={refreshVehicles} />
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}

export default AdminPage
