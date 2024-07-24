const fakeMovieApiClient: MovieApiClient = {
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
    }),
  ),
};

import request from 'supertest';
import { app } from '../app';
import { MovieApiClient } from '../types';

jest.mock('../service-injection', () => ({
  getMovieApiClient: () => fakeMovieApiClient,
}));

describe('Index', () => {
  test('should return all items', async () => {
    const response = await request(app).get('/1');

    expect(response.status).toEqual(200);

    expect(response.body.results[0].title).toEqual('Movie 1');
    expect(response.body.results[0].image).toEqual(
      'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
    );
  });
});
