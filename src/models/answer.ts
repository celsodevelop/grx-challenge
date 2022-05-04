import { FileHandle } from 'fs/promises';
import { Answer } from '../types';
import fileConnection from './connection';

const createAnswer = async (newData: Answer) => {
  // Abre o arquivo modo append com criação de arquivo [flag: 'a+']
  const answersFile = (await fileConnection('a+')) as FileHandle;
  const oldAnswers = await answersFile.readFile({ encoding: 'utf-8' });

  // Recupera conteúdo antigo do arquivo
  const oldContent = oldAnswers && (JSON.parse(oldAnswers) as Answer[]);
  try {
    // Caso primeira vez, cria o arquivo com as respostas

    if (!oldContent) {
      return await answersFile.writeFile(JSON.stringify([newData]));
    }
    // Caso arquivo já possuía conteúdo

    await answersFile.close(); // Libera o arquivo

    // Abre o arquivo modo write com sobrescrição de arquivo [flag: 'w']
    const newAnswersFile = (await fileConnection('w')) as FileHandle;
    const newContent = [...oldContent, newData];

    // Escreve as respostas novas
    await newAnswersFile.writeFile(JSON.stringify(newContent));
    return await newAnswersFile.close(); // Libera arquivo da memória
  } finally {
    // Garante o fechamento do arquivo para não haver problema de leaks de memória
    if (answersFile) await answersFile.close();
  }
};

export default createAnswer;
