import { Drawing } from "./drawing";

export interface Prompt {
    text: string;
    drawings: [Drawing]
    dateUsed: string;
}