import * as yup from 'yup';
import { MAX_PROPERTY, MIN_PROPERTY } from './config';
import surveyJSON from './survey.json';

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
    .matches(/yes|no/)
    .required(error1),
  question2: yup
    .string()
    .matches(/yes|no/)
    .required(error2),
  question3: yup
    .string()
    .matches(/yes|no|idk|now/)
    .required(error3),
  question4: yup
    .string()
    .min(...MIN_PROPERTY)
    .max(...MAX_PROPERTY)
    .required(error4),
});

export default schema;
