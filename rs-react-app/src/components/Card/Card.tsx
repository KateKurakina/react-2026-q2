import { useSearchParams, useNavigate } from "react-router-dom";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {   
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const navigate = useNavigate();
    
    return (
        <div className="card" onClick={() => navigate(`/${item.name}?page=${page}`)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
        </div>
    );
}