import { useState } from "react";
import { useSearchParams, Outlet, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import Results from "../components/Results/Results";
import SelectedBar from "../components/SelectedBar/SelectedBar";


export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { detailsId } = useParams();

  const search = searchParams.get("search") || "";
  const [hasCrash, setHasCrash] = useState(false);


  const handleSearch = (value: string) => {
    setSearchParams({
      page: "1",
      ...(value && { search: value }),
      ...(detailsId && { details: detailsId }),
    });
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
          <Outlet context={{ detailsId }} />
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