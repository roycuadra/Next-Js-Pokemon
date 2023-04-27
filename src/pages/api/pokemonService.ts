/**
* @remarks
* This service is for api call funcitons
*
* @param NULL
* @returns specific function with it own uses
*/
export const pokemonService = {
    fetchPokemons: async (limit: number, offset: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        return res.json();
    },

    fetchPokemon: async(url: string) => {
        const res = await fetch(url);
        return res.json();
    },

    fetchPokemonById: async (id: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res.json();
    },

    fetchPokemonByName: async (name: string) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return res.json();
    },

    fetchPokemonSpeciesDetailsById: async (id: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        return res.json();
    },

    fetchPokemonSpeciesDetailsByName: async (name: string) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        return res.json();
    },

    fetchPokemonSpeciesDetailsByUrl: async (url: string) => {
        const res = await fetch(url);
        return res.json();
    },

    fetchPokemonEvolutionDetails: async (url: string) => {
        const res = await fetch(url);
        return res.json();
    },

    fetchPokemonMoveset: async (url: string) => {
        const res = await fetch(url);
        return res.json();
    }
}