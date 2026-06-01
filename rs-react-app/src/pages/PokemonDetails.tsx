import { useNavigate ,useParams, useSearchParams } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonQueries";

export default function PokemonDetails() {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonDetails(detailsId ?? "");

  if (isLoading)
    return <p>Loading...</p>;

  if (error) {
    return <p>Pokemon not found</p>
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="details">
      <button onClick={() => navigate(`/?${searchParams.toString()}`)}>
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