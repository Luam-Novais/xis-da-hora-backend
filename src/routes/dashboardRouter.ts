import { Router } from "express";
import { DashboardController } from "../controller/dashboardController.js";
const router = Router()
const controller = new DashboardController()

export default router 