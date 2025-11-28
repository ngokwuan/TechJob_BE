import { Router } from 'express';
import * as controller from '../controllers/city.controller';

export const cityRouter = Router();

cityRouter.get('/', controller.getAllCity);
cityRouter.get('/:id', controller.getCityById);
