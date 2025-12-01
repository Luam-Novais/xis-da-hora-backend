import { Router } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { CategoryController } from "../controller/categoryController.js";
const router = Router()
const controller = new CategoryController()
router.get('/get-categories', adminMiddleware, (req, res) => controller.getCategories(req, res))
router.post('/create-category', adminMiddleware, (req, res) => controller.createCategory(req, res))
router.delete('/delete-category', adminMiddleware, (req, res) => controller.deleteCategory(req, res));
export default router