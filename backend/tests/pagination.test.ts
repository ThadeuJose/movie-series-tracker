const result: Pagination<Movie> = {
  page: 1,
  results: [
    {
      id: 0,
      vote: 0,
      title: 'Movie 1',
      image: 'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
    },
  ],
  total_pages: 2,
  total_results: 1,
};
const fakeMovieApiClient: MovieApiClient = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllMovies: jest.fn((page: number) => Promise.resolve(result)),
  getMovieDetail: jest.fn(),
  getAllTv: jest.fn(),
  getTvDetail: jest.fn(),
};

import request from 'supertest';
import { app } from '../src/app';
import { Movie, MovieApiClient, Pagination } from '../src/types';

jest.mock('../src/service-injection', () => ({
  getMovieApiClient: () => fakeMovieApiClient,
}));

describe('Pagination', () => {
  test('should return correct page', async () => {
    await request(app).get('/movie?page=2').expect(200);

    expect(fakeMovieApiClient.getAllMovies).toHaveBeenCalledWith(2);
  });
});
