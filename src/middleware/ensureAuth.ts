import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { formaterToken } from '../utils/FormatedToken.js';
import type { IUserPayload } from '../types/customer.js';
import type { RequestWithJWT } from '../types/jwt.js';

export function ensureAuth(req: RequestWithJWT, res: Response, next: NextFunction) {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    const token = formaterToken(tokenHeader);
    if (token) {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload & IUserPayload;
      if (verifiedToken) {
        req.userId = verifiedToken.id;
        next();
      } else return res.status(401).json({ messageError: 'Acesso não autorizado, token inválido.' });
    }
  } else return res.status(401).json({ messageError: 'Acesso não autorizado, Por favor crie uma conta ou faça o login.' });
}
