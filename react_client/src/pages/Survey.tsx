import React, { useState } from 'react';
import usePostAnswers from '../api/usePostAnswers';
import HeroLayout from '../components/HeroLayout';
import SurveyForm from '../components/Form/SurveyForm';
import SurveyStatistics from '../components/Statistics/SurveyStatistics';
import surveyJSON from '../constants/survey.json';
import { SuccessResponse, SurveyJSON } from '../types/types';
import SurveyProvider from '../context/SurveyProvider';

const Survey = () => {
  const postAnswerMutation = usePostAnswers();
  const [newSurvey, setNewSurvey] = useState<boolean>(true);
  const renderStatistics = (serverState: SuccessResponse) => {
    const { responses } = surveyJSON as SurveyJSON;
    if (postAnswerMutation.error) {
      console.log(postAnswerMutation.error);
      return <p className="is-danger">Houve um erro ao processar a requisição</p>;
    }
    return (
      !newSurvey
      && serverState && (
        <SurveyStatistics statistics={serverState} responseLabels={responses} />
      )
    );
  };

  return (
    <HeroLayout>
      <div className="columns is-centered">
        <SurveyProvider>
          <SurveyForm
            postAnswers={postAnswerMutation}
            survey={surveyJSON as SurveyJSON}
            newSurvey={newSurvey}
            setNewSurvey={setNewSurvey}
          />
        </SurveyProvider>
      </div>
      {postAnswerMutation.isSuccess && renderStatistics(postAnswerMutation.data)}
    </HeroLayout>
  );
};

export default Survey;
