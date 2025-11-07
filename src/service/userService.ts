import type { IEditUser, IUser, IUserCredentials } from '../types/user.js';
import { UserRepository } from '../repository/userRepository.js';
import { FormaterString } from '../utils/formaterString.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HttpError } from '../error/httpError.js';

const { formatString } = new FormaterString();
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async login(user: IUserCredentials) {
    const userExisting = await this.userRepository.findByEmail(user.email);
    if (userExisting) {
      const comparePassword = await bcrypt.compare(user.password, userExisting.password);
      if (!comparePassword) throw new HttpError(400, 'Credenciais inválidas.');
      const payload = {
        id: userExisting.id,
        name: userExisting.name,
        role: userExisting.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { token };
    } else {
      throw new HttpError(401, 'Credenciais inválidas.');
    }
  }
  async register(user: IUser){
    const emailExisting = await this.userRepository.findByEmail(user.email);
    if (emailExisting) throw new HttpError(400, 'Email ja cadastrado!');
    const userFormated = await this.userFormater(user);
    try {
      const userCreated = await this.userRepository.register(userFormated);
      if (userCreated instanceof Error) throw new HttpError(500, 'Falha ao criar usuário.');
      const payload = {
        id: userCreated.id,
        name: userCreated.name,
        role: userCreated.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { userCreated, token };
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  async updateUser(user: IEditUser, userId: number): Promise<IEditUser | Error> {
    const userExisting = await this.userRepository.findById(userId);
    if (!userExisting) throw new HttpError(400, 'Usuário não encontrado');
    const editedUser = await this.userRepository.update(user, userId);
    return editedUser;
  }
  async delete(userId: string): Promise<IUser | Error | null> {
    const userExisting = await this.userRepository.findById(Number(userId));
    if (!userExisting) throw new HttpError(400, 'Usuário não encontrado');
    try {
      const deletedUser = await this.userRepository.delete(Number(userId));
      return deletedUser;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  private async userFormater(user: IUser): Promise<IUser> {
    return {
      name: formatString(user.name),
      email: formatString(user.email),
      phone: formatString(user.phone),
      address: formatString(user.address),
      cep: formatString(user.cep).replace('-', '').replace('.', ''),
      role: user.role,
      password: await bcrypt.hash(user.password, 10),
    };
  }
}
