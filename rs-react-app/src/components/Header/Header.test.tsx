import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders Search component', () => {
    render(
      <Header
        onSearch={vi.fn()}
        currentSearch=""
      />
    );

    expect(
      screen.getByPlaceholderText('Search Pokemon...')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /search/i,
      })
    ).toBeInTheDocument();
  });
});