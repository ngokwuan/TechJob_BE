import { Router } from 'express';
import { getCompanyProfile } from '../controllers/accountCompany.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';

export const companyRouter = Router();

companyRouter.get('/me', checkUserJWT, getCompanyProfile);
