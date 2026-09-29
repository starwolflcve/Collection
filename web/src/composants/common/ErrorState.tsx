interface ErrorStateProps {
	message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
	return <p className="catalogue-state error-state" role="alert">{message}</p>;
}
