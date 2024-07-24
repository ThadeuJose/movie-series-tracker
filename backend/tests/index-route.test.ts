import { indexRoute } from '../routes';
import { MovieApiClient } from '../types';
import { Response } from 'express';

const fakeMovieApiClient: MovieApiClient = {
  getAllMovies: jest.fn(() =>
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

describe('indexRoute', () => {
  const mockRequest: any = {
    params: {
      page: 1,
    },
  };
  const mockResponse: any = {
    send: jest.fn(),
  };
  describe('when made a request', () => {
    beforeEach(() => {
      const route = indexRoute(fakeMovieApiClient);
      route(mockRequest, mockResponse);
    });

    it('expect mock to be called', () => {
      expect(fakeMovieApiClient.getAllMovies).toHaveBeenCalled();
    });

    it('expect to have right value', () => {
      const result = {
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
      };
      expect(mockResponse.send).toHaveBeenCalledWith(result);
    });
  });
});
