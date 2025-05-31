import { Schema, model } from 'mongoose';

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