import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserController } from '../controller/userController.js';
import { errorRegexMiddleware } from '../middleware/errorRegexMiddleware.js';
import { verifyCepMiddleware } from '../middleware/verifyCepMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = Router();
const controller = new UserController();

router.post('/login', (req, res) => controller.login(req, res));
router.post('/register-user', errorRegexMiddleware, verifyCepMiddleware, (req: Request, res: Response) => controller.register(req, res));
router.put('/update-user', authMiddleware, (req: Request, res: Response) => controller.updateUser(req, res));
router.delete('/delete-user', authMiddleware, (req: Request, res: Response) => controller.delete(req, res));
export default router;
