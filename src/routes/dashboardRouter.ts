import { Router } from "express";
import { DashboardController } from "../controller/dashboardController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = Router()
const controller = new DashboardController()

router.get('/get-daily-revenue', adminMiddleware, (req, res) => controller.getDailyRevenue(req, res));
router.get('/get-completed-orders-today', adminMiddleware, (req, res) => controller.getCompletedOrdersToday(req, res));
router.get('/count-orders-by-status', adminMiddleware, (req, res) => controller.countOrdersByStatusToday(req, res));
router.get('/best-seller-products', adminMiddleware, (req, res) => controller.getBestSellerProducts(req, res));
router.get('/ticket-medio', adminMiddleware, (req, res) => controller.getTicketMedio(req, res));

export default router 