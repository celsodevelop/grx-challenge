import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import usePostAnswers from '../api/usePostAnswers';
import { FORM_DEFAULT_VALUES } from '../constants/config';
import { useNewSurveyFlag } from '../context/NewSurveyFlagContext';
import { SurveyData } from '../types/types';

const useSurveyFormCtx = () => {
  const { newSurvey } = useNewSurveyFlag();
  const {
    formState: { isSubmitted, isSubmitSuccessful, errors, ...formState },
    reset,
    ...formMethods
  } = useFormContext<SurveyData>();
  const { reset: resetAPI } = usePostAnswers();
  useEffect(() => {
    if (isSubmitted && isSubmitSuccessful && newSurvey) {
      resetAPI();
      reset(FORM_DEFAULT_VALUES, {
        keepIsValid: true,
        keepIsSubmitted: false,
      });
    } else if (isSubmitted && newSurvey === false) {
      reset(FORM_DEFAULT_VALUES, {
        keepIsValid: true,
        keepValues: true,
        keepIsSubmitted: true,
      });
    }
  }, [isSubmitSuccessful, newSurvey, isSubmitted, resetAPI, reset]);
  return {
    ...formMethods,
    reset,
    formState: {
      ...formState,
      isSubmitSuccessful,
      isSubmitted,
      errors,
    },
  };
};

export default useSurveyFormCtx;
