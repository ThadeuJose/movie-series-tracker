import { Router } from 'express';
import { createIndexHandler } from './index-handlers';

export const indexRouter: Router = Router();

indexRouter.get('/', createIndexHandler());
