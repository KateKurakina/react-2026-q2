import { screen } from '@testing-library/react';
import PokemonDetails from './PokemonDetails';
import { renderWithProviders } from '../test-utils'; 

describe('PokemonDetails', () => {
  it('shows loading', () => {
    global.fetch = vi.fn(() => 
        Promise.resolve({
            ok: true,
            json: async () => ({
                name: 'pikachu',
                height: 4,
                weight: 60,
            }),
        } as Response)
    );

    renderWithProviders(<PokemonDetails />, {
      route: "/pikachu",
    });

    expect(screen.getByText(/loading/i))
      .toBeInTheDocument();
  });

  it('renders pokemon data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        height: 4,
        weight: 60
      })
    });

    renderWithProviders(<PokemonDetails />, {
      route: "/pikachu",
    });

    expect(
      await screen.findByText('pikachu')
    ).toBeInTheDocument();
  });

  it('renders not found', async () => {
    global.fetch = vi.fn().mockRejectedValue(
      new Error()
    );

    renderWithProviders(<PokemonDetails />, {
      route: "/pikachu",
    });

    expect(
      await screen.findByText(/not found/i)
    ).toBeInTheDocument();
  });
});