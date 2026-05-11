import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });
  
  it('renders input and button', () => {
    render(
      <Search
        onSearch={vi.fn()}
        currentSearch=""
      />
    );

    expect(
      screen.getByPlaceholderText('Search Pokemon...')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /search/i })
    ).toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(
        <Search
        onSearch={vi.fn()}
        currentSearch=""
        />
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');

    await user.type(input, 'pikachu');

    expect(input).toHaveValue('pikachu');
  });

  it('calls onSearch when button is clicked', async () => {
    const user = userEvent.setup();

    const onSearch = vi.fn();

    render(
        <Search
        onSearch={onSearch}
        currentSearch=""
        />
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');
    const button = screen.getByRole('button', {
        name: /search/i,
    });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('saves search term to localStorage', async () => {
    const user = userEvent.setup();

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
        <Search
        onSearch={vi.fn()}
        currentSearch=""
        />
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');
    const button = screen.getByRole('button', {
        name: /search/i,
    });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith(
        'search',
        'pikachu'
    );
  });

  it('trims whitespace before saving and searching', async () => {
    const user = userEvent.setup();

    const onSearch = vi.fn();

    render(
        <Search
        onSearch={onSearch}
        currentSearch=""
        />
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');
    const button = screen.getByRole('button', {
        name: /search/i,
    });

    await user.type(input, '   pikachu   ');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');

    expect(localStorage.getItem('search')).toBe('pikachu');
  });

  it('loads saved value from localStorage on mount', () => {
    localStorage.setItem('search', 'bulbasaur');

    const onSearch = vi.fn();

    render(
        <Search
        onSearch={onSearch}
        currentSearch=""
        />
    );

    expect(
        screen.getByDisplayValue('bulbasaur')
    ).toBeInTheDocument();

    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
  });


});