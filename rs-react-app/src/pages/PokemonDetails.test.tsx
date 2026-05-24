import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

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

    render(
      <MemoryRouter initialEntries={['/pikachu']}>
        <Routes>
          <Route path='/:detailsId' element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i))
      .toBeInTheDocument();
  });

  it('renders pokemon data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        name: 'pikachu',
        height: 4,
        weight: 60
      })
    });

    render(
      <MemoryRouter initialEntries={['/pikachu']}>
        <Routes>
          <Route path='/:detailsId' element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('pikachu')
    ).toBeInTheDocument();
  });

  it('renders not found', async () => {
    global.fetch = vi.fn().mockRejectedValue(
      new Error()
    );

    render(
      <MemoryRouter initialEntries={['/pikachu']}>
        <Routes>
          <Route path='/:detailsId' element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/not found/i)
    ).toBeInTheDocument();
  });
});