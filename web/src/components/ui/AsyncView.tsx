import type { ReactNode } from "react";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyState } from "./EmptyState";

interface Props<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  isEmpty: (d: T) => boolean;
  emptyMessage: string;
  children: (d: T) => ReactNode;
}

export function AsyncView<T>({
  data, loading, error, onRetry, isEmpty, emptyMessage, children,
}: Props<T>) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (data === null || isEmpty(data)) return <EmptyState message={emptyMessage} />;
  return <>{children(data)}</>;
}