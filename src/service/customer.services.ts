import type { IEditCustomer, ICustomer, ICustomerCredentials } from '../types/customer.js';
import { CustomerRepository } from '../repository/customer.repository.js';
import { FormaterString } from '../utils/formaterString.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HttpError } from '../error/httpError.js'

const { formatString } = new FormaterString();
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async login(customer: ICustomerCredentials) {
    const customerExisting = await this.customerRepository.findByEmail(customer.email);
    if (customerExisting) {
      const comparePassword = await bcrypt.compare(customer.password, customerExisting.password);
      if (!comparePassword) throw new HttpError(400, 'Credenciais inválidas.');
      const payload = {
        id: customerExisting.id,
        name: customerExisting.name,
        role: customerExisting.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { token };
    } else {
      throw new HttpError(401, 'Credenciais inválidas.');
    }
  }
  async register(customer: ICustomer) {
    const emailExisting = await this.customerRepository.findByEmail(customer.email);
    if (emailExisting) throw new HttpError(400, 'Email ja cadastrado!');
    const customerFormated = await this.customerFormater(customer);
    try {
      const customerCreated = await this.customerRepository.register(customerFormated);
      if (customerCreated instanceof Error) throw new HttpError(500, 'Falha ao criar usuário.');
      const payload = {
        id: customerCreated.id,
        name: customerCreated.name,
        role: customerCreated.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { customerCreated, token };
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
  async update(customer: IEditCustomer, customerId: number): Promise<IEditCustomer | Error> {
    const customerExisting = await this.customerRepository.findById(customerId);
    if (!customerExisting) throw new HttpError(400, 'Usuário não encontrado');
    try {
      const editedCustomer = await this.customerRepository.update(customer, customerId);
      return editedCustomer;
    } catch (error:any) {
      throw error
    }
  }
  async delete(customerId: number): Promise<ICustomer | Error> {
    const customerExisting = await this.customerRepository.findById(Number(customerId));
    if (!customerExisting) throw new HttpError(400, 'Usuário não encontrado');
    try {
      const deletedCustomer = await this.customerRepository.delete(Number(customerId));
      return deletedCustomer;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  private async customerFormater(c: ICustomer): Promise<ICustomer> {
    return {
      name: formatString(c.name),
      email: formatString(c.email),
      phone: formatString(c.phone),
      address: formatString(c.address),
      cep: formatString(c.cep).replace('-', '').replace('.', ''),
      role: c.role,
      password: await bcrypt.hash(c.password, 10),
    };
  }
}
