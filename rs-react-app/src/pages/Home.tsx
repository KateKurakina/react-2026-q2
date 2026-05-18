import { useState } from "react";

import Header from "../components/Header/Header";
import Results from "../components/Results/Results";
import ErrorTrigger from "../components/ErrorTrigger/ErrorTrigger";

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

      <Results search={search} />

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