import mongoose from 'mongoose';
import Prompt from '../models/prompt.js'; // adjust path if needed
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/doodle-noodle';

const prompts = [
  { text: 'An evil scientist bringing his creation to life.' },
  { text: 'Sketch your favorite animal.' },
  { text: 'Create a doodle using only geometric shapes.' },
  { text: 'Draw a scene from your favorite book.' },
  { text: 'Illustrate your mood today.' },
];

async function seedPrompts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // Clear existing prompts before seeding
    await Prompt.deleteMany({});
    console.log('Cleared existing prompts');

    // Insert new prompts without dateUsed field (will default to null or undefined)
    await Prompt.insertMany(prompts);
    console.log(`Inserted ${prompts.length} prompts`);

    await mongoose.disconnect();
    console.log('Disconnected from DB');
  } catch (err) {
    console.error('Error seeding prompts:', err);
    process.exit(1);  // Exit with failure on error
  }
}

seedPrompts();