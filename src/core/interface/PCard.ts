import { PartialAbilities, PartialMoves, PartialSpecies, PartialSprites, PartialStats, PartialTypes } from "../partial/_pPokemon";
import { IPokemonAbilities, IPokemonMoves, IPokemonSpecies, IPokemonSpeciesBasic, IPokemonSprites, IPokemonStats, IPokemonTypes } from "./Pokemon";

interface IPCard {
  id: number;
  name: "",
  height: number;
  weigth: number;
  sprites: IPokemonSprites;
  species: IPokemonSpeciesBasic;
  stats: IPokemonStats[];
  abilities: IPokemonAbilities[];
  moves: IPokemonMoves[];
  types: IPokemonTypes[];
}

export type { IPCard };