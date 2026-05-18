import Search from '../Search/Search'

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
        </header>
    );
}