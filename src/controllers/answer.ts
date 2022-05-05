import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createAnswerSvc from '../services/answer';
import { UserAnswers } from '../types';

const createAnswerCtrl: RequestHandler = (async (req, res, next) => {
  // Pode haver melhoria para desestruturação dinâmica, mas deve-se lembrar
  // da segurança do código contra ataques de Injection
  const { question1, question2, question3, question4 } = req.body as UserAnswers;
  const answers = { question1, question2, question3, question4 };
  // Bloco try-catch trata todos os erros throw
  try {
    const statistics = await createAnswerSvc(answers);
    return res.status(StatusCodes.CREATED).json(statistics);
  } catch (error) {
    // Importante para encaminhar os erros internos para o middleware de erro
    return next(error);
  }
}) as RequestHandler;

export default createAnswerCtrl;
