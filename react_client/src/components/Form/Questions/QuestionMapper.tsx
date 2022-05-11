import React, { FunctionComponent } from 'react';
import { INVALID_QUESTION_MSG } from '../../../constants/config';
import { Answers, SurveyData, ValidQuestion } from '../../../types/types';
import CustomRadio from '../Inputs/CustomRadio';
import CustomSelect from '../Inputs/CustomSelect';
import CustomTextArea from '../Inputs/CustomTextArea';

type QuestionMapperProps = {
  questionKey: keyof SurveyData;
  question: ValidQuestion;
  answersLabels: Answers;
};

const QuestionMapper: FunctionComponent<QuestionMapperProps> = ({
  question,
  answersLabels,
  questionKey,
}) => {
  const helperMsg = <p className="is-danger is-size-2">{INVALID_QUESTION_MSG}</p>;

  switch (question.type) {
  case 'radio':
    return question?.answers ? (
      <CustomRadio
        id={questionKey}
        key={questionKey}
        statement={question.statement}
        answers={question?.answers}
        answersLabels={answersLabels}
      />
    ) : (
      helperMsg
    );

  case 'select':
    return question?.answers ? (
      <CustomSelect
        id={questionKey}
        key={questionKey}
        statement={question.statement}
        answers={question?.answers}
        answersLabels={answersLabels}
      />
    ) : (
      helperMsg
    );

  case 'textarea':
    return (
      <CustomTextArea
        id={questionKey}
        key={questionKey}
        statement={question.statement}
      />
    );
  default:
    return helperMsg;
  }
};

export default QuestionMapper;
