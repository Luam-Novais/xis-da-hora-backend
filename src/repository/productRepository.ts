import type { Category, Product } from '@prisma/client';
import prisma from '../config/prisma.js';
import type { IEditProduct, IProduct } from '../types/product.js';
import { HttpError } from '../error/httpError.js';

export class ProductRepository {
  async findCategory(category: string): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { name: category } });
  }
  async findProductById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id: id },
    });
  }
  async getByCategory(category: string): Promise<IProduct[] | Error> {
    try {
      const products = await prisma.product.findMany({
        where: { categoryName: category },
      });
      return products;
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
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
          imageId:product.imageId
        },
      });
      return createdProduct;
    } catch (error: any) {
      console.error(error.message);
      throw new HttpError(400, error.message);
    }
  }
  async updateProduct(productId: number, product: IEditProduct) {
    try {
      return await prisma.product.update({
        where: { id: productId },
        data: { ...product },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  async deleteProduct(id: number) {
    try {
      return await prisma.product.delete({
        where: { id: id },
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
