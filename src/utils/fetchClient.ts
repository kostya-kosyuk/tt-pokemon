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
        }).then(response => response);
}
export const client = {
    get: <T>(url: string) => request<T>(url),
};
