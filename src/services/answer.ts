import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import createAnswer from '../models/answer';
import ajv from '../schemas/validation';
import { Answer } from '../types';

const createAnswerSvc = async (answer: Answer) => {
  const validate = ajv.getSchema<Answer>('answer');
  const isValid = validate && validate(answer);
  if (!isValid && validate?.errors) {
    const message = validate.errors[0]?.message || '';
    throw new AppError(StatusCodes.BAD_REQUEST, message);
  }
  await createAnswer(answer);
};

export default createAnswerSvc;
