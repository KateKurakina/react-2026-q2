import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders app components', () => {
    render(<App />);

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

    render(<App />);

    const button = screen.getByRole('button', {
      name: /test error/i,
    });

    await user.click(button);

    expect(
      screen.getByText('Something went wrong')
    ).toBeInTheDocument();
  });
});