import { Application, Request, Response } from 'express';
import { authRouter } from './auth.route';
import { userRouter } from './accountUser.route';
import { jobRouter } from './job.route';
export const Routes = (app: Application): void => {
  app.use('/auth', authRouter);
  app.use('/companies/job', jobRouter);
  // app.use('/companies', companyRouter);
  app.use('/users', userRouter);
  // app.use('/admin', adminRouter);

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'TechJob API' });
  });
};
