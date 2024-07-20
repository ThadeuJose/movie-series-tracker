import { Request, Response } from 'express';
import { ExpressRouteFunc, MovieApiClient } from '../types';
import { getMovieApiClient } from '../service-injection';

export function indexRoute(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    apiClient.getAllMovies().then((response) => res.send(response));
  };
}
