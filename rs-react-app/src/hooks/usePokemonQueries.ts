import { useQuery } from "@tanstack/react-query";
import { getPokemonList, searchPokemon, getPokemonDetails } from "../api/pokemonApi";

export function usePokemonList(page: number) {
    return useQuery({
        queryKey: ["pokemon", page],
        queryFn: () => getPokemonList(page),
    });
}

export function usePokemonSearch(search: string) {
    return useQuery({
        queryKey: ["search", search],
        queryFn: () => searchPokemon(search),
        enabled: !!search,
    });
}

export function usePokemonDetails(name: string) {
    return useQuery({
        queryKey: ["pokemon-details", name],
        queryFn: () => getPokemonDetails(name),
        enabled: !!name,
    });
}