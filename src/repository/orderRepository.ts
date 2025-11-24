import type { ICreateOrder, IProductOrderJSON, ItemsInOrders } from '../types/order.js';
import prisma from '../config/prisma.js';
import type { Order, StatusOrder } from '@prisma/client';

export class OrderRepository {
  async getOrderById(id: number){
    try {
      return await prisma.order.findUnique({where:{id: id}})
    } catch (error:any) {
      console.log(error)
      throw new Error(error.message)
    }
  }
  async createOrder(order: ICreateOrder): Promise<Order | Error> {
   try {
     return await prisma.order.create({
       data: { ...order },
     });
   } catch (error :any) {
    console.error(error)
    throw new Error(error.message)
   }
  }
  async addProductsInOrders(data: ItemsInOrders[]){
    try {
       return await prisma.itemsOnOrders.createMany({
        data: data
       })
    } catch (error: any){
        console.error(error.message)
        throw new Error(error.message)
    }
  }
  async getProductsInOrder(orderId: number){
    const itemsOnOrders = await prisma.itemsOnOrders.findMany({
      where: {orderId: orderId},
      include:{product : true}
    })
    return itemsOnOrders.map((item)=>{
      return {
        productId: item.productId,
        nameProduct: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        subtotal: item.subtotal
      }
    })
  }
  async updateOrderStatus(id: number, newStatus: StatusOrder){
    try {
      return await prisma.order.update({
        where:{id: id},
        data:{
          status: newStatus
        }
      })
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}
