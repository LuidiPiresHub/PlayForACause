import { Request, Response } from 'express';
import userService from '../services/user.service';

const getUser = async (_req: Request, res: Response) => {
  const { status, message } = await userService.getUser();
  return res.status(status).json({ message });
}

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const { status, message } = await userService.createUser(username, email, password);
  return res.status(status).json({ message });
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message } = await userService.loginUser(email, password);
  return res.status(status).json({ message });
}

export default {
  getUser,
  createUser,
  loginUser,
}