import { Router } from 'express';
import * as controller from '../controllers/cv.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createCVSchema,
  updateCVSchema,
  updateStatusSchema,
} from '../validateSchemas/cv.schema';
import { upload } from '../middlewares/upload.middleware';
export const cvRouter = Router();
cvRouter.get('/', checkUserJWT, checkRole('user'), controller.getDetailCVUser);
cvRouter.get(
  '/all',
  checkUserJWT,
  checkRole('company'),
  controller.getListCVWithCPN
);
cvRouter.delete(
  '/:id',
  checkUserJWT,
  checkRole('company'),
  controller.deleteCV
);

cvRouter.post(
  '/',
  checkUserJWT,
  checkRole('user'),
  upload.single('fileCV'),
  validate(createCVSchema),
  controller.createCVController
);
cvRouter.patch(
  '/:cvId',
  checkUserJWT,
  checkRole('user'),
  upload.single('fileCV'),
  validate(updateCVSchema),
  controller.updateCV
);

cvRouter.patch(
  '/:cvId',
  checkUserJWT,
  checkRole('company'),
  validate(updateStatusSchema),
  controller.updateStatusCV
);
cvRouter.get(
  '/:cvId',
  checkUserJWT,
  checkRole('company'),
  controller.getDetailCVCPN
);
