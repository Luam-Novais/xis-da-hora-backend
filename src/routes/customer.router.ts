import { Router } from 'express';
import type { Request, Response } from 'express';
import { CustomerController } from '../controller/customer.controller.js';
import { errorRegexMiddleware } from '../middleware/errorRegexMiddleware.js';
import { verifyCepMiddleware } from '../middleware/verifyCepMiddleware.js';
import {ensureAuth } from '../middleware/ensureAuth.js';

const router = Router();
const controller = new CustomerController();

router.post('/login', (req, res) => controller.login(req, res));
router.post('/register-customer', errorRegexMiddleware, verifyCepMiddleware, (req: Request, res: Response) => controller.register(req, res));
router.put('/update-customer', ensureAuth, (req: Request, res: Response) => controller.update(req, res));
router.delete('/delete-customer', ensureAuth, (req: Request, res: Response) => controller.delete(req, res));
export default router;
