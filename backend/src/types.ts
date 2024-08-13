import { Request, Response, NextFunction } from 'express';

export interface Pagination<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type Tv = {
  id: number;
  title: string;
  vote: number;
  image: string;
};

export type TvDetail = {
  detail: Detail;
  season: Season;
  cast: Cast[];
};

export interface Detail {
  id: number;
  title: string;
  vote: number;
  image: string | null;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  synopsis: string;
}

export interface Season {
  id: number;
  name: string;
  vote: number;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  number: number;
  image: string | null;
  runtime: number;
  air_date: string | null;
}

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
  runtime: number;
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
  getTvDetail(id: number): Promise<TvDetail>;
}

export type ExpressRouteFunc = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => void | Promise<void>;

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}
