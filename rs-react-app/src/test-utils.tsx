import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

export function renderWithProviders(  
  ui: React.ReactNode,
  {
    route = "/pikachu",
  }: { route?: string; path?: string } = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}