import { PrismaClient } from '@prisma/client';
import { generateToken } from '../auth/jwtFunctions';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const saltRounds = 10;

const getUser = async () => {
  const users = await prisma.user.findMany();
  if (!users.length) return { status: 404, message: 'No users found' };
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  return { status: 200, message: usersWithoutPassword };
}

const createUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({ data: { username, email, password: hashedPassword } });
  const { password: _, ...userWithoutPassword } = user;  
  return { status: 201, message: generateToken(userWithoutPassword) };
}

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { status: 401, message: 'Email ou senha incorretos!' };
  const match = await bcrypt.compare(password, user.password);
  if (!match) return { status: 401, message: 'Email ou senha incorretos!' };
  const { password: _, ...userWithoutPassword } = user;
  return { status: 200, message: generateToken(userWithoutPassword) };
}

export default {
  getUser,
  createUser,
  loginUser,
}