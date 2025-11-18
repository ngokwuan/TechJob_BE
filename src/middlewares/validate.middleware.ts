import { z } from 'zod';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.type';

export const validate =
  <T>(schema: z.ZodSchema<T>) =>
  (req: AuthRequest<T>, res: Response, next: NextFunction) => {
    try {
      req.validated = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
      });
    }
  };
