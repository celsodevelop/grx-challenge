import * as yup from 'yup';
import surveyJSON from './survey.json';
import {
  MAX_PROPERTY,
  MIN_PROPERTY,
  Y_OR_N_IDK_NOW_SERVER_SIDE_VALUES,
  Y_OR_N_SERVER_SIDE_VALUES,
} from './config';

const {
  questions: {
    question1: { error: error1 },
    question2: { error: error2 },
    question3: { error: error3 },
    question4: { error: error4 },
  },
} = surveyJSON;

const schema = yup.object().shape({
  question1: yup
    .string()
    .matches(Y_OR_N_SERVER_SIDE_VALUES, error1)
    .required(error1)
    .typeError(error1),
  question2: yup
    .string()
    .matches(Y_OR_N_SERVER_SIDE_VALUES, error2)
    .required(error2)
    .typeError(error2),
  question3: yup
    .string()
    .matches(Y_OR_N_IDK_NOW_SERVER_SIDE_VALUES, error3)
    .required(error3)
    .typeError(error3),
  question4: yup
    .string()
    .min(...MIN_PROPERTY)
    .max(...MAX_PROPERTY)
    .required(error4)
    .typeError(error4),
});

export default schema;
