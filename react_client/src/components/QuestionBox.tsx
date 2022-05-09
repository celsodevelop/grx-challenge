import React, { FunctionComponent, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { SurveyData } from '../types/types';

type QuestionBoxProps = {
  id: keyof SurveyData;
  statement: string;
  children: ReactNode;
};

const QuestionBox: FunctionComponent<QuestionBoxProps> = ({
  id,
  statement,
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext<SurveyData>();
  const questionNumber = Number(id.match(/\d+/)?.[0]) || 0;

  return (
    <div className="box">
      <p className="is-size-4 mb-4 has-text-left">{`${questionNumber}) ${statement}`}</p>
      <div className="field is-grouped is-grouped-centered">{children}</div>
      {errors?.[id]?.message && <p className="help is-danger">{errors?.[id]?.message}</p>}
    </div>
  );
};
export default QuestionBox;
