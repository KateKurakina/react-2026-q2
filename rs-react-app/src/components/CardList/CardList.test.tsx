import { render, screen } from '@testing-library/react';
import CardList from './CardList';

describe('CardList', () => {
  it('renders correct number of cards', () => {
    render(
      <CardList
        items={[
          {
            name: 'pikachu',
            description: 'electric',
          },
          {
            name: 'bulbasaur',
            description: 'grass',
          },
        ]}
      />
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders empty list correctly', () => {
    render(<CardList items={[]} />);

    const cards = document.querySelectorAll('.card');

    expect(cards.length).toBe(0);
  });
});