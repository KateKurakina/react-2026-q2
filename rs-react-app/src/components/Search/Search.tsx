import React from 'react';

type Props = {
    onSearch: (value: string) => void;
    currentSearch: string;
}
type State = {
    value: string;
}

class Search extends React.Component<Props, State> {
    state: State = {
        value: '',
    }

    componentDidMount() {
        const saved = localStorage.getItem('search');

        if (saved) {
        this.setState({ value: saved });
        this.props.onSearch(saved); // load the data
        } else {
        this.props.onSearch(''); // loading the default list
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    handleSearch = () => {
        const trimmed = this.state.value.trim();

        if (trimmed === this.props.currentSearch.trim()) return;

        localStorage.setItem('search', trimmed);
        this.props.onSearch(trimmed);
    };

    render() {
        return (
            <div className='search'>
                <input 
                type="text" 
                value={this.state.value}
                onChange={this.handleChange}
                placeholder='Search Pokemon...' />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}
export default Search;