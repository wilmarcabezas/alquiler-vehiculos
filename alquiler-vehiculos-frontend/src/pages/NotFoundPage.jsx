import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const NotFoundPage = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="container page-section centered-page">
        <div className="glass-card not-found-card">
          <span className="eyebrow">404</span>
          <h1>Página no encontrada</h1>
          <p>La ruta solicitada no existe en esta aplicación. Puedes volver al inicio o ir al catálogo.</p>
          <div className="hero-actions">
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            <Link to="/vehiculos" className="btn btn-secondary">Ir a vehículos</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NotFoundPage
