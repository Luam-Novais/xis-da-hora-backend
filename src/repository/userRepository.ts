import prisma from '../config/prisma.js';
import type { IUser } from '../types/User.js';
import { ErrorHandlerHttp } from '../error/errorHandlerHttp.js';
export class UserRepository {
  async findByEmail(user: IUser): Promise<IUser | null> {
    const emailExisting = await prisma.user.findUnique({ where: { email: user.email } });
    return emailExisting;
  }
  async login() {}
  async register(user: IUser): Promise<IUser | Error > {
    const emailExisting = await this.findByEmail(user);
    if (emailExisting) return new ErrorHandlerHttp(400, 'Email ja cadastrado!')
    const registeredUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        password: user.password,
        cep: user.cep
      },
    });
    return registeredUser;
  }
}
