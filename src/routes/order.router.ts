import { Router } from 'express';
import { ensureAuth } from '../middleware/ensureAuth.js';
import type { RequestWithJWT } from '../types/jwt.js';
import { ensureAdmin } from '../middleware/ensureAdmin.js';
import { OrderController } from '../controller/order.controller.js';
const router = Router();
const controller = new OrderController();
router.get('/get-orders-user', ensureAuth, (req: RequestWithJWT, res) => controller.getOrdersUser(req, res));
router.post('/create-order', ensureAuth, (req, res) => controller.createOrder(req, res));
router.patch('/update-status/:id', ensureAdmin, (req, res) => controller.updateOrderStatus(req, res));

export default router;
