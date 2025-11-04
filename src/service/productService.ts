import type { IProduct } from '../types/product.js';
import { ErrorHandlerHttp } from '../error/errorHandlerHttp.js';
import type { ProductRepository } from '../repository/productRepository.js';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async getProductsByCategory(category: string): Promise<IProduct[] | null | Error> {
    const categoryExisting = await this.productRepository.findCategory(category);
    if (!categoryExisting) return new ErrorHandlerHttp(400, 'Categoria inválida.');
    const products =await  this.productRepository.getByCategory(category);
    return products;
  }
}
