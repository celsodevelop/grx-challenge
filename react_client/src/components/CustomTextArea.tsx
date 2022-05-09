import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { InferPropTypes, SurveyData } from '../types/types';
import QuestionBox from './QuestionBox';

interface Props extends InferPropTypes<typeof CustomTextAreaPropTypes> {
  statement: string;
  id: keyof SurveyData;
}

type CustomTextAreaType = {
  propTypes: typeof CustomTextAreaPropTypes;
  (...args: Props[]): React.ReactElement;
};

const CustomTextArea: CustomTextAreaType = ({ id, statement }) => {
  const { register } = useFormContext<SurveyData>();

  return (
    <QuestionBox id={id} statement={statement}>
      <div className="control is-expanded">
        <textarea
          {...register(id)}
          className="textarea is-info has-fixed-size"
          name={id}
          id={id}
        />
      </div>
    </QuestionBox>
  );
};

// PropTypes

const CustomTextAreaPropTypes = {
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
};

CustomTextArea.propTypes = CustomTextAreaPropTypes;

export default CustomTextArea;
