import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '../CardList/CardList';
import type { PokemonItem } from "../../types";

type Props = {
  search: string;
}

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


export default function Results({ search }: Props) {
    const [data, setData] =
    useState<PokemonItem[]>([]);

    const [loading, setLoading] =
    useState(false);

    const [error, setError] =
    useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const offset = (page - 1) * 10;

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({
                page: "1",
            });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [search, page]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = search
                ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
                : `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

            await new Promise((r) =>
                setTimeout(r, 300)
            );

            const res = await fetch(url);

            if (!res.ok) {
                throw Error();
            }

            const apiData = await res.json();

            const result: PokemonItem[] = await Promise.all(
                apiData.results.map(async (item: ApiPokemon) => {
                    const res = await fetch(item.url);
                    const data: PokemonDetails = await res.json();
                    const stats = data.stats.map(s => `${s.stat.name}:${s.base_stat}`).join(' | ');

                    return {
                        name: data.name,
                        description: `Height: ${data.height}, Weight: ${data.weight}`,
                        detailsUrl: item.url,
                        sprite: data.sprites.front_default,
                        stats,
                    };
                })
            );

            setData(result);
        }
        catch {
            setError(
                search
                ? "Pokemon not found"
                : "Failed to load Pokemon list"
            );
        }
        finally {
        setLoading(false);
        }
    };

    return (
      <div className="results">
        {loading && <div className="loader">Loading...</div>}

        {error ? <p>{error}</p> : <CardList items={data} />}

        {!!data.length && (    
            <div className="pagination">
                <button 
                disabled={page === 1}
                onClick={() => setSearchParams({page: String(page - 1)})}
                >
                Prev
                </button>

                <p>Page {page}</p>

                <button 
                onClick={() => setSearchParams({page: String(page + 1)})}
                >
                Next
                </button>
            </div>
        )}
      </div>
    );
}
