import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UserService } from '../service/userService.js';
import type { IEditUser, IUser, IUserCredentials, IUserPayload } from '../types/user.js';
import { formaterToken } from '../utils/FormatedToken.js';
import { HttpError } from '../error/httpError.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json('Por favor nos informe os dados necessários.');
    const userCredentials: IUserCredentials = { email, password };
   try {
       const loginUser = await userService.login(userCredentials);
       res.status(200).json(loginUser);
   } catch (error:any) {
      console.error(error.message)
      res.status(error.status).json(error.message);
   }
  }
  async register(req: Request<{}, {}, IUser>, res: Response) {
    const { name, email, phone, address, password, cep } = req.body;
    if (!name || !email || !phone || !address || !password || !cep) throw new HttpError(400, 'Por favor preencha todos os dados.')
      try {
        const user = {
          ...req.body,
          role: 'USER',
        };
        const registerUser = await userService.register(user);
        res.status(201).json(registerUser);
      } catch (error: any) {
        console.error(error)
        res.status(error.status).json(error.message)
      }
  }
  async updateUser(req: Request<{}, {}, IEditUser>, res: Response) {
    const user = req.body;
    const token = formaterToken(req.headers.authorization as string);
    if (!token) return res.status(401).json('Por favor efetue o login.');
    const decode = jwt.decode(token) as JwtPayload & IUserPayload;
    console.log(decode);
    const editedUser = await userService.updateUser(user, decode.id);
    if (editedUser instanceof Error) return res.status(400).json(editedUser.message);
    res.status(200).json('Usuário editado com sucesso!');
  }
  async delete(req: Request, res: Response): Promise<object> {
    const { userId } = req.body;
    const deletedUser = await userService.delete(userId);
    if (deletedUser instanceof Error) return res.status(400).json(deletedUser.message);

    return res.status(200).json({ deletedUser, message: 'Usuário excluido com sucesso!' });
  }
}
