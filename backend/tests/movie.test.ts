const fakeMovieApiClient: MovieApiClient = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllMovies: jest.fn((number) =>
    Promise.resolve({
      page: 1,
      results: [
        {
          id: 0,
          vote: 0,
          title: 'Movie 1',
          image: 'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
        },
      ],
      total_pages: 1,
      total_results: 1,
    }),
  ),
  getMovieDetail: jest.fn(),
  getAllTv: jest.fn(),
  getTvDetail: jest.fn(),
};

import request from 'supertest';
import { app } from '../src/app';
import { MovieApiClient } from '../src/types';

jest.mock('../src/service-injection', () => ({
  getMovieApiClient: () => fakeMovieApiClient,
}));

describe('Movie', () => {
  test('should return all movies', async () => {
    const response = await request(app).get('/movie?page=1').expect(200);

    expect(response.body.results[0].title).toEqual('Movie 1');
    expect(response.body.results[0].image).toEqual(
      'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
    );
  });
});
