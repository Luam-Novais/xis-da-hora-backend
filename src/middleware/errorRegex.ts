import type { Request, Response, NextFunction } from 'express';
import type { ICustomer } from '../types/customer.js';
import { ValidadeRegex } from '../utils/validateRegex.js';
import type { regexKey } from '../utils/validateRegex.js';

const { validate } = new ValidadeRegex();

export async function errorRegexMiddleware(req: Request<{}, {}, ICustomer>, res: Response, next: NextFunction) {
  const fieldsToValidate = ['email', 'password', 'phone', 'cep'];
  for (const field of fieldsToValidate) {
    const valueToValidate: string = req.body[field as regexKey];
    if (!valueToValidate) continue;
    const fieldValidate = validate(field as regexKey, valueToValidate);
    if (fieldValidate instanceof Error) {
      return res.status(400).json({ field, fieldValidate: fieldValidate.message });
    }
  }
  next();
}
