import prisma from '../config/prisma.js';

export class DashboardRepository {
  async getRevenue(currentDate: Date, finalDate: Date) {
    return await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        createdAt: {
          gte: currentDate,
          lt: finalDate,
        },
      },
    });
  }
  async getCompletedOrdersToday(currentDate: Date, finalDate: Date) {
    try {
      return await prisma.order.count({
        where: {
          status: {in :['PRONTO', 'ENTREGUE']}, 
          createdAt: {
            gte: currentDate,
            lt: finalDate,
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async countOrdersByStatusToday(currentDate: Date, finalDate: Date) {
    try {
      return await prisma.order.groupBy({
        by:['status'],
        _count:{
          _all: true
        }, 
        where:{
          createdAt:{
            gte: currentDate,
            lt: finalDate
          }
        }
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
  async bestSellersProducts(){
    const products = await prisma.itemsOnOrders.groupBy({
      by:['productId'],
      _sum:{
        quantity: true
      },
      orderBy: {
        _sum:{
          quantity: 'desc'
        }
      },
      take: 3
    })
    return products.map(product =>{
      return {
        productId: product.productId,
        totalQuantity: product._sum.quantity
      }
    })
  }
  async ticketMedio(currentDate: Date, finalDate: Date){
    try {
      return await prisma.order.aggregate({
        _avg: { total: true },
        where:{
          createdAt: {
            lte: currentDate,
            gt: finalDate
          }
        }
      });
    } catch (error:any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}
