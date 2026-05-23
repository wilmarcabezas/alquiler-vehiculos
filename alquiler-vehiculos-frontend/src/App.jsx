import { useState } from 'react'
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import VehicleDetail from './pages/VehicleDetail'
import Vehicles from './pages/Vehicles'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar-shell">
      <nav className="navbar container">
        <div className="navbar-top-row">
          <NavLink to="/" className="brand-mark" onClick={closeMenu}>
            RentFlow
            <span>Gestion inteligente de alquiler</span>
          </NavLink>
          <button
            type="button"
            className={`menu-toggle ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Abrir menu de navegacion"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
          <NavLink to="/vehiculos" onClick={closeMenu}>Vehiculos</NavLink>
          <NavLink to="/admin" onClick={closeMenu}>Administracion</NavLink>
        </div>
      </nav>
    </header>
  )
}

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <div>
        <strong>RentFlow Front-End</strong>
        <p>Aplicacion React conectada al backend existente para la gestion de alquiler de vehiculos.</p>
      </div>
      <p>Desarrollo Web Full Stack - Entrega Front-End</p>
    </div>
  </footer>
)

const Layout = () => (
  <div className="page-shell">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
)

const NotFound = () => (
  <main className="container page-section centered-page">
    <div className="glass-card not-found-card">
      <span className="eyebrow">404</span>
      <h1>Pagina no encontrada</h1>
      <p>La ruta solicitada no existe en esta aplicacion. Puedes volver al inicio o ir al catalogo.</p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        <Link to="/vehiculos" className="btn btn-secondary">Ir a vehiculos</Link>
      </div>
    </div>
  </main>
)

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculos" element={<Vehicles />} />
        <Route path="/vehiculos/:id" element={<VehicleDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
