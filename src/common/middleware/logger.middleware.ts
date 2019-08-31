import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

type Next = () => any;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Next) {
    console.log('Request...', req.url);
    next();
  }
}

export function logger(req, res, next) {
  console.log('[Request]', req.url);
  next();
}
