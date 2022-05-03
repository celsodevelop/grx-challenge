import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

const errorHandler = (errorObj: AppError | Error, res?: Response): Response | void => {
  if (res) {
    if (errorObj instanceof AppError) {
      // Verifica que o erro foi lançado pelo App, evitando que
      // erros internos extrapolem o domínio do servidor

      console.log(errorObj);
      return res.status(errorObj.code).json({ message: errorObj.message });
    }
    // Caso erro interno no servidor express

    console.error('Internal express server error: ', errorObj); // Server log somente
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
  // Caso erro interno de sistema

  return console.error('Internal exception: ', errorObj);
};

export default errorHandler;
