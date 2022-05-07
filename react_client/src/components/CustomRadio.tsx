import React from 'react';
import PropTypes from 'prop-types';
import { FieldError, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { AcceptedAnswers, InferPropTypes, SurveyData } from '../types/types';

interface Props
  extends InferPropTypes<typeof CustomRadioPropTypes, typeof CustomRadioDefaultProps> {
  answers: Array<AcceptedAnswers>;
  statement: string;
  id: keyof SurveyData;
  register: (name: keyof SurveyData, options?: RegisterOptions) => UseFormRegisterReturn;
  answersLabels: {
    [key in AcceptedAnswers]: string
  }
  error?: FieldError;
}

type CustomRadioType = {
  propTypes: typeof CustomRadioPropTypes;
  defaultProps: typeof CustomRadioDefaultProps;
  (...args: Props[]): React.ReactElement;
};

const CustomRadio: CustomRadioType = ({
  id,
  statement,
  answers,
  error,
  register,
  answersLabels,
}) => {
  const renderAnswers = (answer: AcceptedAnswers) => (
    <label
      key={`${id}-${answer}`}
      htmlFor={`${id}-${answer}`}
      className={`button ${error?.type ? 'is-danger' : 'is-sucess'}`}
      style={{ width: '300px' }}
    >
      {answersLabels[answer]}
      <input
        {...register(id)}
        style={{ display: 'none' }}
        id={`${id}-${answer}`}
        value={answer}
        type="radio"
      />
    </label>
  );

  const renderQuestion = () => (
    <>
      <p>{statement}</p>
      {answers?.map((answer) => renderAnswers(answer))}
    </>
  );

  return (
    <div className="field is-grouped is-grouped-centered">
      <div className="control">
        <div className="columns">
          <div className="box is-fullwidth">
            <div className="column is-half" key={id}>
              {renderQuestion()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes

const CustomRadioPropTypes = {
  error: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  answersLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  register: PropTypes.func.isRequired,
};

const CustomRadioDefaultProps = {
  error: {
    type: '',
  },
};

CustomRadio.propTypes = CustomRadioPropTypes;
CustomRadio.defaultProps = CustomRadioDefaultProps;

export default CustomRadio;
