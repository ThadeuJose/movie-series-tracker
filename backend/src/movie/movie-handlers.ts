import { NextFunction, Request, Response } from 'express';
import { getMovieApiClient } from '../service-injection';
import { MovieApiClient, ExpressRouteFunc } from '../types';

export function createMovieIndexHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction | undefined,
  ) {
    const { page } = req.query;
    apiClient
      .getAllMovies(Number(page))
      .then((response) => res.send(response))
      .catch((error) => {
        if (next) {
          next(error);
        }
      });
  };
}

export function createMovieDetailHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { id } = req.params;
    apiClient.getMovieDetail(Number(id)).then((response) => res.send(response));
  };
}
