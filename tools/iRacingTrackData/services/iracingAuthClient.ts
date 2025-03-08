import crypto from 'crypto';
import 'dotenv/config';

const encryptSecret = (username: string, password: string): string => {
  return crypto
    .createHash('sha256')
    .update(password + username.toLowerCase())
    .digest('base64');
};

export class IRacingAuthClient {
  username: string;

  secret: string;

  baseUrl?: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.secret = encryptSecret(username, password);
    this.baseUrl = process.env.IRACING_BASE_URL;
  }

  async generateToken(): Promise<string> {
    if (!this.baseUrl) {
      throw new Error('Auth Error: Iracing Base URL not defined.');
    }
    const response = await fetch(`${this.baseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.username,
        password: this.secret,
      }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Auth Error: Unexpected auth error');
    }

    const setCookieHeader = response.headers.getSetCookie();

    if (!setCookieHeader) {
      throw new Error('Auth Error: Invalid Response Header');
    }

    return setCookieHeader.join('; ');
  }
}
