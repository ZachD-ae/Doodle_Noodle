import { IUser } from '../models/user.js';

import User from '../models/user.js';
import Drawing from '../models/drawing.js';
import { getDailyPrompt } from '../services/dailyPrompt.js';


import jwt from 'jsonwebtoken';
import DailyPrompt from '../models/dailyPrompt.js';



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
    getUserData: async (_: any, __: any, context: Context) => {
      //error user not found
      if (!context.user) return null;
      //find user by id
      const user = await User.findById(context.user.id)
        .populate('drawings')
        .select('-password'); // Exclude password field
      //if user not found return null
      if (!user) {
        return null
      };
      //return user data
      return user;
    },
   


    dailyPrompt: async () => {
      const today = new Date().toISOString().split('T')[0];
      const prompt = await DailyPrompt.findOne({date: today})
      .populate('prompt')
      .populate({
        path: 'drawings',
        populate: {path: 'artist', select: '_id username'}
      });
      if(!prompt) {
        getDailyPrompt();
        console.log("Error no daily prompt found")
        return
      }
      console.log('dailyPrompt resolver result:', prompt);
      return prompt;
    },

    hasSubmittedToday: async (_: any, __: any, context: Context) => {
      //error user not found
      if (!context.user) return false;
      //today's date
      const today = new Date().toISOString().split('T')[0];
      //compare today to last submissionDate
      if (context.user.submissionDate === today) return true;
      //if they match return true user has submitted today

      return false;
    },

    getUserDrawings: async (_: any, args: { userId: string }) => {
      const drawings = await Drawing.find({ artist: args.userId })
        .populate('prompt')
        .populate('artist');
      return drawings;
    },

    getDrawingsByPrompt: async (_: any, args: { promptId: string, userId?: string }) => {
      const drawings = await Drawing.find({ prompt: args.promptId })
        .populate('prompt')
        .populate('artist')
        .lean(); // Make plain JS objects so we can add custom fields

      const userId = args.userId?.toString();

      const updatedDrawings = drawings.map(drawing => {
        return {
          ...drawing,
          isOwner: userId && drawing.artist?._id?.toString() === userId
        };
      });

      // Sort so that current user's drawing is first if present
      if (userId) {
        updatedDrawings.sort((a, b) => {
          if (a.isOwner === b.isOwner) return 0;
          return a.isOwner ? -1 : 1;
        });
      }

      return updatedDrawings;
    }
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

      const today = new Date().toISOString().split('T')[0];
      const prompt = await DailyPrompt.findOne({ date: today });
      console.log(prompt)
      if (!prompt) throw new Error('No active prompt today');

      // Check if user already submitted for this prompt
      const existing = await Drawing.findOne({
        artist: context.user.id,
        prompt: prompt._id,
      });

      if (existing) {
        throw new Error('You’ve already submitted a drawing for today!');
      }
      //Add drawing to drawing documents
      const newDrawing = await Drawing.create({
        imageUrl: args.image,
        artist: context.user.id,
        prompt: prompt._id,
      });
      console.log("user", context.user)
      console.log("id", context.user.id)
      console.log(newDrawing)
      
      //add drawingId to user drawings and update submission date to todays date
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user.id },
        { 
          $addToSet: { drawings: newDrawing._id },
          submissionDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        },
        { new: true, runValidators: true }
      );

      await DailyPrompt.findByIdAndUpdate(
        prompt._id,
        {
          $addToSet: { drawings: newDrawing._id}
        },
        { new:true, runValidators: true }
      );

      const populateedDrawing = await Drawing.findById(newDrawing._id)
        .populate({
          path: 'artist',
          populate: { path: 'drawings'}
        })
        .populate({
          path: 'prompt',
          populate: { path: 'prompt'}
        })
      console.log(populateedDrawing)
      console.log(updateUser)
      return populateedDrawing;
    }
  }
};