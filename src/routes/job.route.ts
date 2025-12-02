import { Router } from 'express';
import * as controller from '../controllers/job.controller';
import { checkRole, checkUserJWT } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createJobSchema,
  updateJobSchema,
} from '../validateSchemas/job.schema';
import { upload } from '../middlewares/upload.middleware';

export const jobRouter = Router();

jobRouter.get('/all', controller.getListJobWithoutRole);
jobRouter.get('/:jobId', controller.getDetailJob);
jobRouter.get(
  '/',
  checkUserJWT,
  checkRole('company'),
  controller.getListJobWithRole
);
jobRouter.post(
  '/',
  checkUserJWT,
  checkRole('company'),
  upload.array('images', 10),
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
jobRouter.patch(
  '/:jobId',
  checkUserJWT,
  checkRole('company'),
  upload.array('images', 10),
  validate(updateJobSchema),
  controller.updateJobController
);
