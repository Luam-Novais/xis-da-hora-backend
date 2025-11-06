import type { IProduct, ProductImage } from '../types/product.js';
import type { ProductRepository } from '../repository/productRepository.js';
import { FormaterString } from '../utils/formaterString.js';
import type { UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';
import cloudinary from '../config/cloudinary.js';

const { formatString } = new FormaterString();
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async getProductsByCategory(category: string): Promise<IProduct[] | null | Error> {
    try {
      const categoryExisting = await this.productRepository.findCategory(category);
      if (!categoryExisting) throw new Error('Categoria inválida.')
      const products = await this.productRepository.getByCategory(category);
      return products;
    } catch (error) {
      console.error(error);
      return new Error('Ocorreu um erro em nosso serivdor ao buscar os dados.');
    }
  }
  async createProduct(product: IProduct, file: ProductImage) {
    try {
      const categoryExisting = await this.productRepository.findCategory(product.categoryName);
      if (!categoryExisting) throw new Error('Categoria não encontrada.');
      if (product.price <= 0) throw new Error('O valor do produto está inválido.');
      const imageResizeAndUpload = await this.uploadAndResizeImage(file);
      if (typeof imageResizeAndUpload === 'undefined') throw new Error('Falha ao cadastrar a imagem.');

      const productFormated = {
        name: formatString(product.name),
        price: Number(product.price),
        description: formatString(product.description),
        imageURL: imageResizeAndUpload.secure_url,
        categoryName: product.categoryName,
      };
      const createdProduct = await this.productRepository.createProduct(productFormated);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  }
  private async uploadAndResizeImage(file: ProductImage): Promise<UploadApiResponse| undefined> {
    try {
      const resizedImage = await sharp(file.buffer).resize({ width: 800 }).webp({quality: 80}).toBuffer();
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'xis da hora' }, (error, result) => {
          if (error) return reject(error);
          return resolve(result)
        });
        stream.end(resizedImage)
      });
    } catch (error) {
      console.error(error)
    }
  }
}
