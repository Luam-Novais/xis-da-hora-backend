import type { Request, Response } from "express";
import { OrderService } from "../service/orderService.js";
import { OrderRepository } from "../repository/orderRepository.js";
import { OrderFormater } from "../utils/orderFormater.js";
import type { IOrderJSON } from "../types/order.js";

const orderRepository = new OrderRepository()
const orderFormater = new OrderFormater(orderRepository)
const orderService = new OrderService(orderRepository, orderFormater)
export class OrderController{
    async createOrder(req: Request<{},{}, IOrderJSON>, res:Response){
        const {body} = req
        if(!body) res.status(400).json({messageError: 'Conteúdo do body não enviado.'})
        try {
            const order = await orderService.createOrder(body);
            res.status(201).json({message: 'Pedido criado com sucesso!', order})
        } catch (error: any) {
            console.error(error)
            res.status(error.status).json(error.message)
        }
    }
}