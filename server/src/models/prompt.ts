import { Schema, model } from 'mongoose';

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