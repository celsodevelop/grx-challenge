import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import createAnswer from '../models/answer';
import ajv from '../schemas/validation';
import { UserAnswers } from '../types';
import scoreAnswers from '../utils/scoreAnswers';

const createAnswerSvc = async (answers: UserAnswers) => {
  // Recuperamos a função de validação do 'ajv' para validar a entrada
  const validate = ajv.getSchema<UserAnswers>('answer');
  const isValid = validate?.(answers);
  // Validamos a entrada
  if (!isValid && validate) {
    // Falha rapidamente em caso de entradas inválidas
    const message = validate.errors?.[0]?.message || '';
    throw new AppError(StatusCodes.BAD_REQUEST, message);
  }
  // Processa as respostas para responder com as estatísticas
  const processedAnswers = scoreAnswers(answers);
  // Guarda no arquivo da conexão de arquivos
  await createAnswer({ ...answers, ...processedAnswers });
  // Retorna as Estatísticas
  return processedAnswers;
};

export default createAnswerSvc;
