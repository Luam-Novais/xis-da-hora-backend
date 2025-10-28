import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.js';
import { UserService } from '../service/userService.js';
import type { IUser, userCredentials } from '../types/User.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json('Por favor nos informe os dados necessários.');
    const userCredentials: userCredentials = { email, password };
    const loginUser = await userService.login(userCredentials);
    if (loginUser instanceof Error) res.status(401).json(loginUser.message);
    res.status(200).json(loginUser);
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
        cep,
      };
      const registerUser = await userService.register(user);
      if (registerUser instanceof Error) res.status(400).json(registerUser.message);
      res.status(201).json(registerUser);
    }
  }
}
