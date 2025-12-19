import { Router } from 'express';
import * as controller from '../controllers/accountUser.controller';
import { checkRole, checkUserJWT } from '../middlewares/jwt.middleware';
import { upload } from '../middlewares/upload.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateUserSchema } from '../validateSchemas/accountUser.schema';
export const userRouter = Router();

userRouter.get('/me', checkUserJWT, controller.getUserProfile);
userRouter.get(
  '/dashboard',
  checkUserJWT,
  checkRole('user'),
  controller.getDashboard
);
userRouter.patch(
  '/',
  checkUserJWT,
  checkRole('user'),
  upload.single('avatar'),
  validate(updateUserSchema),
  controller.updateUserProfile
);
