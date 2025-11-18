export interface ICreateOrder {
  total: number;
  userId: number;
}
export interface IOrderJSON {
  userId: number;
  products: IProductOrderJSON[];
}
export interface IProductOrderJSON {
  id: number;
  quantity: number;
}
export interface ItemsInOrders {
  productId: number;
  orderId: number;
  quantity: number;
  subtotal: number;
}
