import type { Request, Response } from 'express';
import { CategoryService } from '../service/category.services.js';
import { CategoryRepository } from '../repository/category.repository.js';

const repository = new CategoryRepository();
const service = new CategoryService(repository);

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await service.getCategories();
    res.status(200).json(categories);
  }
  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const category = await service.createCategory(name);
      res.status(201).json({ messageSucess: 'Categoria criada com sucesso.', category });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { categoryName } = req.params;
    console.log(categoryName);
    if (!categoryName) res.status(400).json({ messageError: 'Nome da categoria não informado.' });
    try {
      const category = await service.deleteCategory(categoryName as string);
      res.status(204).json({ messageSucess: 'Categoria excluída com sucesso.', category });
    } catch (error: any) {
      res.status(404).json(error.message);
    }
  }
}
