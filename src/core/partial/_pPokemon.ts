import { IPCard } from "../interface/PCard"
import { IPokemonAbilities, IPokemonMoves, IPokemonSpecies, IPokemonSprites, IPokemonStats, IPokemonTypes, IPokemonEvolution, IPokemonSpeciesBasic } from "../interface/Pokemon"

//#region Partial
const PartialSprites: IPokemonSprites = {
    back_default: "",
    front_default: "",
    other: {
        dream_world: {
            front_default: ""
        },
        home: {
            front_default: ""
        }
    }
}

const PartialSpeciesBasic: IPokemonSpeciesBasic = {
    name: "",
    url: ""
}

const PartialSpecies: IPokemonSpecies = {
    id: 0,
    base_happiness: "",
    capture_rate: "",
    egg_groups: [
        {
            name: "",
        }
    ],
    flavor_text_entries: [
        {
            flavor_text: "",
            version: {
                name: "",
            }
        }
    ],
    evolution_chain: {
        url: "",
    },
    generation: {
        name: "",
    },
    growth_rate: {
        name: "",
    },
    habitat: {
        name: "",
    },
    is_legendary: false,
    is_mythical: false,
    names: [
        {
            name: "",
        }
    ],
}

const PartialStats: IPokemonStats = {
    base_stat: 0,
    stat: {
        name: ""
    }
}

const PartialAbilities: IPokemonAbilities = {
    ability: {
        name: "",
        url: ""
    }
}

const PartialMoves: IPokemonMoves = {
    move: {
        name: "",
        url: ""
    }
}

const PartialTypes: IPokemonTypes = {
    type: {
        name: ""
    }
}

const PartialEvolution: IPokemonEvolution = {
    chain: {
        evolves_to: [
            {
                evolves_to: [
                    {
                        evolves_to: [
                            {
                                species: {
                                    name: "",
                                    url: ""
                                }
                            }
                        ],
                        species: {
                            name: "",
                            url: ""
                        }
                    }
                ],
                species: {
                    name: "",
                    url: ""
                }
            }
        ],
        species: {
            name: "",
            url: ""
        }
    }
}

const PartialPCard: IPCard = {
    id: 0,
    name: "",
    height: 0,
    weigth: 0,
    sprites: PartialSprites,
    species: PartialSpeciesBasic,
    stats: [PartialStats],
    abilities: [PartialAbilities],
    moves: [PartialMoves],
    types: [PartialTypes]
}
//#endregion

export { PartialAbilities, PartialMoves, PartialSpeciesBasic, PartialSpecies, PartialSprites, PartialStats, PartialTypes, PartialEvolution, PartialPCard }