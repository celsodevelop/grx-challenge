import createAnswer from '../models/answer';
import { Answer } from '../types';

const createAnswerSvc = async (answer: Answer) => {
  const rawAnswer = JSON.stringify(answer);
  return createAnswer(rawAnswer);
};

export default createAnswerSvc;
