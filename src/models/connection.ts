import { open } from 'fs/promises';
import errorMessages from '../errors/errorMessages.json';
import errorHandler from '../errors/errorHandler';

const DATA_STORAGE_PATH = '../../data/answers.txt';

const fileConnection = async () => {
  try {
    return await open(DATA_STORAGE_PATH, 'a+');
  } catch {
    return errorHandler(new Error(errorMessages.FILE_OPEN_ERROR));
  }
};

export default fileConnection;
