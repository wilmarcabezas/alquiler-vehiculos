/** Indicador visual para estados de carga. */
const LoadingSpinner = ({ label = 'Cargando información...' }) => {
  return (
    <div className="feedback-state">
      <div className="spinner" aria-hidden="true"></div>
      <p>{label}</p>
    </div>
  )
}

export default LoadingSpinner
