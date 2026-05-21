import { Link } from 'react-router-dom'

/** Hero principal con propuesta de valor del sistema. */
const HeroSection = () => {
  return (
    <section className="hero-section container">
      <div className="hero-copy">
        <span className="eyebrow">Sistema de Gestión de Alquiler de Vehículos</span>
        <h1>Controla la disponibilidad, reserva y operación de tu flota en una sola plataforma.</h1>
        <p>
          Una interfaz moderna para consultar vehículos, registrar solicitudes de alquiler y administrar el estado
          operativo de la flota conectada al backend institucional.
        </p>

        <div className="hero-actions">
          <Link to="/vehiculos" className="btn btn-primary">
            Explorar vehículos
          </Link>
          <Link to="/admin" className="btn btn-secondary">
            Ir al panel administrativo
          </Link>
        </div>
      </div>

      <div className="hero-card glass-card">
        <div className="hero-stat">
          <strong>Disponibilidad en tiempo real</strong>
          <span>Consulta estados centralizados desde el backend existente.</span>
        </div>
        <ul className="feature-list">
          <li>Alquiler rápido</li>
          <li>Vehículos disponibles en tiempo real</li>
          <li>Gestión segura</li>
          <li>Administración centralizada</li>
        </ul>
      </div>
    </section>
  )
}

export default HeroSection
