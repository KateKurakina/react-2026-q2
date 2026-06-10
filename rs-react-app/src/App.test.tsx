import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithProviders } from './test-utils';

describe('App', () => {
  it('renders app components', () => {
    renderWithProviders(
          <App />
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

    renderWithProviders(
          <App />
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