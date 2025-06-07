import { Schema, model, type Document } from 'mongoose';

import type {IPrompt} from './prompt.js'
import { IDrawing } from './drawing.js';

export interface IDailyPrompt extends Document {
  date: string;
  prompt: IPrompt;
  drawings: IDrawing;
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
  drawings: [{
    type: Schema.Types.ObjectId,
    ref: 'Drawing',
  }],
});

const DailyPrompt = model('DailyPrompt', dailyPromptSchema);

export default DailyPrompt;