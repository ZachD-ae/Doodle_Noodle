import { Drawing } from "./drawing";

export interface DailyPrompt {
    date: string;
    prompt: string;
    drawings: [Drawing]
}
