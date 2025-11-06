import type { Request, Response, NextFunction } from 'express';
import { formaterToken } from '../utils/FormatedToken.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';

interface AuthAdmin extends JwtPayload {
    role: string
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).json({ messageError: 'Token inválido ou expirado.' });
  const token = formaterToken(tokenHeader);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY) as AuthAdmin
    if (decode.role !== 'ADMIN') return res.status(403).json({ messageError: 'Acesso não autorizado para este recurso.' });
    next();
  } catch (error) {
    return res.status(403).json({ messageError: 'Acesso não autorizado para este recurso.' });
  }
}
