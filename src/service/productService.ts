import type { IProduct, ProductImage, IEditProduct } from '../types/product.js';
import type { ProductRepository } from '../repository/productRepository.js';
import { FormaterString } from '../utils/formaterString.js';
import type { UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';
import cloudinary from '../config/cloudinary.js';
import { HttpError } from '../error/httpError.js';

const { formatString } = new FormaterString();
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async getProductsByCategory(category: string): Promise<IProduct[] | null | Error> {
    const categoryExisting = await this.productRepository.findCategory(category);
    if (!categoryExisting) throw new HttpError(400, 'Categoria inválida.');
    try {
      const products = await this.productRepository.getByCategory(category);
      return products;
    } catch (error) {
      console.error(error);
      return new HttpError(400, 'Ocorreu um erro em nosso serivdor ao buscar os dados.');
    }
  }
  async createProduct(product: IProduct, file: ProductImage) {
    const categoryExisting = await this.productRepository.findCategory(product.categoryName);
    if (!categoryExisting) throw new HttpError(400, 'Categoria não encontrada.');
    try {
      if (product.price <= 0) throw new HttpError(400, 'O valor do produto está inválido.');
      const imageResizeAndUpload = await this.uploadAndResizeImage(file);
      if (typeof imageResizeAndUpload === 'undefined') throw new HttpError(400, 'Falha ao cadastrar a imagem.');

      const productFormated = {
        name: formatString(product.name),
        price: Number(product.price),
        description: formatString(product.description),
        imageURL: imageResizeAndUpload.secure_url,
        imageId: imageResizeAndUpload.public_id,
        categoryName: product.categoryName,
      };
      const createdProduct = await this.productRepository.createProduct(productFormated);
      return createdProduct;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  async updateProduct(productId: string, product: IEditProduct) {
    if (!product) throw new HttpError(400, 'Falha ao atualizar o produto.');
    try {
      const productExisting = await this.productRepository.findProductById(Number(productId));
      if (!productExisting) throw new HttpError(400, 'Produto não encontrado.');
      const updatedProduct = await this.productRepository.updateProduct(Number(productId), product);
      return updatedProduct;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  async deleteProduct(productId: string) {
    try {
      const productExisting = await this.productRepository.findProductById(Number(productId));
      if (!productExisting) throw new HttpError(400, 'Produto não encontrado.');
      const deletedProduct = await this.productRepository.deleteProduct(Number(productId));
      const imageURLDeleted = await this.deleteImageInCloud(deletedProduct.imageId)
      console.log(imageURLDeleted)
    } catch (error : any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  private async uploadAndResizeImage(file: ProductImage): Promise<UploadApiResponse | undefined> {
    try {
      const resizedImage = await sharp(file.buffer).resize({ width: 800 }).webp({ quality: 80 }).toBuffer();
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'xis da hora' }, (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        });
        stream.end(resizedImage);
      });
    } catch (error) {
      console.error(error);
    }
  }
  private async deleteImageInCloud(public_id: string):Promise<any>{
    return new Promise((resolve, reject)=>{
      const destroy = cloudinary.uploader.destroy(public_id, (error, result) =>{
        if(error){
          console.error(error)
          reject(error)
        }
        resolve(result)
      })
    })
  }
}
