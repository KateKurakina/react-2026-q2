import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { BrowserRouter } from 'react-router-dom';

describe('CardList', () => {
  it('renders correct number of cards', () => {
    render(
      <BrowserRouter>
        <CardList
          items={[
            {
              name: 'pikachu',
              description: 'electric',
              detailsUrl:"",
              sprite:"",
              stats:""
            },
            {
              name: 'bulbasaur',
              description: 'grass',
              detailsUrl:"",
              sprite:"",
              stats:""
            },
          ]}
        />
      </BrowserRouter>
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