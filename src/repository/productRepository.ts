import type { Category} from '@prisma/client';
import prisma from '../config/prisma.js';
import type { IProduct } from '../types/product.js';
import { HttpError } from '../error/httpError.js';

export class ProductRepository {
  async findCategory(category: string): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { name: category } });
  }
  async getByCategory(category: string): Promise<IProduct[] | Error> {
    try {
      const products = await prisma.product.findMany({
        where: { categoryName: category },
      });
      return products;
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message)
    }
  }
  async createProduct(product: IProduct) {
    try {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          price: product.price as number,
          description: product.description,
          imageURL: product.imageURL as string,
          categoryName: product.categoryName,
        },
      });
      return createdProduct;
    } catch (error: any) {
      console.error(error.message)
      throw new HttpError(400, error.message)
    }
  }
}
