import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '../typeorm';
import '../container';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import AppError from '../../errors/AppError';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);

    return response.status(500).json({
      type: 'error',
      message: 'Internal Server Error!',
      error: error.message,
    });
  },
);

export default app;
