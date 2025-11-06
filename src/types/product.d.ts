export interface IProduct{
    id?: number
    name: string
    description: string
    price: Decimal | number
    imageURL: string
    categoryName: string
}
type ProductImage = Express.Multer.File