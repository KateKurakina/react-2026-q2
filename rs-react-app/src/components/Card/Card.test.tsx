import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';

describe('Card', () => {
  it('renders pokemon card', () => {
    render(
    <BrowserRouter>
      <Card
        item={{
          name: 'pikachu',
          description: '',
          detailsUrl: 'https://pokeapi.co/api/v2/pokemon/25/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          stats: '',
        }}
      />
    </BrowserRouter>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByRole("img")).toBeInTheDocument();

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});