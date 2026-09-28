import { useState } from 'react';

export function useLocalStorage<T>(cle: string, valeurInitiale: T): [T, (v: T) => void] {
  const [valeur, setValeur] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(cle);
      return item ? JSON.parse(item) : valeurInitiale;
    } catch (error) {
      return valeurInitiale;
    }
  });

  const setValue = (valeurAStocker: T) => {
    try {
      setValeur(valeurAStocker);
      window.localStorage.setItem(cle, JSON.stringify(valeurAStocker));
    } catch (error) {
      console.error(error);
    }
  };

  return [valeur, setValue];
}
