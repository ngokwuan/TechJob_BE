import { Router } from 'express';
import * as controller from '../controllers/cv.controller';
import { checkUserJWT, checkRole } from '../middlewares/jwt.middleware';

export const cvRouter = Router();

cvRouter.post('/', checkUserJWT, checkRole('user'), controller.createCV);
