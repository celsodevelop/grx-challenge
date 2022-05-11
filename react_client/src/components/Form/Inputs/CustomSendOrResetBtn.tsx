import React, { FunctionComponent } from 'react';
import { useIsMutating } from 'react-query';
import { RESET_WORD, SEND_WORD } from '../../../constants/config';
import { useNewSurveyFlag } from '../../../context/NewSurveyFlagContext';

const CustomSendOrResetBtn: FunctionComponent = () => {
  const { newSurvey, setNewSurvey } = useNewSurveyFlag();
  const isSubmitting = useIsMutating();
  if (newSurvey === false) {
    return (
      <input
        type="button"
        onClick={() => {
          setNewSurvey(true);
        }}
        className={`button is-info is-large is-fullwidth ${
          isSubmitting ? 'is-loading' : ''
        }`}
        value={RESET_WORD}
      />
    );
  }
  return (
    <input
      type="submit"
      className={`button is-info is-large is-fullwidth ${
        isSubmitting ? 'is-loading' : ''
      }`}
      value={SEND_WORD}
    />
  );
};

export default CustomSendOrResetBtn;
