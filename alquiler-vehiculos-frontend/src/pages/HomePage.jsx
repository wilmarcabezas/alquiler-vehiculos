import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <HeroSection />

        <section className="benefits-section container">
          <div className="section-title center">
            <h2>Una plataforma pensada para operación real</h2>
            <p>Diseñada para integrar disponibilidad, solicitudes y administración centralizada de la flota.</p>
          </div>

          <div className="benefits-grid">
            <article className="glass-card">
              <h3>Alquiler rápido</h3>
              <p>Consulta disponibilidad y registra solicitudes con formularios claros y flujo de operación directo.</p>
            </article>
            <article className="glass-card">
              <h3>Disponibilidad en tiempo real</h3>
              <p>Los estados se leen desde el backend existente para mejorar la trazabilidad del proceso.</p>
            </article>
            <article className="glass-card">
              <h3>Gestión segura</h3>
              <p>Mensajes de error, validaciones y visualización estructurada para una experiencia confiable.</p>
            </article>
            <article className="glass-card">
              <h3>Administración centralizada</h3>
              <p>Alta de vehículos y actualización de estados en un panel administrativo simple y efectivo.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
