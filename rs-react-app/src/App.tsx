import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PokemonDetails from "./pages/PokemonDetails";


function App() {

    return (
      <ErrorBoundary>
        <Routes>

          <Route path="/" element={<Home />}>
            <Route index element={null} />
          </Route>
          
          <Route
          path="/about"
          element={<About />}
          />

          <Route
          path="*"
          element={<NotFound />}
          />

        </Routes>
      </ErrorBoundary>
    );
  }

export default App;