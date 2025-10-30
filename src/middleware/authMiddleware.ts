import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { formaterToken } from '../utils/FormatedToken.js';
import type { IUserPayload } from '../types/User.js';
export function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    const token = formaterToken(tokenHeader);
    if (token) {    
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload & IUserPayload;
      if (verifiedToken) {
        next()
      }
      else return res.status(401).json({ messageError: 'Acesso não autorizado, token inválido.' });
    }
  }
}
