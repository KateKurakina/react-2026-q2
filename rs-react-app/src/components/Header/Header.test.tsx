import { render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Header', () => {
  it('renders Search component', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Header
            onSearch={vi.fn()}
            currentSearch=""
          />
        </BrowserRouter>
      </ThemeProvider>
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