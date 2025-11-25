import type { DashboardRepository } from "../repository/dashboardRepository.js";

export class DashboardService{
    constructor(private dashboardRepository: DashboardRepository){}
}