import { request } from "./httpClient";
import type {
  CollectionQuery, Entry, EntryCreate, EntryUpdate, Stats,
} from "../types/api";

export const getCollection = (q: CollectionQuery): Promise<Entry[]> =>
  request<Entry[]>("/me/collection", { params: { ...q } });

export const addEntry = (b: EntryCreate): Promise<Entry> =>
  request<Entry>("/me/collection", { method: "POST", body: b });

export const updateEntry = (id: number, b: EntryUpdate): Promise<Entry> =>
  request<Entry>(`/me/collection/${id}`, { method: "PATCH", body: b });

export const deleteEntry = (id: number): Promise<void> =>
  request<void>(`/me/collection/${id}`, { method: "DELETE" });

export const getStats = (): Promise<Stats> => request<Stats>("/me/stats");