import express from 'express';
import { searchAndFilterCityId } from '../controllers/search.controller';
import { validate } from '../middlewares/validate.middleware';
import { SearchQuerySchema } from '../validateSchemas/search.schema';
export const searchRoute = express.Router();

searchRoute.get('/', validate(SearchQuerySchema), searchAndFilterCityId);
