import { Router } from 'express';
import {
  userLogin,
  userRegister,
  companyLogin,
  companyRegister,
} from '../controllers/auth.controller';

export const AuthRouter = Router();

AuthRouter.post('/users/login', userLogin);
AuthRouter.post('/users/register', userRegister);
AuthRouter.post('/companies/login', companyLogin);
AuthRouter.post('/companies/register', companyRegister);
