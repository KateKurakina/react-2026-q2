import { useEffect, useState } from "react";

type Props = {
    name: string;
}

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

export default function PokemonDetails({ name }:Props) {
  const [pokemon, setPokemon] =
    useState<Pokemon | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        const data = await res.json();

        setPokemon(data);
      }
      finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  if (loading)
    return <p>Loading...</p>;

  if (!pokemon)
    return <p>Not found</p>;

  return (
    <div className="details">

      <h2>{pokemon.name}</h2>

      <p>
        Height:
        {pokemon.height}
      </p>

      <p>
        Weight:
        {pokemon.weight}
      </p>

      

    </div>
  );
}