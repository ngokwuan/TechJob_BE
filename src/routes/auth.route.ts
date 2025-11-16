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

export const AuthRouter = Router();

// User routes
AuthRouter.post(
  '/users/login',
  validate<LoginInput>(userLoginSchema),
  userLogin
);

AuthRouter.post(
  '/users/register',
  validate<RegisterUserInput>(userRegisterSchema),
  userRegister
);

// Company routes
AuthRouter.post(
  '/companies/login',
  validate<LoginInput>(companyLoginSchema),
  companyLogin
);

AuthRouter.post(
  '/companies/register',
  validate<RegisterCompanyInput>(companyRegisterSchema),
  companyRegister
);

// Logout
AuthRouter.post('/logout', checkUserJWT, logout);
