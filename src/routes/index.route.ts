import { Application, Request, Response } from 'express';
import { authRouter } from './auth.route';
import { userRouter } from './accountUser.route';
import { jobRouter } from './job.route';
import { cvRouter } from './cv.route';
import { companyRouter } from './accountCompany.route';
import { cityRouter } from './city.route';
import { adminRouter } from './admin.route';
export const Routes = (app: Application): void => {
  app.use('/auth', authRouter);
  app.use('/jobs', jobRouter);
  app.use('/companies', companyRouter);
  app.use('/users', userRouter);
  app.use('/cvs', cvRouter);
  app.use('/cities', cityRouter);
  app.use('/admin', adminRouter);

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'TechJob API' });
  });
};
