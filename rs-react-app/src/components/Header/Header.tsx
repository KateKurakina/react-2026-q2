import Search from '../Search/Search'
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

type Props = {
    onSearch: (value: string) => void;
    currentSearch: string;
    
}

export default function Header({
    onSearch,
    currentSearch,
}: Props)  {
    const {theme, toggleTheme} = useTheme();

    return (
        <header className="header">
            <Search
                onSearch={onSearch}
                currentSearch={currentSearch}
            />
            <Link to="/about">About</Link>
            <button onClick={toggleTheme}>Theme: {theme}</button>
        </header>
    );
}