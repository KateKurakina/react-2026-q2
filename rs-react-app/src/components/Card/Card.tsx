import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelectedStore } from "../../store/selectedStore";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {   
    const navigate = useNavigate();

    const selected = useSelectedStore(state => state.selected);

    const toggleSelected = useSelectedStore(state => state.toggleSelected)

    const checked = selected.some(p => p.name === item.name);

    const [searchParams] = useSearchParams();

    const query = searchParams.toString();
    
    return (
        <div className="card" onClick={() => navigate(`/${item.name}?page=${query}`)}>
            <input 
            type="checkbox" 
            checked={checked} 
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleSelected(item)}
            />
            <h3>{item.name}</h3>
            {item.sprite && (
                <img src={item.sprite} alt={item.name} />
            )}
            
            <a href={item.detailsUrl} target="_blank">Details</a>
        </div>
    );
}