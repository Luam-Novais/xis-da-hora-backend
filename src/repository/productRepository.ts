import type { Category, Product } from '@prisma/client';
import prisma from '../config/prisma.js';
import type { IProduct } from '../types/product.js';
import { ErrorHandlerHttp } from '../error/errorHandlerHttp.js';

export class ProductRepository {
  async findCategory(category: string): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { name: category } });
  }
  async getByCategory(category: string): Promise<IProduct[] | Error> {
    try {
      const categoryExisting = await this.findCategory(category);
      if (!categoryExisting) return new Error('Categoria inválida.');
      const products = await prisma.product.findMany({
        where: { categoryName: category },
      });
      return products;
    } catch (error) {
      console.log(error);
      return new Error('Ocorreu um erro ao buscar dados no banco de dados.');
    }
  }
}
