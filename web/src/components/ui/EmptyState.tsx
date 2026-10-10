interface Props { message: string }

export function EmptyState({ message }: Props) {
  return <p className="state">{message}</p>;
}