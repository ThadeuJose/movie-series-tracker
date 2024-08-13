import { Router } from 'express';
import {
  createSeriesDetailHandler,
  createSeriesIndexHandler,
} from './series-handlers';

export const seriesRouter: Router = Router();

seriesRouter.get('/', createSeriesIndexHandler());
seriesRouter.get('/:id/detail', createSeriesDetailHandler());
