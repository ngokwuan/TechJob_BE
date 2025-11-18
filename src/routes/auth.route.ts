import { Router } from 'express';
import {
  userLogin,
  userRegister,
  companyLogin,
  companyRegister,
  logout,
} from '../controllers/auth.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  userLoginSchema,
  userRegisterSchema,
  companyLoginSchema,
  companyRegisterSchema,
} from '../validateSchemas/auth.schema';
import {
  LoginInput,
  RegisterUserInput,
  RegisterCompanyInput,
} from '../types/auth.type';

export const authRouter = Router();

// User routes
authRouter.post(
  '/users/login',
  validate<LoginInput>(userLoginSchema),
  userLogin
);

authRouter.post(
  '/users/register',
  validate<RegisterUserInput>(userRegisterSchema),
  userRegister
);

// Company routes
authRouter.post(
  '/companies/login',
  validate<LoginInput>(companyLoginSchema),
  companyLogin
);

authRouter.post(
  '/companies/register',
  validate<RegisterCompanyInput>(companyRegisterSchema),
  companyRegister
);

// Logout
authRouter.post('/logout', checkUserJWT, logout);
