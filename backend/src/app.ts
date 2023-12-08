import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes'
import handleError from './middlewares/handleError';
import { verifyToken } from './auth/jwtFunctions';
import { IToken } from './interfaces/user.interface';
import messageService from './services/message.service';
import { IMessage } from './interfaces/message.interface';

// import * as redis from 'redis';

// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379,
// });

// const connectRedis = async () => {
//   await redisClient.connect();
// }

// connectRedis();

// async function sendDataToRedis<TData>(data: TData) {
//   await redisClient.set('message', JSON.stringify(data));
// }

// async function getDataFromRedis() {
//   return await redisClient.get('message');
// }

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', routes.userRouter);
app.use('/messages', routes.messageRouter);
app.use(handleError)

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('message', async ({ message, token }) => {
    const decoded: IToken | null = verifyToken(token) as IToken | null;
    const data = {
      message,
      userId: socket.id,
      username: decoded?.data.username
    }
    await messageService.saveMessage(data as IMessage);
    
    io.emit('backend', data);
  })
});

export default httpServer;
