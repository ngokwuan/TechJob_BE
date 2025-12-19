import { Router } from 'express';
import * as controller from '../controllers/accountCompany.controller';
import { searchAndFilterCPNForGuest } from '../controllers/search.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { upload } from '../middlewares/upload.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  searchAndFilterCPNSchema,
  updateCompanySchema,
} from '../validateSchemas/accountCompany.schema';
export const companyRouter = Router();
companyRouter.get('/me', checkUserJWT, controller.getCompanyProfile);
companyRouter.get('/all', controller.getListCPN);
companyRouter.get(
  '/dashboard',
  checkUserJWT,
  checkRole('company'),
  controller.getDashBoard
);
companyRouter.get(
  '/search',
  validate(searchAndFilterCPNSchema),
  searchAndFilterCPNForGuest
);
companyRouter.get('/:companyId', controller.getDetailCompanyForGuest);

companyRouter.patch(
  '/',
  checkUserJWT,
  checkRole('company'),
  upload.single('logo'),
  validate(updateCompanySchema),
  controller.updateCompanyProfile
);
