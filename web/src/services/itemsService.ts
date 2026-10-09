import { request } from "./httpClient";
import type { Item, ItemsPage, ItemsQuery } from "../types/api";

export const getItems = (q: ItemsQuery): Promise<ItemsPage> =>
  request<ItemsPage>("/items", { params: { ...q } });

export const getItem = (id: number): Promise<Item> =>
  request<Item>(`/items/${id}`);