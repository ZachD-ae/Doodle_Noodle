import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const getUserFromToken = (req: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers?.authorization) {
    token = token.split(' ').pop().trim();
  };

  //If no token is provided, return the request object as is
  if (!token) {
    return null;
  }

  try {
    const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' })
    return user.data
  } catch (err) {
    console.log('Invalid Token');
  }
  return null;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' })
  }
}