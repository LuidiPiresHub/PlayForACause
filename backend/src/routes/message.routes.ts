import { Router } from 'express';
import messageController from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.get('/', messageController.getMessage);

export default messageRouter;