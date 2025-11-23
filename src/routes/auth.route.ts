import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as authSchema from '../validateSchemas/auth.schema';
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
  validate<LoginInput>(authSchema.userLoginSchema),
  controller.userLogin
);

authRouter.post(
  '/users/register',
  validate<RegisterUserInput>(authSchema.userRegisterSchema),
  controller.userRegister
);

// Company routes
authRouter.post(
  '/companies/login',
  validate<LoginInput>(authSchema.companyLoginSchema),
  controller.companyLogin
);

authRouter.post(
  '/companies/register',
  validate<RegisterCompanyInput>(authSchema.companyRegisterSchema),
  controller.companyRegister
);

authRouter.post('/logout', controller.logout);
