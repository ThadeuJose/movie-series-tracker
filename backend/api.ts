import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  HttpClient,
  Movie,
  MovieApiClient,
  MoviePayload,
  TheMovieDBPayload,
  TheMovieDBResult,
} from './types';

export class TheMovieDBApiClient implements MovieApiClient {
  private api: AxiosHTTPClient;

  constructor() {
    this.api = new AxiosHTTPClient();
  }

  getAllMovies(page: number): Promise<MoviePayload> {
    return new Promise<MoviePayload>((resolve, reject) => {
      this.api
        .get<TheMovieDBPayload>(page)
        .then((response) => resolve(formatData(response)))
        .catch((data) => reject(data));
    });
  }
}

function formatData(data: TheMovieDBPayload): MoviePayload {
  return {
    page: data.page,
    results: data.results.map(formatMovie),
    total_pages: data.total_pages,
  };
}

function formatMovie(data: TheMovieDBResult): Movie {
  const IMAGE_URL = `https://image.tmdb.org/t/p/w300`;
  return {
    id: data.id,
    title: data.title,
    vote: parseFloat(data.vote_average.toFixed(1)),
    image: IMAGE_URL + data.poster_path,
  };
}

class AxiosHTTPClient implements HttpClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      params: {
        api_key: process.env.API_KEY,
      },
    });
  }

  get<T>(page: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.api
        .get(`https://api.themoviedb.org/3/discover/movie?page=${page}`)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }
}
