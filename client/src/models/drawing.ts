import { DailyPrompt } from './dailyPrompt.js'
import { UserData } from './userData.js'

export interface Drawing {
    imageUrl: string,
    artist: UserData
    prompt: DailyPrompt
}