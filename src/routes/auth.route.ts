import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
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
authRouter.get('/check', checkUserJWT, controller.checkAccount);

// User routes
authRouter.post(
  '/users/login',
  validate<LoginInput>(userLoginSchema),
  controller.userLogin
);

authRouter.post(
  '/users/register',
  validate<RegisterUserInput>(userRegisterSchema),
  controller.userRegister
);

// Company routes
authRouter.post(
  '/companies/login',
  validate<LoginInput>(companyLoginSchema),
  controller.companyLogin
);

authRouter.post(
  '/companies/register',
  validate<RegisterCompanyInput>(companyRegisterSchema),
  controller.companyRegister
);

// Logout
authRouter.post('/logout', checkUserJWT, controller.logout);
