import { Schema, model, type Document } from 'mongoose';

import type {IUser} from './user';
import type {IPrompt} from './prompt';

export interface IDrawing extends Document{
  imageUrl: string,
  artist: IUser,
  prompt: IPrompt,
}


const drawingSchema = new Schema<IDrawing>({
  imageUrl: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'DailyPrompt',
    required: true,
  },
}, { timestamps: true });

const Drawing = model('Drawing', drawingSchema);
export default Drawing;