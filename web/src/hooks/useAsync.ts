import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/httpClient";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState<number>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stable = useCallback(fn, deps);

  useEffect(() => {
    let annule = false;
    setLoading(true);
    setError(null);
    stable()
      .then((d) => { if (!annule) setData(d); })
      .catch((e: unknown) => {
        if (!annule) setError(e instanceof ApiError ? e.message : "Erreur inattendue");
      })
      .finally(() => { if (!annule) setLoading(false); });
    return () => { annule = true; };
  }, [stable, tick]);

  const reload = useCallback((): void => setTick((t) => t + 1), []);
  return { data, loading, error, reload };
}
