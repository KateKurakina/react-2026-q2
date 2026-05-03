import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className='search'>
                <input type="text" placeholder='Search Pokemon...' />
                <button>Search</button>
            </div>
        );
    }
}
export default Search;