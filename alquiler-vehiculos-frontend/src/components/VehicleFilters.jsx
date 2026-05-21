/** Filtros visuales para búsqueda, estado y ordenamiento. */
const VehicleFilters = ({ filters, onChange }) => {
  return (
    <section className="filters-panel glass-card">
      <div className="field-group">
        <label htmlFor="search">Buscar por marca, modelo o placa</label>
        <input
          id="search"
          type="search"
          placeholder="Ej. Toyota, Corolla, ABC123"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </div>

      <div className="field-group">
        <label htmlFor="status">Estado</label>
        <select id="status" value={filters.estado} onChange={(event) => onChange({ ...filters, estado: event.target.value })}>
          <option value="TODOS">Todos</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="NO_DISPONIBLE">Alquilado</option>
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="sort">Ordenar</label>
        <select id="sort" value={filters.sort} onChange={(event) => onChange({ ...filters, sort: event.target.value })}>
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>
    </section>
  )
}

export default VehicleFilters
