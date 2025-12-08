import express from 'express';
import { searchController } from '../controllers/search.controller';
import { validate } from '../middlewares/validate.middleware';
import { SearchQuerySchema } from '../validateSchemas/search.schema';
export const searchRoute = express.Router();

searchRoute.get('/', validate(SearchQuerySchema), searchController);
