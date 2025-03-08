import 'dotenv/config';
import { IRacingAuthClient } from './services/iracingAuthClient';

export const authenticate = async (): Promise<string> => {
  const username = process.env.IRACING_USERNAME;
  const password = process.env.IRACING_PASSWORD;

  if (!username || !password) {
    throw new Error('Auth Error: Invalid username or password');
  }

  const authToken = await new IRacingAuthClient(
    username,
    password,
  ).generateToken();

  console.info('iRacing API auth successful');

  return authToken;
};
