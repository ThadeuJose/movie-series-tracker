import { Router, Request, Response } from 'express';
import Database from '../database/database';
import MovieDataModel from '../database/movie-data-model';

const router: Router = Router();

const database: Database = new Database();

router.post('/planning', function (req: Request, res: Response) {
  console.log(req.body);
  database.add(new MovieDataModel(req.body.id, req.body.title));
  res.send(database.getAllIds());
});

export default router;
