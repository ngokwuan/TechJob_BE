import { Router } from 'express';
import * as controller from '../controllers/admin.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';

export const adminRouter = Router();
adminRouter.get(
  '/companies/all',
  checkUserJWT,
  checkRole('admin'),
  controller.getListCPNForAdmin
);
adminRouter.patch(
  '/companies/:id/toggle',
  checkUserJWT,
  checkRole('admin'),
  controller.toggleCompanyStatus
);

adminRouter.get(
  '/users/all',
  checkUserJWT,
  checkRole('admin'),
  controller.getAllUsersForAdmin
);
adminRouter.patch(
  '/users/:id/toggle',
  checkUserJWT,
  checkRole('admin'),
  controller.toggleUserStatus
);
