import React from 'react';
import Search from '../Search/Search'

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Search />
            </header>
        );
    }
}

export default Header;