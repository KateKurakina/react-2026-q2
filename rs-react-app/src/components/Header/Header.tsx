import React from 'react';
import Search from '../Search/Search'

type Props = {
    onSearch: (value: string) => void;
    currentSearch: string;
}

class Header extends React.Component<Props> {
    render() {
        return (
            <header className="header">
                <Search
                    onSearch={this.props.onSearch}
                    currentSearch={this.props.currentSearch}
                />
            </header>
        );
    }
}

export default Header;