import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Entry, Item, Statut } from "../../types/api";
import { useAuth } from "./AuthContext";
import { httpClient } from "../services/httpClient";

interface EntryValues {
	statut: Statut;
	note: number | null;
	commentaire: string;
}

interface CollectionContextValue {
	entries: Entry[];
	isLoading: boolean;
	error: string | null;
	refresh: () => void;
	addEntry: (item: Item, values: EntryValues) => Promise<Entry>;
	updateEntry: (entryId: number, values: Partial<EntryValues>) => Promise<Entry>;
	deleteEntry: (entryId: number) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
	const { token } = useAuth();
	const [entries, setEntries] = useState<Entry[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		let active = true;

		if (!token) {
			setEntries([]);
			setError(null);
			setIsLoading(false);
			return () => {
				active = false;
			};
		}

		setIsLoading(true);
		setError(null);
		httpClient.get<Entry[]>("/me/collection")
			.then((collection) => {
				if (active) setEntries(collection);
			})
			.catch((loadError: unknown) => {
				if (active) {
					setError(loadError instanceof Error ? loadError.message : "Impossible de charger la collection.");
				}
			})
			.finally(() => {
				if (active) setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, [token, refreshKey]);

	const addEntry = async (item: Item, values: EntryValues) => {
		const entry = await httpClient.post<Entry>("/me/collection", {
			item_id: item.id,
			...values,
		});
		setEntries((current) => [...current.filter((existing) => existing.id !== entry.id), entry]);
		return entry;
	};

	const updateEntry = async (entryId: number, values: Partial<EntryValues>) => {
		const entry = await httpClient.patch<Entry>(`/me/collection/${entryId}`, values);
		setEntries((current) => current.map((existing) => existing.id === entryId ? entry : existing));
		return entry;
	};

	const deleteEntry = async (entryId: number) => {
		await httpClient.delete<void>(`/me/collection/${entryId}`);
		setEntries((current) => current.filter((entry) => entry.id !== entryId));
	};

	return (
		<CollectionContext.Provider value={{ entries, isLoading, error, refresh: () => setRefreshKey((key) => key + 1), addEntry, updateEntry, deleteEntry }}>
			{children}
		</CollectionContext.Provider>
	);
}

export function useCollection() {
	const context = useContext(CollectionContext);
	if (!context) throw new Error("useCollection doit être utilisé dans un CollectionProvider");
	return context;
}
