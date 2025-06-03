import { Schema, model, type Document } from 'mongoose';

import type {IPrompt} from './prompt.js'

export interface IDailyPrompt extends Document {
  date: string;
  prompt: IPrompt
}


const dailyPromptSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true,
  },
});

const DailyPrompt = model('DailyPrompt', dailyPromptSchema);

export default DailyPrompt;