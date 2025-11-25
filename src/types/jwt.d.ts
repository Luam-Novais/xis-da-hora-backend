import type { Request} from 'express';
export interface RequestWithJWT extends Request {
  userId?: number;
}
