import { Request, Response, NextFunction } from 'express';

export type MoviePayload = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type Movie = {
  id: number;
  title: string;
  vote: number;
  image: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  synopsis: string;
  image: string;
  runtime: string;
  vote: number;
  release_date: string;
  cast: Cast[];
};

export type Cast = {
  id: number;
  name: string;
  image: string | undefined;
  character: string;
};

export interface MovieApiClient {
  getAllMovies(page: number): Promise<MoviePayload>;
  getMovieDetail(id: number): Promise<MovieDetail>;
}

export type ExpressRouteFunc = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => void | Promise<void>;

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}
