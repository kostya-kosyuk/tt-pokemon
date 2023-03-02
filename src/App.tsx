import { useEffect, useState } from 'react';
import './App.css';

import { List } from './Components/List/List';
import PokemonType from './types/PokemonType';
import { getPokemonInfo, getPokemons, getTypes } from './api/pokemon';
import PokemonItem from './types/PokemonItem';
import { Pokemon } from './Components/Pokemon/Pokemon';

const pokemonCount = 12;

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>();
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>();
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleSelectPokemon = (pokemon: PokemonItem) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    if (!pokemonList) {
      getPokemons(pokemonCount).then(data => {
        const promises = data.map(({url}) => getPokemonInfo(url));

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
        {selectedPokemon && <Pokemon pokemon={selectedPokemon} />}
      </div>
    </div>
  );
}

export default App;
