interface EmptyStateProps {
	message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
	return <p className="catalogue-state empty-state">{message}</p>;
}
