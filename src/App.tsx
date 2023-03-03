import { useEffect, useState } from 'react';
import './App.css';

import { Pokemon } from 'pokenode-ts'

import { List } from './Components/List/List';
import PokemonType from './types/PokemonType';
import { getPokemonDetails, getPokemons, getPokemonsByType, getTypes } from './api/pokemon';
import { SelectedPokemon } from './Components/SelectedPokemon/SelectedPokemon';

const pokemonCount = 12;

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [selectedType, setSelectedType] = useState<string>();

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    if (!pokemonList) {
      getPokemons(pokemonCount).then(data => {
        const promises = data.map(({ name }) => getPokemonDetails(name));

        return Promise.all(promises);
      })
      .then(pokemons => setPokemonList(pokemons));
    }
  }, []);

  useEffect(() => {
    if (!pokemonTypes) {
      getTypes().then(data => setPokemonTypes(data));
    }
  }, []);

  useEffect(() => {
    if (selectedType) {
      getPokemonsByType(selectedType).then(data => {
        const promises = data.map(({pokemon}) => getPokemonDetails(pokemon.name));

        return Promise.all(promises);
      })
      .then(pokemons => setPokemonList(pokemons));
    }
  }, [selectedType]);

  return (
    <div className='App'>
      <h1 className='title'>Pokedex</h1>
      <div className='pokedex'>
        <List
          pokemonList={pokemonList}
          typesList={pokemonTypes}
          handleSelectType={handleSelectType}
          handleSelectPokemon={handleSelectPokemon}
        />
        {selectedPokemon && <SelectedPokemon pokemon={selectedPokemon} />}
      </div>
    </div>
  );
}

export default App;
