import  { NextFunction, Request, Response } from 'express';
import AppError from '@utils/appError';
import { z } from 'zod';

export const validationMiddleware = (schema: z.ZodObject<any>, field: 'params' | 'body' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = schema.safeParse(req[field]);
        if (!result.success) {
          console.log(result.error.errors[0].message);
          const errorMessage = result.error.errors[0].message || "validation error";
          throw new AppError(errorMessage, 400);
        }
        req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };