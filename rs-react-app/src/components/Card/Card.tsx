import React from "react";
import type { PokemonItem } from "../../types";

type Props = {
    item: PokemonItem;
};

class Card extends React.Component<Props> {
    render() {
        const { name, description } = this.props.item;
        
        return (
            <div className="card">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        );
    }
}

export default Card;