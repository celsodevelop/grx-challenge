import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createAnswerSvc from '../services/answer';
import { Answer } from '../types';

const createAnswerCtrl: RequestHandler = (async (req, res, next) => {
  const { question1, question2, question3, question4 } = req.body as Answer;
  try {
    await createAnswerSvc({
      question1,
      question2,
      question3,
      question4,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Suas respostas foram armazenadas com sucesso!' });
  } catch (error) {
    return next(error);
  }
}) as RequestHandler;

export default createAnswerCtrl;
