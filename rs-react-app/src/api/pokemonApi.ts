import type { PokemonItem } from "../types";

type ApiPokemon = {
  name: string;
  url: string;
}

type PokemonStat = {
    stat: {
        name: string;
    };
    base_stat: number;
}

type PokemonDetails = {
    name: string;
    height: number;
    weight: number;
    stats: PokemonStat[];
    sprites: {
        front_default: string;
    };
}

export async function getPokemonList(page: number): Promise<PokemonItem[]> {
    const offset = (page - 1) * 10;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);

    if (!res.ok) throw new Error("Failed to load Pokemon list");

    const apiData = await res.json();

    return Promise.all(
        apiData.results.map(async (item: ApiPokemon) => {
            const res = await fetch(item.url);
            const data: PokemonDetails = await res.json();

            return {
                name: data.name,
                description: `Height: ${data.height}, Weight: ${data.weight}`,
                detailsUrl: item.url,
                sprite: data.sprites.front_default,
                stats: data.stats
                    .map(s => `${s.stat.name}:${s.base_stat}`)
                    .join(' | '),
            };
        })
    );
}

export async function searchPokemon(search: string): Promise<PokemonItem[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
    
    if (!res.ok) throw new Error("Failed to load Pokemon list");

    const data: PokemonDetails = await res.json();

    return [
        {
            name: data.name,
            description: `Height: ${data.height}, Weight: ${data.weight}`,
            detailsUrl: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
            sprite: data.sprites.front_default,
            stats: data.stats
                .map(s => `${s.stat.name}:${s.base_stat}`)
                .join(' | ')
        }
    ];
}

