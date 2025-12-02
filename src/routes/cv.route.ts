import { Router } from 'express';
import * as controller from '../controllers/cv.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createCVSchema,
  updateStatusSchema,
} from '../validateSchemas/cv.schema';

export const cvRouter = Router();
cvRouter.get('/', checkUserJWT, checkRole('user'), controller.getDetailCVUser);

cvRouter.post(
  '/',
  checkUserJWT,
  checkRole('user'),
  validate(createCVSchema),
  controller.createCVController
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
  controller.getDetailCV
);
