import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/doodle-noodle';

console.log(`🔌 Connecting to MongoDB at: ${MONGO_URI}`);

function connectToDatabase() {
  return mongoose.connect(MONGO_URI, {
    dbName: 'doodle-noodle',
  });
}

export default connectToDatabase;