import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { indexRoute } from './routes/index';
import userRouter from './routes/user';

export const app: Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRoute());
app.use('/user', userRouter);
