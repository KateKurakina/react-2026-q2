import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders not found page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go home/i)).toBeInTheDocument();
  });
});