import { Request, Response } from 'express';
import messageService from '../services/message.service';

const getMessage = async (_req: Request, res: Response) => {
  const data = await messageService.getMessages();
  return res.status(200).json(data);
}

export default {
  getMessage,
}