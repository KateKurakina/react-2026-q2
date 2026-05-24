import { useNavigate } from "react-router-dom";
import { useSelectedStore } from "../../store/selectedStore";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {   
    const navigate = useNavigate();

    const selected = useSelectedStore(state => state.selected);

    const toggleSelected = useSelectedStore(state => state.toggleSelected)

    const checked = selected.includes(item.name);
    
    return (
        <div className="card" onClick={() => navigate(`/${item.name}`)}>
            <input 
            type="checkbox" 
            checked={checked} 
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleSelected(item.name)}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
        </div>
    );
}