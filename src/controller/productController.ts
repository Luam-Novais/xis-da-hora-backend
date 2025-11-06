import type { Request, Response } from 'express';
import { ProductRepository } from '../repository/productRepository.js';
import { ProductService } from '../service/productService.js';
import { rmSync } from 'fs';
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
    const products = await productService.getProductsByCategory(category);
    if(products instanceof Error) res.status(400).json(products.message)
    res.status(200).json(products)
  }
  async createProduct(req: Request<{}, {}, IProduct>, res: Response){
    if(!req.file) return res.status(400).json({message: 'Arquivo de imagem não enviado.'})
    const createdProduct = await productService.createProduct(req.body, req.file)
    if(createdProduct instanceof Error) return res.status(400).json(createdProduct.message)
      res.status(201).json(createdProduct)
  }
}
