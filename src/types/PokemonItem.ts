export default interface PokemonItem {
    name: string,
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: { [key: string]: string };

}