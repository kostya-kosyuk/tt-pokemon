import { client } from '../utils/fetchClient';

import { PokemonClient } from 'pokenode-ts';
import { Type } from 'pokenode-ts';


const BASE_URL = 'https://pokeapi.co/api/v2';
const TYPE_URL = '/type/';

const api = new PokemonClient();

export const getPokemons = (offset: number = 1, limit: number = 12) => {
    return api.listPokemons(offset, limit).then(({ results, count }) => ({ results, count }));
};

export const getTypes = () => {
    return api.listTypes().then(({ results }) => results);
};

export const getPokemonDetails = (name: string) => {
    return api.getPokemonByName(name);
};

export const getPokemonsByType = (type: string) => {
    const url = BASE_URL + TYPE_URL + type;
    return client.get<Type>(url).then(({pokemon}) => pokemon);
};