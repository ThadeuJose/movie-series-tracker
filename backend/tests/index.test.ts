const fakeMovieApiClient: MovieApiClient = {
  getAllMovies: jest.fn(() =>
    Promise.resolve([
      {
        id: 0,
        vote: 0,
        title: 'Movie 1',
        image: 'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
      },
    ]),
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
    const response = await request(app).get('/');

    expect(response.status).toEqual(200);

    expect(response.body[0].title).toEqual('Movie 1');
    expect(response.body[0].image).toEqual(
      'https://image.tmdb.org/t/p/w300/imagepath.jpeg',
    );
  });
});
