import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useIsMutating } from 'react-query';
import { RESET_WORD, SEND_WORD } from '../../../constants/config';

type CustomSendOrResetBtnProps = {
  newSurvey: boolean;
  setNewSurvey: Dispatch<SetStateAction<boolean>>;
};

const CustomSendOrResetBtn: FunctionComponent<CustomSendOrResetBtnProps> = ({
  newSurvey,
  setNewSurvey,
}) => {
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
