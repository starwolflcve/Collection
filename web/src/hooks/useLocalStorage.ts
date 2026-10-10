import { useCallback, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "../utils/storage";

export function useLocalStorage<T>(
  cle: string,
  valeurInitiale: T,
): [T, (v: T) => void] {
  const [valeur, setValeur] = useState<T>(() =>
    readLocalStorage(cle, valeurInitiale),
  );

  const definir = useCallback(
    (v: T): void => {
      setValeur(v);
      writeLocalStorage(cle, v);
    },
    [cle],
  );

  return [valeur, definir];
}
