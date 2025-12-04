import { notEqual } from 'assert';
import type { DashboardRepository } from '../repository/dashboard.repository.js';
import { getCurrentDate } from '../utils/getCurrentDate.js';

export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}
  async getDailyRevenue() {
    try {
      const currentDate = getCurrentDate();
      const finalDate = new Date(currentDate);
      finalDate.setDate(finalDate.getDate() + 1);
      return await this.dashboardRepository.getRevenue(currentDate, finalDate);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getCompletedOrdersToday() {
    try {
      const currentDate = getCurrentDate();
      const finalDate = new Date(currentDate);
      finalDate.setDate(finalDate.getDate() + 1);
      return await this.dashboardRepository.getCompletedOrdersToday(currentDate, finalDate);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async countOrdersByStatusToday() {
    try {
      const currentDate = getCurrentDate();
      const finalDate = new Date(currentDate);
      finalDate.setDate(finalDate.getDate() + 1);

      return await this.dashboardRepository.countOrdersByStatusToday(currentDate, finalDate);
    } catch (error) {
      throw error;
    }
  }
  async getBestSellerProducts() {
    try {
      return await this.dashboardRepository.bestSellersProducts();
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
  async getTicketMedio() {
    const currentDate = getCurrentDate();
    const finalDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    try {
      return await this.dashboardRepository.ticketMedio(currentDate, finalDate);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
