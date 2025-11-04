export interface IProduct{
    id?: number
    name: string
    description: string
    price: Decimal | number
    imageURl?: string
    categoryName: string
}