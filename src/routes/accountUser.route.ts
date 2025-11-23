import { Router } from 'express';
import * as controller from '../controllers/accountUser.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';

export const userRouter = Router();

userRouter.get('/me', checkUserJWT, controller.getUserProfile);
