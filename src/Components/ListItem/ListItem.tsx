import { memo } from "react";
import PokemonItem from "../../types/PokemonItem";

import './ListItem.css';

type Props = {
    pokemon: PokemonItem,
    handleSelectPokemon: (pokemon: PokemonItem) => void,
};

export const ListItem: React.FC<Props> = ({ pokemon, handleSelectPokemon }) => {
    return (
        <div className="card" onClick={() => handleSelectPokemon(pokemon)}>
            <img className='image' src={pokemon.sprites.front_default} alt={pokemon.name} />
            {pokemon.name}
        </div>
    );
};

export default memo(ListItem);