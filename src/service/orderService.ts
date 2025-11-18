import type { OrderRepository } from '../repository/orderRepository.js';
import type { IOrderJSON, IProductOrderJSON, ItemsInOrders } from '../types/order.js';
import { HttpError } from '../error/httpError.js';
import { UserRepository } from '../repository/userRepository.js';
import { ProductRepository } from '../repository/productRepository.js';
import type { OrderFormater } from '../utils/orderFormater.js';

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
export class OrderService {
  constructor(private orderRepository: OrderRepository, private orderFormater: OrderFormater) {}

  async createOrder(order: IOrderJSON) {
    const userExisting = await userRepository.findById(order.userId);
    if (!userExisting) throw new HttpError(401, 'Usuário não encontrado.');
    if (order.products.length <= 0) throw new HttpError(400, 'O carrinho não pode estar vazio.');
    try {
      await this.verifyProduct(order.products);
      const totalOrder = await this.calcTotalOrder(order.products, 0);
      if (totalOrder <= 0) throw new HttpError(400, 'O valor total do pedido não pode ser 0.');
      const createdOrder = await this.orderRepository.createOrder({ total: totalOrder, userId: order.userId });
      if (createdOrder instanceof Error) throw new HttpError(400, 'Ocorreum erro ao criar o pedido.');
      const formatProducts = await this.orderFormater.formaterProduct(order.products, createdOrder);
      await this.orderRepository.addProducts(formatProducts);
      const completeOrder = await this.orderFormater.formaterAndCompleteOrder(createdOrder);
      return completeOrder;
    } catch (error: any) {
      console.error(error);
      throw new HttpError(400, error.message);
    }
  }
  private async verifyProduct(products: IProductOrderJSON[]) {
    for (const item of products) {
      const productExisting = await productRepository.findProductById(item.id);
      if (!productExisting) throw new Error(`Produto com id ${item.id} não encontrado.`);
      if (item.quantity <= 0) throw new Error('A quantidade de cada produto deve ser maior que 0.');
    }
  }
  private async calcTotalOrder(products: IProductOrderJSON[], shippingCost: number) {
    const productsIds = products.map((item)=> item.id)
    const getPrices = await productRepository.getPriceProducts(productsIds)

    const subtotal = products.reduce((acc, item):number => {
      const prices = getPrices.find(p => p.id === item.id)
      if(!prices) throw new Error('Produto não encontrado.')
      return acc + Math.floor(item.quantity * Number(prices.price))
    },0)
    return subtotal + shippingCost
  }
}