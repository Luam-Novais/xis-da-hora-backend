import type { CategoryRepository } from '../repository/categoryRepository.js';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  async getCategories() {
    const categories = await this.categoryRepository.getCategories();
    console.log(categories);
    return categories;
  }
  async createCategory(name: string) {
    try {
      if (typeof name !== 'string' || name.length <= 0) throw new Error('Nome da categoria inválido.');
      const createdCategory = await this.categoryRepository.createCategory(name);
      return createdCategory;
    } catch (error) {
      throw error;
    }
  }
  async deleteCategory(name: string) {
    try {
      if (typeof name !== 'string' || name.length <= 0) throw new Error('Nome da categoria inválido.');
      const deletedCategory = await this.categoryRepository.deleteCategory(name);
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  }
}
