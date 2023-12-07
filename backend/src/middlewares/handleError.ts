import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Código específico para violação de restrição única (email duplicado)
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    return res.status(409).json({ message: 'E-mail já está em uso!' });
  }
  return res.status(500).json({ type: err.name, message: err.message });
}

export default handleError;
