import { ErrorRequestHandler } from 'express';
import AppError from './AppError';
import errorHandler from './errorHandler';

/* eslint-disable @typescript-eslint/no-unused-vars */
// Precisamos de 4 variáveis no middleware de erro, logo desabilita regra linter
const errorMiddleware: ErrorRequestHandler = (
  err: AppError | Error,
  _req,
  res,
  _next,
) => {
  errorHandler(err, res);
};
/* eslint-enable @typescript-eslint/no-unused-vars */

process.on('unhandledRejection', (reason: AppError | Error) => {
  console.error('There was an unhandled rejection', reason);
  errorHandler(reason);
});

process.on('uncaughtException', (error) => {
  console.error('There was an uncaught error', error);
  errorHandler(error);
});

export default errorMiddleware;
