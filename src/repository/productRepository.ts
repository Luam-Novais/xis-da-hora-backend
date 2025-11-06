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
      return products
    } catch (error) {
      console.log(error);
      return new Error('Ocorreu um erro ao buscar dados no banco de dados.');
    }
  }
  async createProduct(product: IProduct) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price as number,
        description: product.description,
        imageURL: product.imageURL as string,
        categoryName: product.categoryName
      }
    })
    return createdProduct
  }
}
