import { Request, Response, NextFunction, } from 'express';
import { registerSchema, loginSchema } from '../schemas/user.schema';

export const validateRegister = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message });
  }
  return next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message });
  }
  return next();
};
