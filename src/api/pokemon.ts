import PokemonUrl from '../types/PokemonUrl';
import PokemonItem from '../types/PokemonItem';
import PokemonType from '../types/PokemonType';
import { client } from '../utils/fetchClient';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_URL = '/pokemon/?limit=';
const TYPE_URL = '/type/';

export const getPokemons = (limit: number = 12) => {
    const url = BASE_URL + POKEMON_URL + limit;

    return client.get<PokemonUrl[]>(url);
};

export const getTypes = () => {
    const url = BASE_URL + TYPE_URL;

    return client.get<PokemonType[]>(url);
};

export const getPokemonInfo = (url: string) => {
    return client.get<PokemonItem>(url);
};

export const getPokemonsByType = (type: string) => {
    const url = BASE_URL + TYPE_URL + type;
    return client.getByType<PokemonUrl[]>(url);
};