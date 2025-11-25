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
    async updateOrderStatus(req: Request, res: Response){
        const {id} = req.params
        const {orderStatus} = req.body
        if(typeof orderStatus !== 'string') res.status(400).json('Erro com o tipo do orderStatus.')
        const updatedOrder = await orderService.updateOrderStatus(Number(id), orderStatus)
        if(updatedOrder instanceof Error) res.status(400).json(updatedOrder.message)
        res.status(200).json({messageSucess: `O Status do pedido foi atualizado para ${updatedOrder?.status}.`, order: updatedOrder}, )
    }
}