import { useEffect, useRef } from 'react';
import { TypeItem } from '../TypeItem/TypeItem';
import './SelectedPokemon.css';

import { Pokemon } from 'pokenode-ts'

type Props = {
    pokemon: Pokemon,
    handleSelectType: (typeName: string) => void,
    handleUnselectPokemon: () => void,
}

export const SelectedPokemon: React.FC<Props> = ({ pokemon, handleSelectType, handleUnselectPokemon }) => {

    const selectedPokemonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectedPokemonRef.current && !selectedPokemonRef.current.contains(event.target as Node)) {
                handleUnselectPokemon();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedPokemonRef]);

    return (
        <div className="pokemonContainer">
            <div ref={selectedPokemonRef} className='selectedPokemon'>
                {pokemon.sprites.front_default
                    ? <img className='selected-pokemon-image' src={pokemon.sprites.front_default} alt={pokemon.name} />
                    : <div className='card-image'>No image</div>}
                {pokemon.types.map(({ type }) =>
                    <TypeItem
                    key={type.name}
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
        </div>
    );
}