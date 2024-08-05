import { Request, Response, NextFunction } from 'express';

export interface Pagination<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type Movie = {
  id: number;
  title: string;
  vote: number;
  image: string;
};

export type Tv = {
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
  image: string | null;
  character: string;
};

export interface MovieApiClient {
  getAllMovies(page: number): Promise<Pagination<Movie>>;
  getAllTv(page: number): Promise<Pagination<Tv>>;
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
