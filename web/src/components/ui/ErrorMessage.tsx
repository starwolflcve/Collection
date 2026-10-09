interface Props { message: string; onRetry?: () => void }

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="state state-error" role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Réessayer</button>}
    </div>
  );
}