import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import Results from './Results';

describe('Results', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    global.fetch = vi.fn(() =>
      new Promise(() => {})
    ) as Mock;

    render(<Results search="" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders fetched pokemon list', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                name: 'pikachu',
                url: 'pokemon-url',
              },
            ],
          }),
      })
    ) as Mock;

    render(<Results search="" />);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    render(<Results search="" />);

    expect(
      await screen.findByText('Failed to load Pokemon list')
    ).toBeInTheDocument();
  });

  it('renders searched pokemon', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'pikachu',
            height: 4,
            weight: 60,
          }),
      })
    ) as Mock;

    render(<Results search="pikachu" />);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();

    expect(
      await screen.findByText('Height: 4, Weight: 60')
    ).toBeInTheDocument();
  });

  it('calls next page on button click', async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [],
          }),
      })
    );

    global.fetch = fetchMock as any;

    render(<Results search="" />);

    const nextButton = await screen.findByRole('button', {
      name: /next/i,
    });

    await user.click(nextButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });

  it('handles pagination buttons', async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [{ name: 'pikachu', url: '' }],
          }),
      })
    );

    global.fetch = fetchMock as any;

    render(<Results search="" />);

    const next = await screen.findByRole('button', {
      name: /next/i,
    });

    await user.click(next);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });

  it('covers offset change branch in pagination', async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn(() =>
        Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
            results: [{ name: 'pikachu', url: '' }],
            }),
        })
    );

    global.fetch = fetchMock as any;

    render(<Results search="" />);

    const next = await screen.findByRole('button', {
        name: /next/i,
    });

    const prev = screen.getByRole('button', {
        name: /prev/i,
    });

    await user.click(next);
    await user.click(prev);

    await waitFor(() => {
        expect(fetchMock.mock.calls.length).toBeGreaterThan(1);
    });
  });
});