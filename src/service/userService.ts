import type { IUser } from '../types/User.js';
import { UserRepository } from '../repository/userRepository.js';
import { FormatedString } from '../utils/formatedString.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { ErrorHandlerHttp } from '../error/errorHandlerHttp.js';

const { formatString } = new FormatedString();

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async login() {}
  async register(user: IUser): Promise<IUser | object | Error> {

    const userFormated: IUser = {
      name: formatString(user.name),
      email: formatString(user.email),
      phone: formatString(user.phone),
      address: formatString(user.address),
      cep: formatString(user.cep).replace('-', '').replace('.', ''),
      password: bcrypt.hashSync(user.password, 10),
    };
    const registeredUser = await this.userRepository.register(userFormated);
    if(registeredUser instanceof Error) return registeredUser
    else{
      const payload = {
        id: registeredUser.id,
        name: registeredUser.name
      }
      if(!process.env.JWT_SECRET_KEY) return new ErrorHandlerHttp(400, 'Secret Key is undefined.')
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return {registeredUser, token}
    }
  }
}
