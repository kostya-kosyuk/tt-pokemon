import PokemonUrl from '../types/PokemonUrl';
import PokemonItem from '../types/PokemonItem';
import PokemonType from '../types/PokemonType';
import { client } from '../utils/fetchClient';

const POKEMON_URL = '/pokemon/?limit=';
const TYPE_URL = '/type/';

export const getPokemons = (limit: number = 12, type: string | number = '') => {
    const url = type === '' ? POKEMON_URL + limit : TYPE_URL + type;

    return client.get<PokemonUrl[]>(url);
};

export const getTypes = () => {
    const url = TYPE_URL;

    return client.get<PokemonType[]>(url);
};

export const getPokemonInfo = (url: string) => {
    return client.getByUrl<PokemonItem>(url);
};

export const getPokemonFullInfo = (url: string) => {
    return client.getByUrl<PokemonUrl>(url);
};