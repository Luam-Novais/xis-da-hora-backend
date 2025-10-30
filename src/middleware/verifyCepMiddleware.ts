import type { Request, Response, NextFunction } from 'express';
import { FormaterString } from '../utils/formaterString.js';
const { formatString } = new FormaterString();
export async function verifyCepMiddleware(req: Request, res: Response, next: NextFunction) {
  const { cep } = req.body;
  const cepFormated = formatString(cep).replace('-', '').replace('.', '');
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepFormated}/json/`);
    if (response.ok) next();
  } catch (error) {
    console.log(error);
    res.status(400).json('Ocorreu um erro ao consumir api viacep');
  }
}