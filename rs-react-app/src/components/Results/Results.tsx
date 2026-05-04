import React from 'react';
import CardList from '../CardList/CardList';
import type { PokemonItem } from "../../types";

type Props = {
    search: string;
}

type State = {
    data: PokemonItem[];
    loading: boolean;
    error: string | null;
    offset: number;
}

type ApiPokemon = {
  name: string;
  url: string;
}


class Results extends React.Component<Props, State> {
    state: State = {
        data: [],
        loading: false,
        error: null,
        offset: 0,
    };

    componentDidMount() {
        this.fetchData(this.props.search);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (
            prevProps.search !== this.props.search ||
            prevState.offset !== this.state.offset
        ) {
            this.fetchData(this.props.search);
        }
    }

    fetchData = async (search: string) => {
        this.setState({ loading: true, error: null });

        try {
            const { offset } = this.state;

            const url = search
            ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
            : `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

            await new Promise((r) => setTimeout(r, 300));

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();

            const result: PokemonItem[] = search
            ? [
                {
                    name: data.name,
                    description: `Height: ${data.height}, Weight: ${data.weight}`,
                },
            ]
            : data.results.map((item: ApiPokemon) => ({
                name: item.name,
                description: item.url,
            }));

            this.setState({
                data: result,
                loading: false,
            });
        } catch (e: unknown) {
            this.setState({
                error: search
                ? 'Pokemon not found'
                : 'Failed to load Pokemon list',
                loading: false,
            });
        }
    };

    handleNext = () => {
        this.setState(
            (prev) => ({ offset: prev.offset + 10 }),
            () => this.fetchData(this.props.search)
        );
    };

    handlePrev = () => {
    this.setState(
        (prev) => ({ offset: Math.max(prev.offset - 10, 0) }),
        () => this.fetchData(this.props.search)
    );
    };

    render() {
        const { data, loading, error } = this.state;

       ;

    return (
      <div className="results">
        {loading && <div className="loader">Loading...</div>}

        {error ? <p>{error}</p> : <CardList items={data} />}

        <div className="pagination">
          <button onClick={this.handlePrev}>Prev</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    );
    }
}

export default Results;