import { useEffect, useMemo, useState } from 'react';
import './App.css';

import { Pokemon } from 'pokenode-ts'

import { List } from './Components/List/List';
import PokemonType from './types/PokemonType';
import { getPokemons, getPokemonsByType, getTypes } from './api/pokemon';
import { SelectedPokemon } from './Components/SelectedPokemon/SelectedPokemon';
import getPokemonsList from './utils/getPokemonsList';

const countOnPage = 12;

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [totalPokemonCount, setTotalPokemonCount] = useState<number>(0);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [selectedType, setSelectedType] = useState<string>('all');

  const [activePage, setActivePage] = useState(1);
  const visibleList = useMemo<Pokemon[]>(() => {

    if (selectedType === 'all' && pokemonList) {
      return pokemonList;
    }

    const slicedList = pokemonList?.slice((activePage - 1) * countOnPage, activePage * countOnPage);
    return slicedList ? slicedList : [];

  }, [pokemonList, activePage]);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleChangePage = (page: number) => {
    setActivePage(page);
  };

  const setDefaultPokemonList = (offset: number) => {
    getPokemons(offset, countOnPage).then(data => {
      const {results, count} = data;

      const names = results.map(({ name }) => name);

      setTotalPokemonCount(count);

      return getPokemonsList(names);
    })
      .then(pokemons => setPokemonList(pokemons));
  };

  useEffect(() => {
    if (!pokemonTypes) {
      getTypes().then(data => setPokemonTypes(data));
    }
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setDefaultPokemonList((activePage - 1) * countOnPage);
      return;
    }

    getPokemonsByType(selectedType).then(data => {
      const names = data.map(({pokemon}) => pokemon.name);

      setTotalPokemonCount(names.length);

      return getPokemonsList(names);
    })
    .then(pokemons => setPokemonList(pokemons));
  }, [activePage, selectedType]);

  useEffect(() => setActivePage(1), [selectedType]);

  return (
    <div className='App'>
      <h1 className='title'>Pokedex</h1>
      <div className='pokedex'>
        <List
          pokemonList={visibleList}
          typesList={pokemonTypes}
          handleSelectType={handleSelectType}
          handleSelectPokemon={handleSelectPokemon}
          selectedType={selectedType}
          activePage={activePage}
          handleChangePage={handleChangePage}
          totalPokemonCount={totalPokemonCount}
          countOnPage={countOnPage}
        />
        {selectedPokemon && <SelectedPokemon pokemon={selectedPokemon} handleSelectType={handleSelectType}/>}
      </div>
    </div>
  );
}

export default App;
