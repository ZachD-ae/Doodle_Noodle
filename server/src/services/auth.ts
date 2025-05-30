import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || 'secret';
const expiration = '1h';

// This gets passed into Apollo Server as context
export function authMiddleware({ req }: { req: any }) {
  let token = req.headers.authorization || '';
  console.log('🧪 Incoming auth header:', req.headers.authorization);
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    if (token) {
      console.log('🔑 JWT Secret in use:', secretKey);
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      console.log('✅ Token decoded:', decoded); // 👈 Add this line
      return { user: decoded };
    }
  } catch (err) {
    if (err instanceof Error) {
      console.warn('❌ Invalid token:', err.message);
    } else {
      console.warn('❌ Invalid token:', err);
    }
  }

  return { user: null };
}

// Used for login/signup
export function signToken(user: { _id: unknown; username: string; email: string }) {
  console.log('🔑 JWT Secret in use:', secretKey);
  return jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    secretKey,
    { expiresIn: expiration }
  );
}

export function getUserFromToken(token: string): JwtPayload | null {
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      return decoded;
    }
  } catch (err) {
    console.warn('❌ Invalid token in getUserFromToken');
  }

  return null;
}