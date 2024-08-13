import { Router, Request, Response } from 'express';
import Database from '../database/database';
import MovieDataModel from '../database/movie-data-model';
import MovieWatchedDataModel from '../database/movie-watched-data-model';

const router: Router = Router();

const database: Database = new Database();

router.post('/planning', function (req: Request, res: Response) {
  database.add(new MovieDataModel(req.body.id, req.body.title));
  res.send(database.getAllIds());
});

router.post('/watched', function (req: Request, res: Response) {
  database.addWatched(
    new MovieWatchedDataModel(req.body.id, req.body.title, req.body.date),
  );
  res.send(database.getAllWatchedIds());
});

export default router;
