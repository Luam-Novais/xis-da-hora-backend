import { Router } from "express";
import type { Response, Request } from "express";
import { ProductController } from "../controller/productController.js";
const router = Router()
const controller = new ProductController()

router.get('/all-products', (req: Request, res: Response) => controller.getAllProducts(req, res))
router.get('/get-products', (req: Request, res: Response) => controller.getProductsByCategory(req, res))

export default router