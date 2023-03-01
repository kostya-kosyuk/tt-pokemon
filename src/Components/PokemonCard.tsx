import { useState, useEffect } from "react";
import PokemonInfo from "../types/PokemonInfo";

type Props = {
    pokemon: PokemonInfo;
};

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
    const [pokemonFullInfo, setPokemonFullInfo] = useState({});

    useEffect(() => {
        fetch(pokemon.url, {
            method: 'GET',
        })
        .then(data => data.json())
        .then(data => setPokemonFullInfo(data));
    }, []);

    useEffect(() => {
        console.log(pokemonFullInfo);
    }, [pokemonFullInfo]);

    return (
        <div>
            {`name: ${pokemon.name} url: ${pokemon.url}`}
        </div>
    );
};