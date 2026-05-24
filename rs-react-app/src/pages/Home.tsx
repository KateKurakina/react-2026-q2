import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Results from "../components/Results/Results";
import SelectedBar from "../components/SelectedBar/SelectedBar";


export default function Home() {
  const [search, setSearch] = useState('');
  const [hasCrash, setHasCrash] = useState(false);


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
                    <Outlet />
        </div>

      </div>

      <button
        className="button__error"
        onClick={() => setHasCrash(true)}
      >
        Test Error
      </button>

      {hasCrash && (() => { throw new Error("Test error"); })()}

      <SelectedBar />

    </div>
  );
}