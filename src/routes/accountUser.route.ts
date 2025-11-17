import { Router } from 'express';
import { getUserProfile } from '../controllers/accountUser.controller';
import { checkUserJWT } from '../middlewares/jwt.middleware';

export const userRouter = Router();

userRouter.get('/me', checkUserJWT, getUserProfile);
