import { useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import Results from "../components/Results/Results";


export default function Home() {
  const [search, setSearch] = useState('');
  const [hasCrash, setHasCrash] = useState(false);
  const { detailsId } = useParams();
  const navigate = useNavigate();


  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCloseDetails = () => {
    navigate("/");
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
            {detailsId ? (
                <>
                    <button onClick={handleCloseDetails}>
                        Close
                    </button>

                    <Outlet />
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

      {hasCrash && (() => { throw new Error("Test error"); })()}

    </div>
  );
}