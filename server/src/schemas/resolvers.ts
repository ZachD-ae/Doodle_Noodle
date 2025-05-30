import { IUser } from '../models/user.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'somesecretkey';

// helper to sign JWT token
function signToken(user: IUser) {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}
export const resolvers = {
  Mutation: {
    signup: async (_: any, args: { username: string; email: string; password: string; confirmPassword: string }) => {
      const { username, email, password, confirmPassword } = args;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = signToken(newUser);

      return { token, user: newUser };
    },

    login: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;

      const user = await User.findOne({ email }) as IUser | null;

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};