import { Request, Response } from 'express';
import { ExpressRouteFunc } from '../types';

export function createIndexHandler(): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const message = {
      message: 'Welcome to API',
    };
    res.send(message);
  };
}
