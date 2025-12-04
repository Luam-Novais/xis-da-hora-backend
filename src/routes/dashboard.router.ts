import { Router } from 'express';
import { DashboardController } from '../controller/dashboard.controller.js';
import { ensureAdmin } from '../middleware/ensureAdmin.js';
const router = Router();
const controller = new DashboardController();

router.get('/get-daily-revenue', ensureAdmin, (req, res) => controller.getDailyRevenue(req, res));
router.get('/get-completed-orders-today', ensureAdmin, (req, res) => controller.getCompletedOrdersToday(req, res));
router.get('/count-orders-by-status', ensureAdmin, (req, res) => controller.countOrdersByStatusToday(req, res));
router.get('/best-seller-products', ensureAdmin, (req, res) => controller.getBestSellerProducts(req, res));
router.get('/ticket-medio', ensureAdmin, (req, res) => controller.getTicketMedio(req, res));

export default router;
