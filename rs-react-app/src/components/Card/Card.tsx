import { Link, useSearchParams } from "react-router-dom";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {   
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    
    return (
        <Link to={`?page=${page}&details=${item.name}`}
        >
            <div className="card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
        </Link>    
    );
}