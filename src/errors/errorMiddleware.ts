import { ErrorRequestHandler } from 'express';
import AppError from './AppError';
import errorHandler from './errorHandler';

const errorMiddleware: ErrorRequestHandler = (err: AppError, _req, res) => {
  errorHandler(err, res);
};

process.on('unhandledRejection', (reason: AppError | Error) => {
  console.error('There was an unhandled rejection', reason);
  errorHandler(reason);
});

process.on('uncaughtException', (error) => {
  console.error('There was an uncaught error', error);
  errorHandler(error);
});

export default errorMiddleware;
