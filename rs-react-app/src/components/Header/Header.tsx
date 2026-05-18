import Search from '../Search/Search'
import { Link } from 'react-router-dom';

type Props = {
    onSearch: (value: string) => void;
    currentSearch: string;
}

export default function Header({
    onSearch,
    currentSearch,
}: Props)  {
    return (
        <header className="header">
            <Search
                onSearch={onSearch}
                currentSearch={currentSearch}
            />
            <Link to="/about">About</Link>
        </header>
    );
}