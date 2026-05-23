import { Link } from 'react-router-dom'

const Home = () => (
  <main>
    <section className="hero-section container">
      <div className="hero-copy">
        <span className="eyebrow">Sistema de Gestion de Alquiler de Vehiculos</span>
        <h1>Controla la disponibilidad, reserva y operacion de tu flota en una sola plataforma.</h1>
        <p>
          Una interfaz moderna para consultar vehiculos, registrar solicitudes de alquiler y administrar el estado
          operativo de la flota conectada al backend institucional.
        </p>
        <div className="hero-actions">
          <Link to="/vehiculos" className="btn btn-primary">Explorar vehiculos</Link>
          <Link to="/admin" className="btn btn-secondary">Ir al panel administrativo</Link>
        </div>
      </div>

      <div className="hero-card glass-card">
        <div className="hero-stat">
          <strong>Disponibilidad en tiempo real</strong>
          <span>Consulta estados centralizados desde el backend existente.</span>
        </div>
        <ul className="feature-list">
          <li>Alquiler rapido</li>
          <li>Vehiculos disponibles en tiempo real</li>
          <li>Gestion segura</li>
          <li>Administracion centralizada</li>
        </ul>
      </div>
    </section>

    <section className="benefits-section container">
      <div className="section-title center">
        <h2>Una plataforma pensada para operacion real</h2>
        <p>Disenada para integrar disponibilidad, solicitudes y administracion centralizada de la flota.</p>
      </div>

      <div className="benefits-grid">
        <article className="glass-card">
          <h3>Alquiler rapido</h3>
          <p>Consulta disponibilidad y registra solicitudes con formularios claros y flujo de operacion directo.</p>
        </article>
        <article className="glass-card">
          <h3>Disponibilidad en tiempo real</h3>
          <p>Los estados se leen desde el backend existente para mejorar la trazabilidad del proceso.</p>
        </article>
        <article className="glass-card">
          <h3>Gestion segura</h3>
          <p>Mensajes de error, validaciones y visualizacion estructurada para una experiencia confiable.</p>
        </article>
        <article className="glass-card">
          <h3>Administracion centralizada</h3>
          <p>Alta de vehiculos y actualizacion de estados en un panel administrativo simple y efectivo.</p>
        </article>
      </div>
    </section>
  </main>
)

export default Home
