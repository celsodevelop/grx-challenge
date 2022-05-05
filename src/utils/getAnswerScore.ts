import { StatusCodes } from 'http-status-codes';
import pointsByAnswer from '../constants/pointByAnswer.json';
import AppError from '../errors/AppError';

import errorMessages from '../errors/errorMessages.json';
import {
  extractKeysFromObject,
  PointsByAnswerJSON,
  ScoredUserAnswers,
  Statistics,
} from '../types';

const getValidAnswerScore = (
  question: keyof ScoredUserAnswers,
  answer: ScoredUserAnswers[keyof ScoredUserAnswers],
): Partial<Statistics> => {
  // Pega todos o objeto a partir do JSON de classificações possíveis pra questão
  const answerPossibleClassifications = (pointsByAnswer as PointsByAnswerJSON)[question];
  // Pegas as strings e guarda o tipo
  const keyClassifications = extractKeysFromObject(answerPossibleClassifications);

  const output = keyClassifications.reduce((updatedScore, classification) => {
    // Pega o score para as possíveis respostas em suas respectivas classificações
    const answerScoreClassification = answerPossibleClassifications[classification];

    if (answerScoreClassification) {
      const validAnswer = extractKeysFromObject(answerScoreClassification).find(
        (acceptedAnswer) => acceptedAnswer === answer,
      );
      if (validAnswer) {
        // Devolve a pontuação da questão
        return {
          [classification]: answerScoreClassification[validAnswer],
        } as Partial<Statistics>;
      }
    }
    return updatedScore;
  }, {});
  // Verifica que foi encontrado score
  if (extractKeysFromObject(output).length) {
    return output;
  }
  // Erro caso não seja encontrado score
  throw new AppError(StatusCodes.BAD_REQUEST, errorMessages.INVALID_ANSWER as string);
};

export default getValidAnswerScore;
