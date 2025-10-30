export interface IUser {
    id?: number
    name: string, 
    email: string,
    password: string,
    address: string,
    phone: string
    cep: string
}
export interface IEditUser {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  cep?: string;
}
export interface IUserCredentials {
    email: string,
    password: string
}
export interface IUserPayload{
    id: number
}