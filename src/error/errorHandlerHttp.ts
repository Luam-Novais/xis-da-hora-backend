export class ErrorHandlerHttp extends Error{
    status: number
    constructor(status: number, error: string){
        super(error)
        this.status = status
    }
}