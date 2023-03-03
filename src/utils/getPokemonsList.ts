import { getPokemonDetails } from "../api/pokemon";

export default function getPokemonsList(names: string[]) {
    const promises = names.map((name) => getPokemonDetails(name));

    return Promise.all(promises);
};