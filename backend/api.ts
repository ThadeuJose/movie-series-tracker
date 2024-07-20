import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HttpClient, Movie, MovieApiClient } from './types';

export class TheMovieDBApiClient implements MovieApiClient {
  private api: AxiosHTTPClient;

  constructor() {
    this.api = new AxiosHTTPClient();
  }

  getAllMovies(): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve, reject) => {
      this.api
        .get<any>()
        .then((response) => resolve(response.results.map(formatData)))
        .catch((data) => reject(data));
    });
  }
}

function formatData(data: any): Movie {
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

  get<T>(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.api
        .get(`https://api.themoviedb.org/3/discover/movie?page=1`)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }
}
