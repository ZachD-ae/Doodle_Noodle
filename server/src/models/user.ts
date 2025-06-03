import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for User document with isCorrectPassword method
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err as any);
  }
});

// Add method to schema
userSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create User model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;