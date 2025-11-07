import { Application, Request, Response } from 'express';

export const Routes = (app: Application): void => {
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'TechJob API' });
  });
};
