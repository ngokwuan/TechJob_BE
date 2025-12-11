import { z, ZodError } from 'zod';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.type';

export const validate =
  <T>(schema: z.ZodSchema<T>) =>
  (req: AuthRequest<T>, res: Response, next: NextFunction) => {
    try {
      const data = req.method === 'GET' ? req.query : req.body;
      const parsed = schema.parse(data) ?? {};
      req.validated = parsed as T;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: error.issues.map((err) => ({
            message: err.message,
          })),
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
      });
    }
  };
