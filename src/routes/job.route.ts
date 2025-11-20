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

export const jobRouter = router;
