import React from 'react';

type Props = {
    search: string;
}

type State = {
    data: any[];
    loading: boolean;
    error: string | null;
}

class Results extends React.Component<Props, State> {
    state: State = {
        data: [],
        loading: false,
        error: null,
    };

    componentDidMount() {
        this.fetchData(this.props.search);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.search !== this.props.search) {
        this.fetchData(this.props.search);
        }
    }

    fetchData = async (search: string) => {
        this.setState({ loading: true, error: null });

        try {
        let url = '';

        if (search) {
            url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
        } else {
            url = `https://pokeapi.co/api/v2/pokemon?limit=10`;
        }

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        let result = [];

        if (search) {
            result = [
            {
                name: data.name,
                description: `Height: ${data.height}, Weight: ${data.weight}`,
            },
            ];
        } else {
            result = data.results.map((item: any) => ({
            name: item.name,
            description: item.url,
            }));
        }

        this.setState({
            data: result,
            loading: false,
        });
        } catch (err) {
        this.setState({
            error: 'Something went wrong',
            loading: false,
        });
        }
    };

    render() {
        const { data, loading, error } = this.state;

        if (loading) return <p>Loading...</p>;

        if (error) return <p>{error}</p>;

        return (
            <div className='results'>
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Results;