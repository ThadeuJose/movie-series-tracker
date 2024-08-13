import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { indexRouter } from './index/index-routes';
import userRouter from './user/user';
import { seriesRouter } from './series/series-routes';

export const app: Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tv', seriesRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);
