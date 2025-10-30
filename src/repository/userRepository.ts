import prisma from '../config/prisma.js';
import type { IEditUser, IUser } from '../types/user.js';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    const emailExisting = await prisma.user.findUnique({ where: { email: email } });
    return emailExisting;
  }
  async findById(id: number): Promise<IUser | null> {
    const userExisting = await prisma.user.findUnique({ where: { id: id } });
    return userExisting;
  }
  async register(user: IUser): Promise<IUser | Error> {
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
  }
  async update(user: IEditUser, userId: number): Promise<IEditUser> {
    const editUser = await prisma.user.update({
      where: { id: userId as number },
      data: { ...user },
    });
    return editUser;
  }
  async delete(userId: number) {
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    return deletedUser;
  }
}
