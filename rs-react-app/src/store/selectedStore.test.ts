import { useSelectedStore } from './selectedStore';

describe('selectedStore', () => {
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

  it('adds pokemon', () => {
    useSelectedStore.getState().toggleSelected(mockPokemon);

    expect(
      useSelectedStore.getState().selected
    ).toHaveLength(1);
  });

  it('removes pokemon', () => {
    const store = useSelectedStore.getState();

    store.toggleSelected(mockPokemon);
    store.toggleSelected(mockPokemon);

    expect(store.selected).toEqual([]);
  });
});