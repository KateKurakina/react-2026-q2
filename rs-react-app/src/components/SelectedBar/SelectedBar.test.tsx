import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectedBar from './SelectedBar';
import { useSelectedStore } from '../../store/selectedStore';

describe('SelectedBar', () => {
  const mockPokemon = {
    name: 'pikachu',
    description: 'Height: 10, Weight: 20',
    detailsUrl: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    sprite: 'img',
    stats: 'hp:50',
  };  

  beforeEach(() => {
    useSelectedStore.setState({ selected: []});
  });

  it('renders nothing when selected is empty', () => {
    useSelectedStore.setState({ selected: [] });

    const { container } = render(<SelectedBar />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders selected count', () => {
    useSelectedStore.setState({
      selected: [mockPokemon],
    });

    render(<SelectedBar />);

    expect(screen.getByText(/selected items:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('clears selected list', async () => {
    const user = userEvent.setup();

    useSelectedStore.setState({
      selected: [mockPokemon],
    });

    render(<SelectedBar />);

    await user.click(screen.getByRole('button', { name: /clear all/i }));

    expect(useSelectedStore.getState().selected).toHaveLength(0);
  });

  it('downloads csv file', async () => {
    const user = userEvent.setup();

    useSelectedStore.setState({
      selected: [mockPokemon],
    });

    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:url');

    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    render(<SelectedBar />);

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalled();
  });
});