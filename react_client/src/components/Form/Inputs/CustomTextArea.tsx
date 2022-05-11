import React from 'react';
import PropTypes from 'prop-types';
import { InferPropTypes, SurveyData } from '../../../types/types';
import QuestionBox from '../Questions/QuestionBox';
import { MAX_LENGTH, MIN_LENGTH } from '../../../constants/config';
import useSurveyFormCtx from '../../../hooks/useSurveyForm';

interface Props extends InferPropTypes<typeof CustomTextAreaPropTypes> {
  statement: string;
  id: keyof SurveyData;
  newSurvey: boolean;
}

type CustomTextAreaType = {
  propTypes: typeof CustomTextAreaPropTypes;
  (...args: Props[]): React.ReactElement;
};

const CustomTextArea: CustomTextAreaType = ({ id, statement, newSurvey }) => {
  const { register, watch } = useSurveyFormCtx({ newSurvey });
  const textLength = watch(id)?.length || 0;
  const isValidLength = textLength >= MIN_LENGTH && textLength <= MAX_LENGTH;

  return (
    <QuestionBox newSurvey={newSurvey} id={id} statement={statement}>
      <div className="control is-expanded">
        <textarea
          {...register(id)}
          className="textarea is-info has-fixed-size"
          name={id}
          id={id}
        />
        <p
          className={`has-text-right has-text-weight-bold ${
            isValidLength ? 'has-text-info' : 'has-text-danger'
          }`}
        >
          {`${textLength}/${MAX_LENGTH}`}
        </p>
      </div>
    </QuestionBox>
  );
};

// PropTypes

const CustomTextAreaPropTypes = {
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  newSurvey: PropTypes.bool.isRequired,
};

CustomTextArea.propTypes = CustomTextAreaPropTypes;

export default CustomTextArea;
