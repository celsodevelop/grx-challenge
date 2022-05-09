import { yupResolver } from '@hookform/resolvers/yup';
import React, { FunctionComponent } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  FormProvider,
  useForm,
} from 'react-hook-form';

import schema from '../constants/validation';
import {
  SurveyData,
  SurveyJSON,
  extractKeysFromObject,
} from '../types/types';
import QuestionMapper from './QuestionMapper';

type SurveyFormProps = {
  survey: SurveyJSON;
};
type ResetHandler = { target: { reset: () => void } };

const SurveyForm: FunctionComponent<SurveyFormProps> = ({ survey }) => {
  const methods = useForm<SurveyData>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;
  const { questions, answers: answersLabels, survey: surveyTitle } = survey;

  const onValid: SubmitHandler<SurveyData> = (data, e) => {
    console.log(data);
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
          className="button is-info is-large is-fullwidth"
          value="Enviar"
        />
      </form>
    </FormProvider>
  );
};
export default SurveyForm;
