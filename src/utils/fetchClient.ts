const BASE_URL = 'https://pokeapi.co/api/v2';

type RequestMethod = 'GET';

function request<T>(
    url: string,
    method: RequestMethod = 'GET',
): Promise<T> {
    const options: RequestInit = { method };

    return fetch(BASE_URL + url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        }).then(response => response.results);
}

function requestByUrl<T>(
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
        }).then(response => response);
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    getByUrl: <T>(url: string) => requestByUrl<T>(url),
};
