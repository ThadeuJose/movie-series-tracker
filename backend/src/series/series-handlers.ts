import { Request, Response } from 'express';
import { ExpressRouteFunc, MovieApiClient } from '../types';
import { getMovieApiClient } from '../service-injection';

export function createSeriesIndexHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { page } = req.query;
    apiClient.getAllTv(Number(page)).then((response) => res.send(response));
  };
}

export function createSeriesDetailHandler(
  apiClient: MovieApiClient = getMovieApiClient(),
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    const { id } = req.params;
    apiClient.getTvDetail(Number(id)).then((response) => res.send(response));
  };
}
