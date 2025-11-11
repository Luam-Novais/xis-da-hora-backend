export interface IProduct{
    id?: number
    name: string
    description: string
    price: Decimal | number
    imageURL: string
    imageId: string
    categoryName: string
}
export interface IEditProduct {
  id: number;
  name?: string;
  description?: string;
  price?: Decimal | number;
  categoryName?: string;
}
export interface IParams extends ParamsDictionary {
  id?: string
}
type ProductImage = Express.Multer.File