import type { Request, Response } from 'express';
import { ProductRepository } from '../repository/productRepository.js';
import { ProductService } from '../service/productService.js';
import type { IProduct } from '../types/product.js';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    console.log('testeeeee');
  }
  async getProductsByCategory(req: Request, res: Response) {
    const { category } = req.query;
    if (typeof category !== 'string') return res.status(400).json({ message: 'Query inválida.' });
    try {
      const products = await productService.getProductsByCategory(category);
      res.status(200).json(products);
    } catch (error : any) {
      res.status(400).json(error.message);
    }
  }
  async createProduct(req: Request<{}, {}, IProduct>, res: Response) {
    if (!req.file) return res.status(400).json({ message: 'Arquivo de imagem não enviado.' });
    try {
      const createdProduct = await productService.createProduct(req.body, req.file);
      res.status(201).json(createdProduct);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
  }
}
