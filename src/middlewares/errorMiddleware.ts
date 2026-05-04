import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
