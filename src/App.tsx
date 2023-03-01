import React, { useEffect, useState } from 'react';
import './App.css';

import { List } from './Components/List';
import PokemonInfo from './types/PokemonInfo';

const baseUrl = 'https://pokeapi.co/api/v2/';
const pokemons = 'pokemon/?limit=1';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);

  useEffect(() => {
    fetch(baseUrl + pokemons,
      {
        method: 'GET',
      })
    .then(data => data.json())
    .then(data => setPokemonList(data?.results));
  }, []);

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  return (
    <div className='App'>
      <h1 className='title'>Pokedex</h1>
      <div className='pokedex'>
        <List list={pokemonList}/>
        <div className="selected">
          <div className="pokemonFullCard">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
