import { Request, Response, Router } from 'express';
import { ExpressRouteFunc, MovieApiClient } from '../types';
import { getMovieApiClient } from '../service-injection';

function createIndexHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { page } = req.params;
    apiClient.getAllMovies(Number(page)).then((response) => res.send(response));
  };
}

export const indexRouter: Router = Router();

indexRouter.get('/:page', createIndexHandler());
