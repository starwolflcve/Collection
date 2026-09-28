export type Statut = "a decouvrir" | "en cours" | "termine";

export interface Item {
  id: number;
  titre: string;
  image_url: string;
  categorie: string;
  description: string;
  annee: number;
  constructeur: string;
  motorisation: string;
  puissance: string;
  pays_origine: string;
}

export interface Entry {
  id: number;
  statut: Statut;
  note?: number;
  commentaire?: string;
  date_ajout: string;
  item: Item;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface Stats {
  total: number;
  par_statut: Record<string, number>;
  note_moyenne: number;
}