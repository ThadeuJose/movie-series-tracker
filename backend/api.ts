import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  MovieDetail,
  HttpClient,
  Movie,
  MovieApiClient,
  Pagination,
  Tv,
} from './types';
import {
  MovieDetail as MovieDetailResult,
  MovieDiscoverResult,
  TvDiscoverResult,
} from './themoviedb-api-types';
import { Formatter } from './formatter';

export class TheMovieDBApiClient implements MovieApiClient {
  private api: AxiosHTTPClient;

  constructor() {
    this.api = new AxiosHTTPClient();
  }

  getAllMovies(page: number): Promise<Pagination<Movie>> {
    return new Promise<Pagination<Movie>>((resolve, reject) => {
      this.api
        .get<Pagination<MovieDiscoverResult>>(`discover/movie?page=${page}`)
        .then((response) =>
          resolve(Formatter.formatResult(response, Formatter.formatMovie)),
        )
        .catch((data) => reject(data));
    });
  }

  getAllTv(page: number): Promise<Pagination<Tv>> {
    return new Promise<Pagination<Tv>>((resolve, reject) => {
      this.api
        .get<Pagination<TvDiscoverResult>>(`discover/tv?page=${page}`)
        .then((response) =>
          resolve(Formatter.formatResult(response, Formatter.formatTv)),
        )
        .catch((data) => reject(data));
    });
  }

  getMovieDetail(id: number): Promise<MovieDetail> {
    return new Promise<MovieDetail>((resolve, reject) => {
      this.api
        .get<MovieDetailResult>(`movie/${id}?append_to_response=credits`)
        .then((response) => resolve(Formatter.formatMovieDetail(response)))
        .catch((data) => reject(data));
    });
  }
}

class AxiosHTTPClient implements HttpClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      params: {
        api_key: process.env.API_KEY,
      },
    });
  }

  get<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.api
        .get(url)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }
}
