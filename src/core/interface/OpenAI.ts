interface IOpenAI {
    choices: {
        finish_reason: string;
        index: number;
        text: string;
    }[]
}

export type { IOpenAI }