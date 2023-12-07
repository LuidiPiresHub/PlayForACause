import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

export function generateToken<TData>(data: TData): string {
  return jwt.sign({ data }, secret, jwtConfig);
}

export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
