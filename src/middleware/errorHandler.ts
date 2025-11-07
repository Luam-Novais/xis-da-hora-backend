import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../error/httpError.js";

export function errorHandler(error: Error, req: Request, res: Response, next:NextFunction){
    if(error){
        if(error instanceof HttpError){
            return res.status(error.status).json(error.message)
        }
        return res.status(400).json(error.message)
    }else next()
}