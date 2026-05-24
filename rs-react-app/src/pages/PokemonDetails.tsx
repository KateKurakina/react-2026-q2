import { useNavigate ,useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

export default function PokemonDetails() {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.toString();

  const [pokemon, setPokemon] =
    useState<Pokemon | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setPokemon(null);

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${detailsId}`
        );

        const data = await res.json();

        setPokemon(data);
      }
      finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [detailsId]);

  if (loading)
    return <p>Loading...</p>;

  if (!pokemon)
    return <p>Not found</p>;

  return (
    <div className="details">
      <button onClick={() => navigate(`/?page=${query}`)}>
        Close
      </button>

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