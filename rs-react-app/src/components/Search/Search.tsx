import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Props = {
    onSearch: (value: string) => void;
    currentSearch: string;
}

export default function Search({
    onSearch,
    currentSearch,
}: Props)  {

    const [value, setValue] = useLocalStorage("search", "");

    useEffect(() => {
        if (currentSearch) {
            setValue(currentSearch);
        }
    }, [currentSearch]);
    
    const handleSearch = () => {
        const trimmed = value.trim();

        if (trimmed === currentSearch.trim()) return;

        setValue(trimmed);
        onSearch(trimmed);
    };

    

    return (
        <div className='search'>
            <input 
            type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Search Pokemon...' 
            />
            
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
