import { Router } from 'express';
import { ensureAdmin } from '../middleware/ensureAdmin.js';
import { CategoryController } from '../controller/category.controller.js';
import { ensureAuth } from '../middleware/ensureAuth.js';

const router = Router();
const controller = new CategoryController();
router.get('/get-categories', ensureAuth, (req, res) => controller.getCategories(req, res));
router.post('/create-category', ensureAdmin, (req, res) => controller.createCategory(req, res));
router.delete('/delete-category/:categoryName', ensureAdmin, (req, res) => controller.deleteCategory(req, res));
export default router;
