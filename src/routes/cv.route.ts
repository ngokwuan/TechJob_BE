import { Router } from 'express';
import * as controller from '../controllers/cv.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createCVSchema,
  updateCVSchema,
  updateStatusSchema,
  filterStatusSchema,
} from '../validateSchemas/cv.schema';
import { upload } from '../middlewares/upload.middleware';
export const cvRouter = Router();
cvRouter.get(
  '/me/:cvId',
  checkUserJWT,
  checkRole('user'),
  controller.getDetailCVUser
);
cvRouter.get(
  '/me',
  checkUserJWT,
  checkRole('user'),
  controller.getListCVWithUser
);
// cvRouter.get(
//   '/filter',
//   checkUserJWT,
//   checkRole('company'),
//   validate(updateStatusSchema),
//   controller.filterStatusCV
// );

cvRouter.get(
  '/all',
  checkUserJWT,
  checkRole('company'),
  validate(filterStatusSchema),
  controller.getListCVAndFilterStatusWithCPN
);
cvRouter.delete('/:id', checkUserJWT, checkRole('user'), controller.deleteCV);

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
  '/status/:cvId',
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
