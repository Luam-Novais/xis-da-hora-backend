import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import  { OrderController } from "../controller/orderController.js";
const router = Router()
const controller = new OrderController()
router.post('/create-order', (req, res) => controller.createOrder(req, res));

export default router