import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  MovieDetail as MovieDetailResult,
  Cast as CastResult,
  HttpClient,
  Movie,
  MovieApiClient,
  MoviePayload,
} from './types';
import {
  MovieDetail,
  Cast,
  MovieDiscover,
  MovieDiscoverResult,
} from './themoviedb-api-types';

export class TheMovieDBApiClient implements MovieApiClient {
  private api: AxiosHTTPClient;

  constructor() {
    this.api = new AxiosHTTPClient();
  }

  getAllMovies(page: number): Promise<MoviePayload> {
    return new Promise<MoviePayload>((resolve, reject) => {
      this.api
        .get<MovieDiscover>(`discover/movie?page=${page}`)
        .then((response) => resolve(formatData(response)))
        .catch((data) => reject(data));
    });
  }

  getMovieDetail(id: number): Promise<MovieDetailResult> {
    return new Promise<MovieDetailResult>((resolve, reject) => {
      this.api
        .get<MovieDetail>(`movie/${id}?append_to_response=credits`)
        .then((response) => resolve(this.formatMovieDetail(response)))
        .catch((data) => reject(data));
    });
  }

  formatMovieDetail(data: MovieDetail): MovieDetailResult {
    return {
      id: data.id,
      title: data.title,
      synopsis: data.overview,
      image: this.formatPoster(data.poster_path),
      runtime: this.formatTime(data.runtime),
      vote: this.formatVote(data.vote_average),
      release_date: data.release_date,
      cast: this.formatCast(data.credits.cast),
    };
  }

  formatPoster(path: string): string {
    return `https://image.tmdb.org/t/p/w300${path}`;
  }

  formatImage(path: string | undefined): string | undefined {
    if (path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    }
    return undefined;
  }

  formatVote(value: number) {
    return parseFloat(value.toFixed(1));
  }

  formatTime(value: number) {
    const hour: number = Math.floor(value / 60);
    const minute: number = value % 60;
    return `${hour}h ${minute}m`;
  }

  formatCast(cast: Cast[]): CastResult[] {
    const arr = cast.slice(0, 10);
    return arr.map((elem: Cast) => {
      return {
        id: elem.id,
        name: elem.name,
        image: this.formatImage(elem.profile_path),
        character: elem.character,
      };
    });
  }
}

function formatData(data: MovieDiscover): MoviePayload {
  return {
    page: data.page,
    results: data.results.map(formatMovie),
    total_pages: data.total_pages,
  };
}

function formatMovie(data: MovieDiscoverResult): Movie {
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
