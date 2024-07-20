import { Request, Response, NextFunction } from 'express';

export type Movie = {
  id: number;
  title: string;
  vote: number;
  image: string;
};

export interface MovieApiClient {
  getAllMovies(): Promise<Movie[]>;
}

export type ExpressRouteFunc = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => void | Promise<void>;

export interface HttpClient {
  get<T>(): Promise<T>;
}
