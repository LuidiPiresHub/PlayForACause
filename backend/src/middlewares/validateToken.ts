import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token is required' });
  if (!verifyToken(token)) return res.status(401).json({ message: 'Invalid Token' });
  return next();
};

export default validateToken;
