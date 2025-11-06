import { Router } from "express";
import type { Response, Request } from "express";
import { ProductController } from "../controller/productController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import multer from "multer";
const router = Router()
const upload = multer()
const controller = new ProductController()

router.get('/all-products', (req: Request, res: Response) => controller.getAllProducts(req, res))
router.get('/get-products', (req: Request, res: Response) => controller.getProductsByCategory(req, res))
router.post('/create-product', adminMiddleware, upload.single('productImage'), (req: Request, res: Response) => controller.createProduct(req, res));
router.delete('/delete-product/:id', adminMiddleware, (req: Request, res:Response)=> controller.deleteProduct(req, res))
export default router