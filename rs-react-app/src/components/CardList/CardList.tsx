import React from "react";
import type { PokemonItem } from "../../types";
import Card from "../Card/Card";

type Props = {
    items: PokemonItem[];
}

class CardList extends React.Component<Props> {
    render() {
        return (
            <div className="card-list">
                {this.props.items.map((item) => (
                    <Card key={item.name} item={item} />
                ))}
            </div>
        );
    }
}

export default CardList;