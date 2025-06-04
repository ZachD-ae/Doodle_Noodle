import { Schema, model, type Document } from 'mongoose';
import { IDrawing } from './drawing';

export interface IPrompt extends Document {
  text: string;
  drawings: IDrawing[]
  dateUsed: Date
}

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  drawings: [{
    type: Schema.Types.ObjectId,
    ref: 'Drawing',
  }],
  dateUsed: {
    type: Date,
    default: null, // optional
    },
}, { timestamps: true });

const Prompt = model('Prompt', promptSchema);

export default Prompt;