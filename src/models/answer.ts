import { FileHandle, writeFile } from 'fs/promises';
import fileConnection from './connection';

const createAnswer = async (data: string) => {
  // Abre o arquivo
  const file = await fileConnection() as FileHandle;
  try {
    // Escreve o conteúdo
    await writeFile(file, data);
  } finally {
    // Fecha o arquivo para não haver problema de leaks de memória
    await file.close();
  }
};

export default {
  createAnswer,
};
