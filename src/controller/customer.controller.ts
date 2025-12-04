import type { Request, Response } from 'express';
import { CustomerRepository } from '../repository/customer.repository.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { CustomerService } from '../service/customer.services.js';
import type { IEditCustomer, ICustomer, ICustomerPayload } from '../types/customer.js';
import { formaterToken } from '../utils/FormatedToken.js';

const repository = new CustomerRepository();
const service = new CustomerService(repository);

export class CustomerController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json('Por favor nos informe os dados necessários.');
    const customerCredentials = { email, password };
    try {
      const loginCustomer = await service.login(customerCredentials);
      res.status(200).json(loginCustomer);
    } catch (error: any) {
      console.error(error.message);
      res.status(error.status).json(error.message);
    }
  }
  async register(req: Request<{}, {}, ICustomer>, res: Response) {
    const { name, email, phone, address, password, cep } = req.body;
    if (!name || !email || !phone || !address || !password || !cep) res.status(400).json( 'Por favor preencha todos os dados.');
    try {
      const customer = {
        ...req.body,
        role: 'USER',
      };
      const registeredCustomer = await service.register(customer);
      res.status(201).json(registeredCustomer);
    } catch (error: any) {
      console.error(error);
      res.status(error.status).json(error.message);
    }
  }
  async update(req: Request<{}, {}, IEditCustomer>, res: Response) {
    const customer = req.body;
    const token = formaterToken(req.headers.authorization as string);
    if (!token) return res.status(401).json('Por favor efetue o login.');
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY) as ICustomerPayload;
      const editedCustomer = await service.update(customer, decode.id);
      res.status(200).json({ messageSucess: 'Usuário editado com sucesso!', editedCustomer });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async delete(req: Request, res: Response) {
        const token = formaterToken(req.headers.authorization as string);
        if (!token) return res.status(401).json('Por favor efetue o login.');
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY) as ICustomerPayload;
      const deletedCustomer = await service.delete(decode.id);
      res.status(204).json({ messageSucess:'Usuário excluido com sucesso!', deletedCustomer });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
}
