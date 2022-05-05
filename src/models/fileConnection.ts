import { open } from 'fs/promises';
import errorMessages from '../errors/errorMessages.json';
import errorHandler from '../errors/errorHandler';
import { DATA_STORAGE_PATH } from '../constants/config';

const fileConnection = async (flag: string) => {
  try {
    // return await dentro do try-catch para capturar erro do file system
    // e mandar via log do servidor por segurança contra exposição da infra

    return await open(DATA_STORAGE_PATH, flag);
  } catch (error) {
    return errorHandler(new Error(errorMessages.FILE_OPEN_ERROR));
  }
};

export default fileConnection;
