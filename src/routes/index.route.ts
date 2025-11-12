import { Application, Request, Response } from 'express';
import { AuthRouter } from './auth.route';

export const Routes = (app: Application): void => {
  app.use('/auth', AuthRouter);

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'TechJob API' });
  });
};
