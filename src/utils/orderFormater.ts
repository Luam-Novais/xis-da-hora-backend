import type { Order } from '@prisma/client';
import type { OrderRepository } from '../repository/order.repository.js';
import type { IProductOrderJSON, ItemsInOrders } from '../types/order.js';
import { ProductRepository } from '../repository/product.repository.js';

const productRepository = new ProductRepository();
export class OrderFormater {
  constructor(private orderRepository: OrderRepository) {}
  async formaterAndCompleteOrder(order: Order) {
    return {
      id: order.id,
      numberOrder: order.id,
      userId: order.userId,
      products: await this.orderRepository.getProductsInOrder(order.id),
      total: order.total,
      status: order.status,
    };
  }
  async formaterProduct(products: IProductOrderJSON[], order: Order): Promise<ItemsInOrders[]> {
    const productsIds = products.map((p) => p.id);
    const getPriceProducts = await productRepository.getPriceProducts(productsIds);

    const formatedItems = products.map((item) => {
      const compareProducts = getPriceProducts.find((p) => p.id === item.id);
      if (!compareProducts) throw new Error('Produto não encontrado.');
      return {
        productId: item.id,
        orderId: order.id,
        quantity: item.quantity,
        subtotal: Math.floor(item.quantity * Number(compareProducts.price)),
      };
    });

    return formatedItems;
  }
}
