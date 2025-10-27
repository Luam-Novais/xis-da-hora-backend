import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '../types/User.js';
import { ValidadeRegex } from '../utils/validateRegex.js';
import { FormatedString } from '../utils/formatedString.js';

const { validate } = new ValidadeRegex();


export async function errorRegexMiddleware(req: Request<{}, {}, IUser>, res: Response, next: NextFunction) {
  const { email, password, phone, cep } = req.body;
  const emailValidation = validate('email', email);
  const passwordValidation = validate('password', password);
  const phoneValidation = validate('phone', phone);
  const cepValidation = validate('cep', cep)


  if (emailValidation instanceof Error) res.status(400).json(emailValidation.message);
  else if (passwordValidation instanceof Error) res.status(400).json(passwordValidation.message);
  else if (phoneValidation instanceof Error) res.status(400).json(phoneValidation.message);
  else if (cepValidation instanceof Error) res.status(400).json(cepValidation.message);
  else {
    next();
  }
}
