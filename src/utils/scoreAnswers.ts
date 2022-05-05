import { INITIAL_SCORE } from '../constants/config';
import pointsByAnswer from '../constants/pointByAnswer.json';

import { UserAnswers, extractKeysFromObject } from '../types';
import getValidAnswerScore from './getAnswerScore';

const scoreAnswers = (answers: UserAnswers) => {
  // Pega as questões que possuem resposta com pontuação cadastrada
  const questionsHavingScore = extractKeysFromObject(pointsByAnswer);
  return questionsHavingScore.reduce((totalScore, question) => {
    // Chama função que compara a questão com a resposta
    const answerScore = getValidAnswerScore(question, answers[question]);
    if (answerScore) {
      const scoreKey = extractKeysFromObject(answerScore)[0];
      // Atualiza o valor com o score
      const updateScore = {
        [scoreKey]: totalScore[scoreKey] + (answerScore[scoreKey] || 0),
      };
      // Acumula no score total
      return {
        ...totalScore,
        ...updateScore,
      };
    }
    // Não altera caso não tenha encontrado score
    return totalScore;
  }, INITIAL_SCORE);
};

export default scoreAnswers;
