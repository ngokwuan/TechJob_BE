import { Router } from 'express';
import * as controller from '../controllers/accountCompany.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';

export const companyRouter = Router();

companyRouter.get('/me', checkUserJWT, controller.getCompanyProfile);
