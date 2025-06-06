import { DailyPrompt } from './dailyPrompt.js'

export interface Drawing {
    imageUrl: string,
    artist: string
    prompt: DailyPrompt
}