import { Router } from 'express';
import type { Response, Request } from 'express';
import { ProductController } from '../controller/product.controller.js';
import { ensureAdmin } from '../middleware/ensureAdmin.js';
import multer from 'multer';
const router = Router();
const upload = multer();
const controller = new ProductController();

router.get('/get-products-by-category', (req: Request, res: Response) => controller.getProductsByCategory(req, res));
router.post('/create-product', ensureAdmin, upload.single('productImage'), (req: Request, res: Response) => controller.createProduct(req, res));
router.put('/update-product/:id', ensureAdmin, (req: Request, res: Response) => controller.updateProduct(req, res));
router.delete('/delete-product/:id', ensureAdmin, (req: Request, res: Response) => controller.deleteProduct(req, res));
export default router;
