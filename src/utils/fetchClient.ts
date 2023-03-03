import PokemonUrl from "../types/PokemonUrl";


type RequestMethod = 'GET';

function request<T>(
    url: string,
    method: RequestMethod = 'GET',
): Promise<T> {
    const options: RequestInit = { method };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        }).then(response => {
            if (Object.hasOwnProperty.call(response, 'results')) {
                return response.results;
            }

            return response;
        });
}

function requestByType<T>(
    url: string,
    method: RequestMethod = 'GET',
): Promise<T> {
    const options: RequestInit = { method };
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        }).then(response => {
            const pokemons = response.pokemon.map((el: {pokemon: PokemonUrl}) => ({ name: el.pokemon.name, url: el.pokemon.url }));
            return pokemons;
        });
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    getByType: <T>(url: string) => requestByType<T>(url),
};
