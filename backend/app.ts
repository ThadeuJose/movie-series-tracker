import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { indexRouter } from './routes/index';
import userRouter from './routes/user';
import { tvRouter } from './routes/tv';

export const app: Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tv', tvRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);
