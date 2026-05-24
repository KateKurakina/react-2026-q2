import { create } from "zustand";

type SelectedStore = {
    selected: string[];
    toggleSelected: (name: string) => void;
    clearSelected: () => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
    selected: [],

    toggleSelected: (name) =>
        set((state) => ({
            selected: state.selected.includes(name)
            ? state.selected.filter(
                item => item !== name
            )
            : [...state.selected, name]
        })),

    clearSelected: () =>
        set({
            selected: []
        }),    
}));