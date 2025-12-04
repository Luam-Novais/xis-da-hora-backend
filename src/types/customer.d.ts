import { type JwtPayload } from 'jsonwebtoken';
export interface ICustomer {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  cep: string;
  role: string;
}
export interface IEditCustomer {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  cep?: string;
}
export interface ICustomerCredentials {
  email: string;
  password: string;
}
export interface ICustomerPayload extends JwtPayload {
  id: number;
}
