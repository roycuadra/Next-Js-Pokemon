//#region Import
import { create } from 'zustand'
import { IPCard } from '../interface/PCard'
import { IPokemonEvolution, IPokemonSpecies } from '../interface/Pokemon'
import { PartialPCard, PartialSpecies, PartialEvolution } from '../partial/_pPokemon'
import { IPokemonStore, IPokemonSpeciesStore, IPokemonEvolutionStore } from './storeInterface'
//#endregion

//#region State Management
const usePokemonStore = create<IPokemonStore>((set) => ({
    pokemon: PartialPCard,
    storePokemon: (data: IPCard) => {
        set({pokemon: data})
    }
}))

const usePokemonSpeciesStore = create<IPokemonSpeciesStore>((set) => ({
    species: PartialSpecies,
    storePokemonSpecies: (data: IPokemonSpecies) => {
        set({species: data})
    }
}))

const usePokemonEvolutionStore = create<IPokemonEvolutionStore>((set) => ({
    evolution: PartialEvolution,
    storePokemonEvolution: (data: IPokemonEvolution) => {
        set({evolution: data})
    }
}))
//#endregion

export { usePokemonStore, usePokemonSpeciesStore, usePokemonEvolutionStore }
export type {}
