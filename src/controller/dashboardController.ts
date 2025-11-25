import { DashboardService } from "../service/dashboardService.js";
import { DashboardRepository } from "../repository/dashboardRepository.js";

const repository = new DashboardRepository()
const service = new DashboardService(repository)
export class DashboardController{

}