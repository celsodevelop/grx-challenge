import React from 'react';
import PropTypes from 'prop-types';
import {
  AcceptedAnswers,
  Answers,
  InferPropTypes,
  SurveyData,
} from '../../../types/types';
import { SELECT_OPTION_LABEL } from '../../../constants/config';
import QuestionBox from '../Questions/QuestionBox';
import useSurveyFormCtx from '../../../hooks/useSurveyForm';

interface Props extends InferPropTypes<typeof CustomSelectPropTypes> {
  answers: Array<AcceptedAnswers>;
  statement: string;
  id: keyof SurveyData;
  newSurvey: boolean;
  answersLabels: Answers;
}

type CustomSelectType = {
  propTypes: typeof CustomSelectPropTypes;
  (...args: Props[]): React.ReactElement;
};

const CustomSelect: CustomSelectType = ({
  id,
  statement,
  answers,
  answersLabels,
  newSurvey,
}) => {
  const { register } = useSurveyFormCtx({ newSurvey });
  const renderSelectOption = (answer: AcceptedAnswers) => {
    const answerJSON = answersLabels[answer];
    return (
      <option key={`${id}-${answer}`} value={answer}>
        {answerJSON}
      </option>
    );
  };

  return (
    <QuestionBox newSurvey={newSurvey} id={id} statement={statement}>
      <div className="control is-expanded">
        <div className="select is-fullwidth">
          <select {...register(id)} defaultValue="default">
            <option key={`${id}-default`} disabled value="default">
              {SELECT_OPTION_LABEL}
            </option>
            {answers?.map((answer) => renderSelectOption(answer))}
          </select>
        </div>
      </div>
    </QuestionBox>
  );
};

// PropTypes

const CustomSelectPropTypes = {
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  answersLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  newSurvey: PropTypes.bool.isRequired,
};

CustomSelect.propTypes = CustomSelectPropTypes;

export default CustomSelect;
