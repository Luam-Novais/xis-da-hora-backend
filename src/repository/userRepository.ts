import prisma from '../config/prisma.js';
import { HttpError } from '../error/httpError.js';
import type { IEditUser, IUser } from '../types/user.js';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { email: email } });
  }
  async findById(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { id: id } });
  }
  async register(user: IUser): Promise<IUser | Error> {
    try {
      const registeredUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          password: user.password,
          cep: user.cep,
        },
      });
      return registeredUser;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  async update(user: IEditUser, userId: number): Promise<IEditUser> {
    try {
      const editUser = await prisma.user.update({
        where: { id: userId as number },
        data: { ...user },
      });
      return editUser;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  async delete(userId: number) {
    try {
      const deletedUser = await prisma.user.delete({ where: { id: userId } });
      return deletedUser;
    } catch (error: any) {
      console.error(error)
      throw new HttpError(400, error.message);
    }
  }
}
