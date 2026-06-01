import { useQuery } from "@tanstack/react-query";
import { getPokemonList, searchPokemon } from "../api/pokemonApi";

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