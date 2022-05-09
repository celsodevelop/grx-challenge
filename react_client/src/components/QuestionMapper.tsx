import React, { FunctionComponent } from 'react';
import { INVALID_QUESTION_MSG } from '../constants/config';
import { Answers, SurveyData, ValidQuestion } from '../types/types';
import CustomRadio from './CustomRadio';
import CustomSelect from './CustomSelect';
import CustomTextArea from './CustomTextArea';

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
  const structureAlert = <p className="is-danger is-size-2">{INVALID_QUESTION_MSG}</p>;

  switch (question.type) {
  case 'radio':
    return question?.answers ? (
      <CustomRadio
        id={questionKey}
        // selected={watch(key) as AcceptedAnswers}
        // control={control}
        // error={errors[key]}
        key={questionKey}
        statement={question.statement}
        answers={question?.answers}
        answersLabels={answersLabels}
      />
    ) : (
      structureAlert
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
      structureAlert
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
    return structureAlert;
  }
};

export default QuestionMapper;
