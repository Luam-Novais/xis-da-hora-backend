import type { Request, Response } from 'express';
import { ProductRepository } from '../repository/product.repository.js';
import { ProductService } from '../service/product.services.js';
import type { IEditProduct, IParams, IProduct } from '../types/product.js';

const repository = new ProductRepository();
const service = new ProductService(repository);
export class ProductController {
  async getProductsByCategory(req: Request, res: Response) {
    const { category } = req.query;
    if (typeof category !== 'string') return res.status(400).json({ message: 'Query inválida.' });
    try {
      const products = await service.getProductsByCategory(category);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ messageError: error.message });
    }
  }
  async createProduct(req: Request<{}, {}, IProduct>, res: Response) {
    if (!req.file) return res.status(400).json({ messageError: 'Arquivo de imagem não enviado.' });
    try {
      const createdProduct = await service.createProduct(req.body, req.file);
      res.status(201).json(createdProduct);
    } catch (error: any) {
      return res.status(error.status).json({ messageError: error.message });
    }
  }
  async updateProduct(req: Request<IParams, {}, IEditProduct>, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json('Identificador do produto não informado.');
    if (!req.body) return res.status(400).json({ messageError: 'Dados a serem alterados não enviados.' });
    try {
      const updatedProduct = await service.updateProduct(id, req.body);
      res.status(200).json({ product: updatedProduct, message: 'Produto atualizado com sucesso.' });
    } catch (error: any) {
      return res.status(error.status).json({ messageError: error.message });
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json('Identificador do produto não informado.');
    try {
      const deletedProduct = await service.deleteProduct(id);
      return res.status(200).json({ deletedProduct, message: 'Produto deletado com sucesso.' });
    } catch (error: any) {
      console.error(error);
      return res.status(error.status).json(error.message);
    }
  }
}
