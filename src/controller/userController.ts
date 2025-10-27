import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.js';
import { UserService } from '../service/userService.js';
import type { IUser } from '../types/User.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    res.status(200).json(userService.login());
  }
  async register(req: Request<{}, {}, IUser>, res: Response) {
    const { name, email, phone, address, password, cep } = req.body;
    if (name && email && phone && address && password && cep) {
      const user = {
        name,
        email,
        phone,
        address,
        password,
        cep
      };
      const registerUser = await userService.register(user);
      if(registerUser instanceof Error) res.status(400).json(registerUser.message)
      res.status(201).json(registerUser)
    }
  }
}
