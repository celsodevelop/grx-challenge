import createAnswer from '../models/answer';
import { Answer } from '../types';

const createAnswerSvc = async (answer: Answer) => createAnswer(answer);

export default createAnswerSvc;
