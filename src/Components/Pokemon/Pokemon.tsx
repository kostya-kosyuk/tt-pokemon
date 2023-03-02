import './Pokemon.css';
import PokemonItem from "../../types/PokemonItem";

type Props = {
    pokemon: PokemonItem,
}

export const Pokemon: React.FC<Props> = ({ pokemon }) => {
    return (
        <div className='selectedPokemon'>
            <img className='selectedPokemon-image' src={pokemon?.sprites.front_default} alt={pokemon?.name} />
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