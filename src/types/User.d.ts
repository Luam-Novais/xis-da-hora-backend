export interface IUser {
    id?: number
    name: string, 
    email: string,
    password: string,
    address: string,
    phone: string
    cep: string
}
export interface userCredentials {
    email: string,
    password: string
}