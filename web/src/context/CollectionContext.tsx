import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Entry, EntryCreate, EntryUpdate, Item, Statut } from "../types/api";
import { useAuth } from "./AuthContext";
import * as collectionService from "../services/collectionService";

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
		collectionService.getCollection({})
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
		const payload: EntryCreate = {
			item_id: item.id,
			...values,
		};
		const entry = await collectionService.addEntry(payload);
		setEntries((current) => [...current.filter((existing) => existing.id !== entry.id), entry]);
		return entry;
	};

	const updateEntry = async (entryId: number, values: Partial<EntryValues>) => {
		const payload: EntryUpdate = values;
		const entry = await collectionService.updateEntry(entryId, payload);
		setEntries((current) => current.map((existing) => existing.id === entryId ? entry : existing));
		return entry;
	};

	const deleteEntry = async (entryId: number) => {
		await collectionService.deleteEntry(entryId);
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
