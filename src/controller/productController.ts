import type { Request, Response } from 'express';
import { ProductRepository } from '../repository/productRepository.js';
import { ProductService } from '../service/productService.js';
import type { IEditProduct, IParams, IProduct } from '../types/product.js';

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
      res.status(400).json({messageError: error.message});
    }
  }
  async createProduct(req: Request<{}, {}, IProduct>, res: Response) {
    if (!req.file) return res.status(400).json({ messageError: 'Arquivo de imagem não enviado.' });
    try {
      const createdProduct = await productService.createProduct(req.body, req.file);
      res.status(201).json(createdProduct);
    } catch (error: any) {
      return res.status(error.status).json({messageError :error.message});
    }
  }
  async updateProduct(req: Request<IParams, {}, IEditProduct>, res: Response){
    const {id} = req.params
    if(typeof id !== 'string') return res.status(400).json('Identificador do produto não informado.')
    if(!req.body) return res.status(400).json({messageError:"Dados a serem alterados não enviados." })
    try {
      const updatedProduct = await productService.updateProduct(id, req.body)
      res.status(200).json({product: updatedProduct, message: 'Produto atualizado com sucesso.'})
    } catch (error : any) {
      return res.status(error.status).json({messageError: error.message})
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json('Identificador do produto não informado.');
    try {
      const deletedProduct = await productService.deleteProduct(id);
      return res.status(200).json({deletedProduct, message: 'Produto deletado com sucesso.'}); 
    } catch (error :any) {
      console.error(error)
      return res.status(error.status).json(error.message)
    }
  }
}
