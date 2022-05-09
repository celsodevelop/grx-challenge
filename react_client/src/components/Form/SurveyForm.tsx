import { yupResolver } from '@hookform/resolvers/yup';
import React, { FunctionComponent } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { useIsMutating, UseMutationResult } from 'react-query';

import schema from '../../constants/validation';
import {
  SurveyData,
  SurveyJSON,
  SuccessResponse,
  ErrorResponse,
} from '../../types/types';
import { extractKeysFromObject } from '../../utils/utils';
import QuestionMapper from './Questions/QuestionMapper';

type SurveyFormProps = {
  survey: SurveyJSON;
  postAnswers: UseMutationResult<SuccessResponse, ErrorResponse, SurveyData>;
};
type ResetHandler = { target: { reset: () => void } };

const SurveyForm: FunctionComponent<SurveyFormProps> = ({ survey, postAnswers }) => {
  const methods = useForm<SurveyData>({
    resolver: yupResolver(schema),
  });
  const isLoading = useIsMutating();
  const { handleSubmit, reset } = methods;
  const { questions, answers: answersLabels, survey: surveyTitle } = survey;

  const onValid: SubmitHandler<SurveyData> = (userAnswers, e) => {
    postAnswers.mutate(userAnswers);
    reset();
    (e as ResetHandler)?.target?.reset(); // Necessário para reset do select e textarea
  };

  const onError: SubmitErrorHandler<SurveyData> = (e) => console.log(e);

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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onValid, onError)}
        className="column is-three-quarters"
        autoComplete="off"
      >
        <p className="title">{surveyTitle}</p>
        {renderAllQuestions()}
        <input
          type="submit"
          className={`button is-info is-large is-fullwidth ${
            isLoading ? 'is-loading' : ''
          }`}
          value="Enviar"
        />
      </form>
    </FormProvider>
  );
};
export default SurveyForm;
