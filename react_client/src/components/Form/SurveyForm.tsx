import React, { FunctionComponent } from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { useNewSurveyFlag } from '../../context/NewSurveyFlagContext';
import useSurveyFormCtx from '../../hooks/useSurveyForm';

import {
  SurveyData,
  SurveyJSON,
  SuccessResponse,
  ErrorResponse,
} from '../../types/types';
import { extractKeysFromObject } from '../../utils/utils';
import CustomSendOrResetBtn from './Inputs/CustomSendOrResetBtn';
import QuestionMapper from './Questions/QuestionMapper';

type SurveyFormProps = {
  survey: SurveyJSON;
  postAnswers: UseMutationResult<SuccessResponse, ErrorResponse, SurveyData>;
};

const SurveyForm: FunctionComponent<SurveyFormProps> = ({ survey, postAnswers }) => {
  const { questions, answers: answersLabels, survey: surveyTitle } = survey;
  const { newSurvey, setNewSurvey } = useNewSurveyFlag();
  const {
    handleSubmit,
    formState: { errors },
  } = useSurveyFormCtx({ newSurvey });

  const onValid: SubmitHandler<SurveyData> = async (userAnswers) => {
    postAnswers.reset();
    if (newSurvey && !postAnswers?.isSuccess) {
      setNewSurvey(false);
      await postAnswers.mutateAsync(userAnswers);
    }
  };
  const onError: SubmitErrorHandler<SurveyData> = (e) => console.log(e, errors);

  const renderAllQuestions = () => {
    const questionsKeys = extractKeysFromObject(questions);
    return questionsKeys.map((questionKey) => (
      <QuestionMapper
        key={questionKey}
        questionKey={questionKey}
        question={questions[questionKey]}
        answersLabels={answersLabels}
      />
    ));
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, onError)}
      className="column is-three-quarters"
    >
      <p className="title">{surveyTitle}</p>
      {renderAllQuestions()}
      <CustomSendOrResetBtn />
    </form>
  );
};
export default SurveyForm;
