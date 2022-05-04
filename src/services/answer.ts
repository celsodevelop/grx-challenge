import createAnswer from '../models/answer';

const createAnswerSvc = async (answer) => {
  const rawAnswer = JSON.stringify(answer);
  return createAnswer(rawAnswer);
};

export default createAnswerSvc;
