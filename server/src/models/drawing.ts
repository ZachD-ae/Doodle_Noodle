import { Schema, model } from 'mongoose';

const drawingSchema = new Schema({
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
    ref: 'Prompt',
    required: true,
  },
}, { timestamps: true });

const Drawing = model('Drawing', drawingSchema);
export default Drawing;