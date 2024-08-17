import express, { Express, NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { indexRouter } from './index/index-routes';
import userRouter from './user/user';
import { seriesRouter } from './series/series-routes';
import { movieRouter } from './movie/movie-routes';
import { AppError } from './app-error';
import { HttpStatus } from './http-status';

export const app: Express = express();

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/movie', movieRouter);
app.use('/tv', seriesRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);

// Catch-all for 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(HttpStatus.NOT_FOUND, 'Not found'));
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack);
  }
  const status = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).send(err.message);
});
