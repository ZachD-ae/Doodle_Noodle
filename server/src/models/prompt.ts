import { Schema, model, type Document } from 'mongoose';


export interface IPrompt extends Document {
  text: string;
  dateUsed: Date
}

const promptSchema = new Schema({
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Prompt = model('Prompt', promptSchema);

export default Prompt;