import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

describe('App', () => {
  it('renders app components', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
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
  
  it('triggers error boundary', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    );

    const button = screen.getByRole('button', {
      name: /test error/i,
    });

    await user.click(button);

    expect(
      screen.getByText('Something went wrong')
    ).toBeInTheDocument();
  });
});