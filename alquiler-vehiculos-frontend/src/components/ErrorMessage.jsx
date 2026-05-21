/** Componente visual para errores de red o validación. */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="feedback-state error-state">
      <strong>Ocurrió un problema</strong>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </div>
  )
}

export default ErrorMessage
