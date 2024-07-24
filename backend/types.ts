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

export interface MovieApiClient {
  getAllMovies(page: number): Promise<MoviePayload>;
}

export type ExpressRouteFunc = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => void | Promise<void>;

export interface HttpClient {
  get<T>(page: number): Promise<T>;
}

export interface TheMovieDBPayload {
  page: number;
  results: TheMovieDBResult[];
  total_pages: number;
  total_results: number;
}

export interface TheMovieDBResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
