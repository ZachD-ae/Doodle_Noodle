import { Schema, model } from 'mongoose';

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  drawings: [{
    type: Schema.Types.ObjectId,
    ref: 'Drawing',
  }],
}, { timestamps: true });

const Prompt = model('Prompt', promptSchema);
export default Prompt;