import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PokemonDetails from "./pages/PokemonDetails";
import { useTheme } from "./context/ThemeContext";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  const { theme } = useTheme();

  return (
    <ErrorBoundary>
      <div className={theme}>
        <Routes>

        <Route path="/" element={<Home />}>
          <Route path=":detailsId" element={<PokemonDetails />} />
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
      </div>     
    </ErrorBoundary>
  );
}

export default App;