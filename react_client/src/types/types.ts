import PropTypes from 'prop-types';

type ClassifiedAnswers = 'yes' | 'no';
type NotAvaliatedAnswers = 'idk';
type ExtraPositiveAnswers = 'now';
type FormDefaultValues = {
  question1: '',
  question2: '',
  question3: 'default',
  question4: '',
};

export type AcceptedAnswersTypes = 'radio' | 'select' | 'textarea';
export type AcceptedAnswers =
  | ClassifiedAnswers
  | ExtraPositiveAnswers
  | NotAvaliatedAnswers;

export type SurveyData = {
  question1: ClassifiedAnswers;
  question2: ClassifiedAnswers;
  question3: ClassifiedAnswers | NotAvaliatedAnswers | ExtraPositiveAnswers;
  question4: string;
} | FormDefaultValues;

export type SurveyJSON = {
  survey: string;
  questions: Questions;
  answers: Answers;
  responses: {
    [key in keyof SuccessResponse]: string
  }
};

export type SuccessResponse = {
  positives: number;
  negatives: number;
  not_avaliated: number;
};

export type ErrorResponse = {
  message: string;
};

export type Answers = {
  [answer in AcceptedAnswers]: string;
};

export type Questions = {
  [questionNumber in keyof SurveyData]: ValidQuestion;
};

export interface ValidRadioQuestion extends ValidQuestion { answers: AcceptedAnswers[] }

export type ValidQuestion = {
  statement: string;
  answers?: Array<AcceptedAnswers>;
  type: AcceptedAnswersTypes;
  error: string;
};

// TYPE UTILS

export type InferPropTypes<
  ElementPropTypes,
  DefaultProps = Record<string, unknown>,
  Props = PropTypes.InferProps<ElementPropTypes>,
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key];
};

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : T extends Array<T> | string
      ? string[]
      : never;

export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
