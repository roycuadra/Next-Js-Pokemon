import { IPCard } from "../interface/PCard";
import { IPokemonSpecies, IPokemonEvolution } from "../../core/interface/Pokemon";

interface IPokemonStore {
    pokemon: IPCard;
    storePokemon: (data: IPCard) => void;
}

interface IPokemonSpeciesStore {
    species: IPokemonSpecies;
    storePokemonSpecies: (data: IPokemonSpecies) => void;
}

interface IPokemonEvolutionStore {
    evolution: IPokemonEvolution;
    storePokemonEvolution: (data: IPokemonEvolution) => void;
}

export type { IPokemonStore, IPokemonSpeciesStore, IPokemonEvolutionStore }