import express,  { Express } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import indexRouter from "./routes/index";
import userRouter from "./routes/user";

const app:Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `server running : http://localhost:${port}`
  );
});
