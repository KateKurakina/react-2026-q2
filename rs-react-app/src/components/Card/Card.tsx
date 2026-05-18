import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

export default function Card({ item }: Props) {    
        return (
            <div className="card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
        );
}