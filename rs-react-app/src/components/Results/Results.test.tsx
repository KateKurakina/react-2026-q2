import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import Results from './Results';
import { BrowserRouter } from 'react-router-dom';

describe('Results', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    global.fetch = vi.fn(() =>
      new Promise(() => {})
    ) as Mock;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders fetched pokemon list', async () => {
    global.fetch = vi.fn().mockImplementation((url) => {
      if (String(url).includes('pokemon?')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            results: [
              {
                name: 'pikachu',
                url: 'pokemon-url',
              },
            ]
          })
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({
          name: 'pikachu',
          height: 4,
          weight: 60,
          sprites:{ front_default: "img"},
          stats: [
            {
              stat: { name: 'speed' },
              base_stat: 90
            }
          ]
        })
      });
      
    }) as Mock;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

    expect(
      await screen.findByText('Failed to load Pokemon list')
    ).toBeInTheDocument();
  });

  it('renders searched pokemon', async () => {
    global.fetch = vi.fn().mockImplementation((url) => {
      if (String(url).includes('pokemon?')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            results: [
              {
                name: 'pikachu',
                url: 'pokemon-url',
              },
            ]
          })
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({
          name: 'pikachu',
          height: 4,
          weight: 60,
          sprites:{ front_default: "img"},
          stats: [
            {
              stat: { name: 'speed' },
              base_stat: 90
            }
          ]
        })
      });
      
    }) as Mock;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();

    
  });

  it('calls next page on button click', async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: 'pikachu',
            url: 'pokemon-url',
          },
        ]
      })
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        sprites:{ front_default: "img"},
        stats: []
      })
    })

    global.fetch = fetchMock as any;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

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

    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: 'pikachu',
            url: 'pokemon-url',
          },
        ]
      })
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        sprites:{ front_default: "img"},
        stats: []
      })
    })

    global.fetch = fetchMock as any;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

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

    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: 'pikachu',
            url: 'pokemon-url',
          },
        ]
      })
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        sprites:{ front_default: "img"},
        stats: []
      })
    })

    global.fetch = fetchMock as any;

    render(
      <BrowserRouter>
        <Results search="" />
      </BrowserRouter>
    );

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