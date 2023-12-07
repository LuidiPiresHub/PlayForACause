import { PrismaClient } from '@prisma/client'
import { IMessage } from '../interfaces/message.interface';

const prisma = new PrismaClient();

const saveMessage = async (data: IMessage) => {
  return await prisma.message.create({ data });
}

const getMessages = async () => {
  return await prisma.message.findMany({ select: { id: true, message: true, username: true }});
}

export default {
  saveMessage,
  getMessages,
}