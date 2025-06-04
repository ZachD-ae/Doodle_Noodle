import { User } from "./user.js";
import { DailyPrompt } from './dailyPrompt.js'

export interface Drawing {
    imageUrl: string,
    artist: User
    prompt: DailyPrompt
}