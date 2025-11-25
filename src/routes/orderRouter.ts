import { Router } from "express";
import { authMiddleware} from "../middleware/authMiddleware.js";
import type { RequestWithJWT } from "../types/jwt.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import  { OrderController } from "../controller/orderController.js";
const router = Router()
const controller = new OrderController()
router.get('/get-orders-user', authMiddleware, (req : RequestWithJWT, res) => controller.getOrdersUser(req, res))
router.post('/create-order', authMiddleware, (req, res) => controller.createOrder(req, res));
router.post('/update-status/:id',adminMiddleware, (req, res)=> controller.updateOrderStatus(req, res))

export default router