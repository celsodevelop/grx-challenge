import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import surveyJSON from '../constants/survey.json';
import CustomRadio from '../components/CustomRadio';
import {
  extractKeysFromObject,
  SurveyData,
  SurveyJSON,
  ValidQuestion,
  ValidRadioQuestion,
} from '../types/types';
import schema from '../constants/validation';

const Survey = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SurveyData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SurveyData) => console.log(data);

  const { questions, answers: answersLabels } = surveyJSON as SurveyJSON;

  const renderRadio = (
    questionKey: keyof SurveyData,
    validQuestion: ValidRadioQuestion,
  ) => (
    <CustomRadio
      id={questionKey}
      register={register}
      error={errors[questionKey]}
      key={questionKey}
      statement={validQuestion.statement}
      answers={validQuestion.answers}
      answersLabels={answersLabels}
    />
  );

  const renderQuestion = (questionKey: keyof SurveyData) => {
    const validQuestion: ValidQuestion = questions[questionKey];
    if (validQuestion) {
      switch (validQuestion.type) {
      case 'radio':
        return (
          validQuestion?.answers
            && renderRadio(questionKey, validQuestion as ValidRadioQuestion)
        );

      case 'select':
        return; // renderRadio(questionKey, validQuestion);

      case 'textarea':
        return; // renderRadio(questionKey, validQuestion);
      default:
        return null;
      }
    }
  };

  const renderAllQuestions = () => {
    const questionsKeys = extractKeysFromObject(questions);
    return questionsKeys.map((questionKey) => renderQuestion(questionKey));
  };

  return (
    <section className="hero is-fullheight has-background-white-ter">
      <div className="hero-body">
        <div className="container has-text-centered">
          <form
            onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
            autoComplete="off"
          >
            {renderAllQuestions()}
            <input type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Survey;
