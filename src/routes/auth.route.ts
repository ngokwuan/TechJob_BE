// routes/auth.route.ts
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

export const AuthRouter = Router();

// User routes
AuthRouter.post('/users/login', validate(userLoginSchema), userLogin);
AuthRouter.post('/users/register', validate(userRegisterSchema), userRegister);

// Company routes
AuthRouter.post('/companies/login', validate(companyLoginSchema), companyLogin);
AuthRouter.post(
  '/companies/register',
  validate(companyRegisterSchema),
  companyRegister
);

// Logout (chung cho cả user và company)
AuthRouter.post('/logout', checkUserJWT, logout);
