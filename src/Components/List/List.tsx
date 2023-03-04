import { memo } from "react";
import PokemonType from "../../types/PokemonType";
import { ListItem } from "../ListItem/ListItem";
import { TypeList } from "../TypeList/TypeList";

import { Pokemon } from 'pokenode-ts'

import Pagination from 'react-js-pagination';
import './Pagination.css';

import './List.css';

type Props = {
    pokemonList: Pokemon[] | undefined,
    typesList: PokemonType[] | undefined,
    handleSelectType: (type: string) => void,
    handleSelectPokemon: (Pokemon: Pokemon) => void,
    selectedType: string,
    activePage: number,
    handleChangePage: (type: number) => void,
    totalPokemonCount: number,
    countOnPage: number,
};

export const List: React.FC<Props> = ({
    pokemonList,
    typesList,
    handleSelectType,
    handleSelectPokemon,
    selectedType,
    activePage,
    handleChangePage,
    totalPokemonCount,
    countOnPage,
}) => {
    return (
        <div>
            <TypeList
                types={typesList}
                handleSelectType={handleSelectType}
                selectedType={selectedType}
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
            <div className="pagination-wrapper">
                <Pagination
                    activePage={activePage}
                    totalItemsCount={totalPokemonCount}
                    itemsCountPerPage={countOnPage}
                    pageRangeDisplayed={5}
                    onChange={(page) => handleChangePage(page)}
                    innerClass="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeLinkClass="active"
                    disabledClass="disabled"
                    prevPageText={'<'}
                    nextPageText={'>'}
                />
            </div>
        </div>
    )
};

export default memo(List);