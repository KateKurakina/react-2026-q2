import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header/Header";
import Results from "../components/Results/Results";
import ErrorTrigger from "../components/ErrorTrigger/ErrorTrigger";
import PokemonDetails from "./PokemonDetails";


export default function Home() {
  const [search, setSearch] = useState('');
  const [hasCrash, setHasCrash] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = searchParams.get("details");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="app">

      <Header
        onSearch={handleSearch}
        currentSearch={search}
      />

      <div className="split-view">

        <div className="left-panel">
            <Results search={search} />
        </div>
        <div className="right-panel">
            {selected ? (
                <>
                    <button 
                        onClick={() =>
                            setSearchParams((prev) => {
                                const page = prev.get("page") || "1";
                                return { page };
                            })
                        }
                    >
                        Close
                    </button>
                
                <PokemonDetails name={selected} />
                </>
                
            ) : (
                <p>Select pokemon</p>
            )}
            
        </div>

      </div>

      <button
        className="button__error"
        onClick={() => setHasCrash(true)}
      >
        Test Error
      </button>

      <ErrorTrigger shouldCrash={hasCrash} />

    </div>
  );
}