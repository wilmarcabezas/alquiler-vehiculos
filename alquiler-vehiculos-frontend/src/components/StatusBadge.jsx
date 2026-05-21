/** Badge reutilizable para representar estados de vehículo. */
const StatusBadge = ({ status }) => {
  const normalized = status?.toUpperCase?.() || 'DESCONOCIDO'
  const className = `status-badge status-${normalized.toLowerCase()}`

  return <span className={className}>{normalized.replaceAll('_', ' ')}</span>
}

export default StatusBadge
