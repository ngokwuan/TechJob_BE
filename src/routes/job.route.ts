import { Router } from 'express';
import * as controller from '../controllers/job.controller';
import { checkRole, checkUserJWT } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createJobSchema } from '../validateSchemas/job.schema';

export const jobRouter = Router();

jobRouter.post(
  '/',
  checkUserJWT,
  checkRole('company'),
  validate(createJobSchema),
  controller.createJobController
);
jobRouter.delete(
  '/:id',
  checkUserJWT,
  checkRole('company'),
  controller.softDeleteJob
);
jobRouter.delete(
  '/:id/force',
  checkUserJWT,
  checkRole('company'),
  controller.forceDeleteJob
);
