import React from 'react';
import usePostAnswers from '../api/usePostAnswers';
import HeroLayout from '../components/HeroLayout';
import SurveyForm from '../components/SurveyForm';
import SurveyStatistics from '../components/SurveyStatistics';
import surveyJSON from '../constants/survey.json';
import { SuccessResponse, SurveyJSON } from '../types/types';

const Survey = () => {
  const postAnswerMutation = usePostAnswers();
  const renderStatistics = (serverState: SuccessResponse) => {
    const { responses } = surveyJSON as SurveyJSON;
    if (postAnswerMutation.error) {
      console.log(postAnswerMutation.error);
      return <p className="is-danger">Houve um erro ao processar a requisição</p>;
    }
    return (
      postAnswerMutation.data && (
        <SurveyStatistics
          statistics={serverState}
          responseLabels={responses}
        />
      )
    );
  };

  return (
    <HeroLayout>
      <div className="columns is-centered">
        <SurveyForm postAnswers={postAnswerMutation} survey={surveyJSON as SurveyJSON} />
      </div>
      {postAnswerMutation.data && renderStatistics(postAnswerMutation.data)}
    </HeroLayout>
  );
};

export default Survey;
