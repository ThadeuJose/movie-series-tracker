import { Router } from 'express';
import {
  createMovieIndexHandler,
  createMovieDetailHandler,
} from './movie-handlers';

export const movieRouter: Router = Router();

movieRouter.get('/', createMovieIndexHandler());
movieRouter.get('/:id/detail', createMovieDetailHandler());
