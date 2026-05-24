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

    const checked = selected.some(p => p.name === item.name);
    
    return (
        <div className="card" onClick={() => navigate(`/${item.name}`)}>
            <input 
            type="checkbox" 
            checked={checked} 
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleSelected(item)}
            />
            <h3>{item.name}</h3>
            <img src={item.sprite} alt="" />
            <p>{item.detailsUrl}</p>
        </div>
    );
}