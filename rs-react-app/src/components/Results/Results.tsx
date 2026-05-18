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

            const result: PokemonItem[] =
                search
                ? [{
                    name: apiData.name,
                    description:
                        `Height: ${apiData.height},
                        Weight: ${apiData.weight}`,
                    }]
                : apiData.results.map(
                    (item: ApiPokemon) => ({
                        name: item.name,
                        description: item.url,
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
