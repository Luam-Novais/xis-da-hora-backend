import prisma from '../config/prisma.js';

import type { IEditCustomer, ICustomer } from '../types/customer.js';

export class CustomerRepository {
  async findByEmail(email: string): Promise<ICustomer | null> {
    return await prisma.user.findUnique({ where: { email: email } });
  }
  async findById(id: number): Promise<ICustomer | null> {
    return await prisma.user.findUnique({ where: { id: id } });
  }
  async register(customer: ICustomer): Promise<ICustomer> {
    try {
      return await prisma.user.create({
        data: {
          name: customer.name,
          email: customer.email,
          address: customer.address,
          phone: customer.phone,
          password: customer.password,
          cep: customer.cep,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  async update(customer: IEditCustomer, customerId: number): Promise<IEditCustomer> {
    try {
      return await prisma.user.update({
        where: { id: customerId },
        data: { ...customer },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  async delete(customerId: number) {
    try {
      return await prisma.user.delete({ where: { id: customerId } });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
