import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '../CardList/CardList';

import {usePokemonList, usePokemonSearch} from "../../hooks/usePokemonQueries";

type Props = {
  search: string;
}

export default function Results({ search }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({
                page: "1",
            });
        }
    }, []);

    const listQuery = usePokemonList(page);
    const searchQuery = usePokemonSearch(search);
    const activeQuery = search ? searchQuery : listQuery;
    const {
        data = [],
        isLoading,
        error,
    } = activeQuery;

    return (
      <div className="results">
        {isLoading && <div className="loader">Loading...</div>}

        {error ? <p>{error.message}</p> : <CardList items={data} />}

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
