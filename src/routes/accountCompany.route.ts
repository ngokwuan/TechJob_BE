import { Router } from 'express';
import * as controller from '../controllers/accountCompany.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { upload } from '../middlewares/upload.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateCompanySchema } from '../validateSchemas/accountCompany.schema';
export const companyRouter = Router();
companyRouter.get('/me', checkUserJWT, controller.getCompanyProfile);
companyRouter.patch(
  '/',
  checkUserJWT,
  checkRole('company'),
  upload.single('logo'),
  validate(updateCompanySchema),
  controller.updateCompanyProfile
);
