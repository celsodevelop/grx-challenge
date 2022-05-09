import React from 'react';
import HeroLayout from '../components/HeroLayout';
import SurveyForm from '../components/SurveyForm';
import surveyJSON from '../constants/survey.json';
import { SurveyJSON } from '../types/types';

const Survey = () => (
  <HeroLayout>
    <div className="columns is-centered">
      <SurveyForm survey={surveyJSON as SurveyJSON} />
    </div>
  </HeroLayout>
);

export default Survey;
