import { create } from "zustand";
import type { PokemonItem } from "../types";

type SelectedStore = {
    selected: PokemonItem[];
    toggleSelected: (item: PokemonItem) => void;
    clearSelected: () => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
    selected: [],

    toggleSelected: (pokemon) =>
        set((state) => {
            const exists = state.selected.some(p => p.name === pokemon.name);

            return {
                selected: exists 
                ? state.selected.filter(
                p => p.name !== pokemon.name)
            : [...state.selected, pokemon],
            };
            
        }),

    clearSelected: () =>
        set({
            selected: []
        }),    
}));