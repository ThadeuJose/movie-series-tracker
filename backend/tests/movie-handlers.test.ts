import { createMovieIndexHandler } from '../src/movie/movie-handlers';
import { MovieApiClient } from '../src/types';

const fakeMovieApiClient: MovieApiClient = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllMovies: jest.fn((page: number) =>
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

describe('Movie Handler', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRequest: any = {
    query: {
      page: 1,
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockResponse: any = {
    send: jest.fn(),
  };
  describe('when made a request', () => {
    beforeEach(() => {
      const route = createMovieIndexHandler(fakeMovieApiClient);
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
        total_results: 1,
      };
      expect(mockResponse.send).toHaveBeenCalledWith(result);
    });
  });
});
