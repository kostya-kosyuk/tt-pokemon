import { memo } from "react";
import { Pokemon } from 'pokenode-ts'

import './ListItem.css';

type Props = {
    pokemon: Pokemon,
    handleSelectPokemon: (pokemon: Pokemon) => void,
};

export const ListItem: React.FC<Props> = ({ pokemon, handleSelectPokemon }) => {
    return (
        <div className="card" onClick={() => handleSelectPokemon(pokemon)}>
            {pokemon.sprites.front_default
                ? <img className='card-image' src={pokemon.sprites.front_default} alt={pokemon.name} />
                : <div className='card-image'>No image</div>}
            <div className="card-name">{pokemon.name}</div>
        </div>
    );
};

export default memo(ListItem);