import { IUser } from '../models/user.js';
import User from '../models/user.js';
import Drawing from '../models/drawing.js';
import { getDailyPrompt } from '../services/dailyPrompt.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'somesecretkey';

interface Context {
  user: IUser;
}

function signToken(user: IUser) {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

export const resolvers = {
  Query: {
    dailyPrompt: async () => {
      const prompt = await getDailyPrompt();
      console.log('dailyPrompt resolver result:', prompt);
      return prompt;
    },

    hasSubmittedToday: async (_: any, __: any, context: Context) => {
      if (!context.user) return false;

      const prompt = await getDailyPrompt();
      if (!prompt) return false;

      const drawing = await Drawing.findOne({
        artist: context.user.id,
        prompt: prompt._id,
      });

      return !!drawing;
    },
  },

  Mutation: {
    signup: async (_: any, args: { username: string; email: string; password: string; confirmPassword: string }) => {
      const { username, email, password, confirmPassword } = args;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

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
    },

    submitDrawing: async (_: any, args: { image: string }, context: Context) => {
      if (!context.user) throw new Error('Not authenticated');

      const prompt = await getDailyPrompt();
      if (!prompt) throw new Error('No active prompt today');

      // Check if user already submitted for this prompt
      const existing = await Drawing.findOne({
        artist: context.user.id,
        prompt: prompt._id,
      });

      if (existing) {
        throw new Error('You’ve already submitted a drawing for today!');
      }

      // Proceed to save drawing
      const newDrawing = await Drawing.create({
        artist: context.user.id,
        prompt: prompt._id,
        image: args.image,
      });

      return newDrawing;
    }
  }
};