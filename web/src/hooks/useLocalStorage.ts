import { useCallback, useState } from "react";

export function useLocalStorage<T>(
  cle: string,
  valeurInitiale: T,
): [T, (v: T) => void] {
  const [valeur, setValeur] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(cle);
      return raw === null ? valeurInitiale : (JSON.parse(raw) as T);
    } catch {
      return valeurInitiale;
    }
  });

  const definir = useCallback(
    (v: T): void => {
      setValeur(v);
      localStorage.setItem(cle, JSON.stringify(v));
    },
    [cle],
  );

  return [valeur, definir];
}
