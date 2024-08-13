import { TheMovieDBApiClient } from './api';
import { MovieApiClient } from './types';

export function getMovieApiClient(): MovieApiClient {
  return new TheMovieDBApiClient();
}
