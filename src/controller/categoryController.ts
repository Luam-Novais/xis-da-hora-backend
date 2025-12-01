import type { Request, Response } from "express";
import { CategoryService } from "../service/categoryService.js";
import { CategoryRepository } from "../repository/categoryRepository.js";

const repository = new CategoryRepository()
const service = new CategoryService(repository)

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
    const { name } = req.body;
    try {
      const category = await service.deleteCategory(name);
      res.status(200).json({ messageSucess: 'Categoria excluída com sucesso.', category });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
}