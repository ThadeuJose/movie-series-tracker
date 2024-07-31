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
      total_pages: 2,
    }),
  ),
  getMovieDetail: jest.fn(),
};

import request from 'supertest';
import { app } from '../app';
import { MovieApiClient } from '../types';

jest.mock('../service-injection', () => ({
  getMovieApiClient: () => fakeMovieApiClient,
}));

describe('Pagination', () => {
  test('should return correct page', async () => {
    const response = await request(app).get('/2');

    expect(response.status).toEqual(200);

    expect(fakeMovieApiClient.getAllMovies).toHaveBeenCalledWith(2);
  });
});
