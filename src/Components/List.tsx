import PokemonInfo from "../types/PokemonInfo";
import { PokemonCard } from "./PokemonCard";

type Props = {
    list: PokemonInfo[],
};

export const List: React.FC<Props> = ({ list }) => {

    return (
        <>
            {
                list.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))
            }
        </>
    )
};