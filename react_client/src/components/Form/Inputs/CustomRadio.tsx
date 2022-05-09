import React from 'react';
import PropTypes from 'prop-types';
import { useController, useFormContext } from 'react-hook-form';
import { AcceptedAnswers, InferPropTypes, SurveyData } from '../../../types/types';
import QuestionBox from '../Questions/QuestionBox';

interface Props extends InferPropTypes<typeof CustomRadioPropTypes> {
  answers: Array<AcceptedAnswers>;
  statement: string;
  id: keyof SurveyData;
  answersLabels: {
    [key in AcceptedAnswers]: string;
  };
}

type CustomRadioType = {
  propTypes: typeof CustomRadioPropTypes;
  (...args: Props[]): React.ReactElement;
};

const CustomRadio: CustomRadioType = ({ id, statement, answers, answersLabels }) => {
  const { control, watch } = useFormContext<SurveyData>();

  const {
    field: { onChange },
  } = useController({ name: id, control });
  const selectedAnswer = watch(id);

  const renderButtonOption = (answer: AcceptedAnswers) => (
    <div className="control is-expanded" key={`${id}-${answer}`}>
      <button
        onClick={() => {
          onChange(answer);
        }}
        className={`button is-fullwidth ${
          selectedAnswer === answer ? 'is-focused is-primary' : ''
        }`}
        type="button"
      >
        {answersLabels[answer]}
      </button>
    </div>
  );

  return (
    <QuestionBox id={id} statement={statement}>
      {answers?.map((answer) => renderButtonOption(answer))}
    </QuestionBox>
  );
};
// PropTypes

const CustomRadioPropTypes = {
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  answersLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

CustomRadio.propTypes = CustomRadioPropTypes;

export default CustomRadio;
