//#region Import
import { Configuration, OpenAIApi } from "openai"
//#endregion

//#region Helpers
const configuration = new Configuration({
    organization: 'org-PoD13YIoiUlNAoTVcektHV39',
    apiKey: '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'
})

const openai = new OpenAIApi(configuration)
//#endregion

export const openAIService = {
    createCompletion: async (pokemon: string) => {

        try {
            const data = await openai.createCompletion({

                // Just change the model if response is too slow
                model: "text-davinci-002",
                prompt: `${pokemon} description?`,
                temperature: 0,
                max_tokens: 100,
            })
    
            return data;
        } catch (error) {
            return null
        }
    }
}