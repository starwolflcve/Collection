// src/types/api.ts

export type Statut = "a decouvrir" | "en cours" | "termine";

export interface Item {
  id: number;
  titre: string;
  image_url: string;
  categorie: string;
  description: string;
  annee: number;
  // Champs spécifiques à l'univers automobile
  constructeur?: string;
  motorisation?: string;
  puissance?: string;
  pays?: string;
}

export interface Entry {
  id: number;
  statut: Statut;
  note?: number;
  commentaire?: string;
  date_ajout: string;
  item: Item;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  results: T[];
}

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ApiErrorFormat {
  erreur: {
    code: number;
    message: string;
  };
}
