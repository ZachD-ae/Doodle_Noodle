import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/doodle-noodle';

console.log(`🔌 Connecting to MongoDB at: ${MONGO_URI}`);

const connectToDatabase = async (): Promise<typeof mongoose.connection> => {
  try {
      await mongoose.connect(MONGO_URI, {
      dbName: 'doodle-noodle',
    });
    console.log("Database successfully connected")
    return mongoose.connection;
  } catch (err) {
    console.error("Data connection error: ", err);
    throw new Error("Database connection failed")
  }
}

export default connectToDatabase;