import { Request, Response, Router } from 'express';
import { ExpressRouteFunc, MovieApiClient } from '../types';
import { getMovieApiClient } from '../service-injection';

function createIndexHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { page } = req.query;
    apiClient.getAllTv(Number(page)).then((response) => res.send(response));
  };
}

function createMovieDetailHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { id } = req.params;
    // apiClient.getMovieDetail(Number(id)).then((response) => res.send(response));
    res.send('Ok');
  };
}

export const tvRouter: Router = Router();

tvRouter.get('/', createIndexHandler());
tvRouter.get('/:id/detail', createMovieDetailHandler());
