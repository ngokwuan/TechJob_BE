import { Router } from 'express';
import * as controller from '../controllers/cv.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createCVSchema } from '../validateSchemas/cv.schema';

export const cvRouter = Router();

cvRouter.post(
  '/',
  checkUserJWT,
  checkRole('user'),
  validate(createCVSchema),
  controller.createCVController
);
cvRouter.get(
  '/:cvId',
  checkUserJWT,
  checkRole('company'),
  controller.getDetailCV
);
cvRouter.get('/', checkUserJWT, checkRole('user'), controller.getDetailCVUser);
