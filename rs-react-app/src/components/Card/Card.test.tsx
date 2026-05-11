import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders pokemon name and description', () => {
    render(
      <Card
        item={{
          name: 'pikachu',
          description: 'electric pokemon',
        }}
      />
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(
      screen.getByText('electric pokemon')
    ).toBeInTheDocument();
  });
});