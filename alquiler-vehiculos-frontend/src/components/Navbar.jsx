import { useState } from 'react'
import { NavLink } from 'react-router-dom'

/** Componente principal de navegación global. */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = () => setIsOpen(false)

  return (
    <header className="navbar-shell">
      <nav className="navbar container">
        <div className="navbar-top-row">
          <NavLink to="/" className="brand-mark" onClick={handleNavigate}>
            RentFlow
            <span>Gestión inteligente de alquiler</span>
          </NavLink>

          <button
            type="button"
            className={`menu-toggle ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
          <NavLink to="/" onClick={handleNavigate}>Inicio</NavLink>
          <NavLink to="/vehiculos" onClick={handleNavigate}>Vehículos</NavLink>
          <NavLink to="/admin" onClick={handleNavigate}>Administración</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
