import { Router, Request, Response } from 'express';
import { getAllMovies } from '../api';

const router: Router = Router();

router.get('/', function (req: Request, res: Response) {
  getAllMovies().then(function (response) {
    res.send(response.data.results.map(formatData));
  });
});

function formatData(data: any) {
  const IMAGE_URL = `https://image.tmdb.org/t/p/w300`;
  return {
    id: data.id,
    title: data.title,
    vote: parseFloat(data.vote_average.toFixed(1)),
    image: IMAGE_URL + data.poster_path,
  };
}

export default router;
