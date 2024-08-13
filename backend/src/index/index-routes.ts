import { Router } from 'express';
import { createIndexHandler, createMovieDetailHandler } from './index-handlers';

export const indexRouter: Router = Router();

indexRouter.get('/:page', createIndexHandler());
indexRouter.get('/:id/detail', createMovieDetailHandler());
