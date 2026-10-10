import { useEffect, useState } from "react";

export function useDebounce<T>(valeur: T, delaiMs = 400): T {
  const [debounced, setDebounced] = useState<T>(valeur);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(valeur), delaiMs);
    return () => clearTimeout(id);
  }, [valeur, delaiMs]);
  return debounced;
}