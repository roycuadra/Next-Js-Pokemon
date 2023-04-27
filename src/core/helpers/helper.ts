/**
* @remarks
* This service is for helper funcitons
*
* @param NULL
* @returns specific function with it own uses
*/
export const helpers = {
    
    //#region Pokemon Helpers
    getProperPokemonImg: (img: string | undefined) => {
        if (img === null || img === undefined)
            return "/pokeball.png"
        else
            return img;
    },

    getProperPokemonBadgeColor: (type: string) => {
        if (type === 'FIRE')
            return 'red'

        if (type === 'WATER')
            return 'indigo'

        if (type === 'BUG')
            return 'teal'

        if (type === 'DARK')
            return 'dark'

        if (type === 'DRAGON')
            return 'green'

        if (type === 'ELECTRIC')
            return 'yellow'

        if (type === 'FAIRY')
            return 'pink'

        if (type === 'FIGHTING')
            return 'orange'

        if (type === 'FLYING')
            return 'gray'

        if (type === 'GHOST')
            return 'violet'

        if (type === 'GRASS')
            return 'green'

        if (type === 'GROUND')
            return 'orange'

        if (type === 'ICE')
            return ''

        if (type === 'POISON')
            return 'violet'

        if (type === 'PSYCHIC')
            return 'grape'

        if (type === 'ROCK')
            return 'gray'

        if (type === 'STEEL')
            return 'gray'

        if (type === 'NORMAL')
            return 'black'
    },

    getProperPokemonBadgeEmoji: (type: string) => {
        if (type === 'FIRE')
            return '🔥'

        if (type === 'WATER')
            return '🌊'

        if (type === 'BUG')
            return '🪲'

        if (type === 'DARK')
            return '🌙'

        if (type === 'DRAGON')
            return '🐉'

        if (type === 'ELECTRIC')
            return '⚡'

        if (type === 'FAIRY')
            return '🧚'

        if (type === 'FIGHTING')
            return '👊🏽'

        if (type === 'FLYING')
            return '🦅'

        if (type === 'GHOST')
            return '👻'

        if (type === 'GRASS')
            return '🌿'

        if (type === 'GROUND')
            return '🧱'

        if (type === 'ICE')
            return '❄️'

        if (type === 'POISON')
            return '☠️'

        if (type === 'PSYCHIC')
            return '🔮'

        if (type === 'ROCK')
            return '🪨'

        if (type === 'STEEL')
            return '🛡️'

        if (type === 'NORMAL')
            return '💢'
    },
    //#endregion

    //#region Random Helpers
    generateRandomColor: () => {
        const colors = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', '', 'cyan', 'teal', 'green', 'lime',' yellow', 'orange']

        const randomColor = colors[(Math.random() * colors.length) | 0]
        return randomColor;
    }
    //#endregion
}