import type { Request, Response } from 'express';
import { DashboardService } from '../service/dashboardService.js';
import { DashboardRepository } from '../repository/dashboardRepository.js';
import { count } from 'console';

const repository = new DashboardRepository();
const service = new DashboardService(repository);
export class DashboardController {
  async getDailyRevenue(req: Request, res: Response) {
    try {
      const dailyRevenue = await service.getDailyRevenue();
      res.status(200).json(dailyRevenue);
    } catch (error: any) {
      console.error(error);
      res.status(400).json(error.message);
    }
  }
  async getCompletedOrdersToday(req: Request, res: Response) {
    try {
      const completedOrders = await service.getCompletedOrdersToday();
      res.status(200).json(completedOrders);
    } catch (error: any) {
      console.error(error);
      res.status(400).json(error.message);
    }
  }
  async countOrdersByStatusToday(req: Request, res: Response) {
    const countOrders = await service.countOrdersByStatusToday();
    try {
      res.status(200).json(countOrders);
    } catch (error: any) {
      console.error(error);
      res.status(400).json(error.message);
    }
  }
  async getBestSellerProducts(req: Request, res: Response) {
    try {
      const bestSellers = await service.getBestSellerProducts();
      res.status(200).json(bestSellers);
    } catch (error: any) {
      console.error(error);
      res.status(400).json(error.message);
    }
  }
  async getTicketMedio(req:Request, res:Response){
    try {
        const ticketMedio = await service.getTicketMedio()
        res.status(200).json({ messageSucess: 'Ticket Medio baseado nos últimos 30 dias.', ticketMedio});
    } catch (error:any) {
          console.error(error);
          res.status(400).json(error.message);
    }
  }
}
