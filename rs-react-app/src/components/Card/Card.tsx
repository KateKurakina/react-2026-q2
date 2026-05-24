import { useNavigate } from "react-router-dom";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {   
    const navigate = useNavigate();
    
    return (
        <div className="card" onClick={() => navigate(`/${item.name}`)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
        </div>
    );
}