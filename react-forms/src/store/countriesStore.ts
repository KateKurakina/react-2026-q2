import { create } from "zustand";

type CountriesStore = {
    countries: string[];
};

export const useCountriesStore = create<CountriesStore>(() => ({
    countries: [
        'Germany',
        'Poland',
        'Italy',
        'Spain',
        'England',
        'Russia'
    ],
}));