// src/hooks/useLocalStorage.ts
import { useCallback, useState } from "react";

export function useLocalStorage<T>(cle: string, valeurInitiale: T): [T, (v: T) => void] {
  const [valeurStockee, setValeurStockee] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(cle);
      return item ? JSON.parse(item) : valeurInitiale;
    } catch (error) {
      console.warn("Erreur de lecture du localStorage", error);
      return valeurInitiale;
    }
  });

  const setValue = useCallback((valeur: T) => {
    try {
      setValeurStockee(valeur);
      window.localStorage.setItem(cle, JSON.stringify(valeur));
    } catch (error) {
      console.warn("Erreur d'écriture dans le localStorage", error);
    }
  }, [cle]);

  return [valeurStockee, setValue];
}

