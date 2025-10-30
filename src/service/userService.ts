import type { IEditUser, IUser, IUserCredentials } from '../types/user.js';
import { UserRepository } from '../repository/userRepository.js';
import { FormaterString } from '../utils/formaterString.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHandlerHttp } from '../error/errorHandlerHttp.js';

const { formatString } = new FormaterString();

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async login(user: IUserCredentials) {
    const userExisting = await this.userRepository.findByEmail(user.email);
    if (userExisting) {
      const comparePassword = bcrypt.compareSync(user.password, userExisting.password);
      if (!comparePassword) return new ErrorHandlerHttp(400, 'Credenciais inválidas.');
      const payload = {
        id: userExisting.id,
        name: userExisting.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { token };
    } else {
      return new ErrorHandlerHttp(400, 'Credenciais inválidas.');
    }
  }
  async register(user: IUser): Promise<IUser | object | Error> {
    const emailExisting = await this.userRepository.findByEmail(user.email);
    if (emailExisting) return new ErrorHandlerHttp(400, 'Email ja cadastrado!');
    const userFormated: IUser = {
      name: formatString(user.name),
      email: formatString(user.email),
      phone: formatString(user.phone),
      address: formatString(user.address),
      cep: formatString(user.cep).replace('-', '').replace('.', ''),
      password: bcrypt.hashSync(user.password, 10),
    };
    const registeredUser = await this.userRepository.register(userFormated);
    if (registeredUser instanceof Error) return registeredUser;
    else {
      const payload = {
        id: registeredUser.id,
        name: registeredUser.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return { registeredUser, token };
    }
  }
  async updateUser(user: IEditUser, userId: number): Promise<IEditUser | Error> {
    const userExisting = await this.userRepository.findById(userId);
    if (typeof userExisting === null) return new ErrorHandlerHttp(400, 'Usuário não encontrado');
    const editedUser = await this.userRepository.update(user, userId);
    return editedUser;
  }
  async delete(userId: string): Promise<IUser | Error | null> {
    const userExisting = await this.userRepository.findById(Number(userId));
    if (typeof userExisting === null) return new ErrorHandlerHttp(400, 'Usuário não encontrado');
    const deletedUser = await this.userRepository.delete(Number(userId));
    return deletedUser;
  }
}
