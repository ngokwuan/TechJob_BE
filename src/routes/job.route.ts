import express from 'express';
import * as controller from '../controllers/job.controller';
import { checkRole, checkUserJWT } from '../middlewares/jwt.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createJobSchema } from '../validateSchemas/job.schema';

const router = express.Router();

router.post(
  '/',
  checkUserJWT,
  checkRole('company'),
  validate(createJobSchema),
  controller.createJobController
);
router.delete(
  '/:id',
  checkUserJWT,
  checkRole('company'),
  controller.softDeleteJob
);
router.delete(
  '/:id/force',
  checkUserJWT,
  checkRole('company'),
  controller.forceDeleteJob
);

export const jobRouter = router;
