import type { PokemonItem } from "../../types";
import Card from "../Card/Card";

type Props = {
    items: PokemonItem[];
}

export default function CardList({ items }: Props) {
    return (
        <div className="card-list">
            {items.map((item) => (
                <Card 
                key={item.name} 
                item={item} 
                />
            ))}
        </div>
    );
}
