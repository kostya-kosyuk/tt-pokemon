import { TypeItem } from '../TypeItem/TypeItem';
import './SelectedPokemon.css';

import { Pokemon } from 'pokenode-ts'

type Props = {
    pokemon: Pokemon,
    handleSelectType: (typeName: string) => void,
}

export const SelectedPokemon: React.FC<Props> = ({ pokemon, handleSelectType }) => {
    return (
        <div className='selectedPokemon'>
            {pokemon.sprites.front_default
                ? <img className='selected-pokemon-image' src={pokemon.sprites.front_default} alt={pokemon.name} />
                : <div className='card-image'>No image</div>}
            {pokemon.types.map(({ type }) =>
                <TypeItem
                    typeName={type.name}
                    handleSelectType={handleSelectType}
                />
            )}
            <ul className="stats-list">
                {pokemon?.stats.map((stat) => (
                    <li className="stats-item" key={stat.stat.name}>
                        {`${stat.stat.name}: ${stat.base_stat}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}