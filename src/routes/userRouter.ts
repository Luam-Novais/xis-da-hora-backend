import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserController } from '../controller/userController.js';
import { errorRegexMiddleware } from '../middleware/errorRegexMiddleware.js';
import { verifyCepMiddleware } from '../middleware/verifyCepMiddleware.js';


const router = Router();
const controller = new UserController();

router.get('/login', (req, res) => controller.login(req, res));
router.post('/register',errorRegexMiddleware,  verifyCepMiddleware,(req : Request, res : Response) => controller.register(req, res));

export default router;
