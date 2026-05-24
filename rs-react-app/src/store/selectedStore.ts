import { create } from "zustand";
import type { PokemonItem } from "../types";

type SelectedStore = {
    selected: PokemonItem[];
    toggleSelected: (item: PokemonItem) => void;
    clearSelected: () => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
    selected: [],

    toggleSelected: (item) =>
        set((state) => ({
            selected: state.selected.some(p => p.name === item.name)
            ? state.selected.filter(
                p => p.name !== item.name
            )
            : [...state.selected, item]
        })),

    clearSelected: () =>
        set({
            selected: []
        }),    
}));