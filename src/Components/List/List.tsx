import { memo } from "react";
import PokemonItem from "../../types/PokemonItem";
import PokemonType from "../../types/PokemonType";
import { ListItem } from "../ListItem/ListItem";
import { TypeList } from "../TypeList/TypeList";

import './List.css';

type Props = {
    pokemonList: PokemonItem[] | undefined,
    typesList: PokemonType[] | undefined,
    handleSelectType: (type: string) => void,
    handleSelectPokemon: (Pokemon: PokemonItem) => void,
};

export const List: React.FC<Props> = ({
    pokemonList,
    typesList,
    handleSelectType,
    handleSelectPokemon,
}) => {
    return (
        <div>
            <TypeList
                types={typesList}
                handleSelectType={handleSelectType}
            />
            <div className='list'>
                {pokemonList
                    ? pokemonList.map((pokemon) => (
                    <ListItem
                        key={pokemon.name}
                        pokemon={pokemon}
                        handleSelectPokemon={handleSelectPokemon}
                    />
                ))
                : <div>Loading...</div>}
            </div>
        </div>
    )
};

export default memo(List);